import { useState, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Header from './ui/Header';
import IntroView from './ui/IntroView';
import ConfigPanel from './ui/ConfigPanel';
import ModuleGrid from './ui/ModuleGrid';
import ActionBar from './ui/ActionBar';
import PreviewPanel from './ui/PreviewPanel';
import Toast from './ui/Toast';
import OnboardingTour from './ui/OnboardingTour';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { useEngineState } from './store/engineState';
import { getDomain } from './domains';
import { getTranslation } from './locales/i18n';
import { pathToDomain } from './utils/domainRoute';
import { decodePayloadFromParam, sanitizePayload } from './utils/statePayload';
import { ArrowLeft } from 'lucide-react';
import './index.css';

export default function App() {
    const [toasts, setToasts] = useState([]);
    const toastTimers = useRef(new Map());

    const { config, view, startTour, backToIntro } = useEngineState(useShallow(state => ({
        config: state.config,
        view: state.view,
        startTour: state.startTour,
        backToIntro: state.backToIntro
    })));
    const t = getTranslation(config.lang, config.domain);

    // Mount-time URL handling — a `?share=` payload takes priority over the
    // pathname→domain sync below. If both ran independently, the pathname
    // sync's setDomain() would WIPE the share payload's selectedModules right
    // after applySharedState() set them (setDomain resets on every domain
    // switch by design) — so this is one effect with an explicit branch, not
    // two competing ones.
    useEffect(() => {
        const { config: currentConfig, setDomain, applySharedState } = useEngineState.getState();
        const params = new URLSearchParams(window.location.search);
        const shareParam = params.get('share');

        if (shareParam) {
            // Strip ?share= regardless of decode success so a reload doesn't
            // re-apply (or re-fail on) the same param.
            const url = new URL(window.location.href);
            url.searchParams.delete('share');
            window.history.replaceState(null, '', url.pathname + url.search);

            const decoded = decodePayloadFromParam(shareParam);
            if (decoded) {
                const clean = sanitizePayload(decoded, currentConfig.lang);
                applySharedState(clean); // also pushes the matching /learn or /code route
                return;
            }
            // Corrupt param (bad base64/JSON): fall through to the ordinary
            // pathname sync below instead of leaving the domain stuck on
            // whatever was persisted while the URL still reads e.g. /code.
        }

        // No module/preset state needs resetting here — selectedModules etc.
        // aren't persisted (see engineState.js partialize), so they're
        // already empty at this point; setDomain's reset is a no-op on top
        // of that empty state.
        const routeDomain = pathToDomain(window.location.pathname);
        if (routeDomain) {
            if (routeDomain !== (currentConfig.domain ?? 'learning')) {
                setDomain(routeDomain);
            }
        } else {
            const activeDomain = getDomain(currentConfig.domain);
            window.history.replaceState(null, '', `/${activeDomain.route}`);
        }
    }, []);

    // Browser back/forward should also switch domains.
    useEffect(() => {
        const handlePopState = () => {
            const { config: currentConfig, setDomain } = useEngineState.getState();
            const routeDomain = pathToDomain(window.location.pathname);
            if (routeDomain && routeDomain !== (currentConfig.domain ?? 'learning')) {
                setDomain(routeDomain);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Tour steps are anchored to workspace-only DOM (.sidebar/.main-content/
    // .right-sidebar — see OnboardingTour.jsx), so it must only auto-start
    // once the user actually reaches the workspace, not on intro. This also
    // naturally covers every workspace entry point (manual "Çalışma alanını
    // aç", "Modülleri kendim seçeceğim", a loaded recipe, a restored share
    // link) since they all flip `view` to 'workspace'.
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (view === 'workspace' && !config.tourCompleted && !isMobile) {
            startTour();
        }
    }, [view, config.tourCompleted, startTour]);

    useEffect(() => {
        const root = document.documentElement;
        if (config.theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            
            const listener = (e) => root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
            return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
        } else {
            root.setAttribute('data-theme', config.theme);
        }
    }, [config.theme]);

    useEffect(() => {
        return () => {
            toastTimers.current.forEach(clearTimeout);
        };
    }, []);

    const showToast = (msg, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [{ id, msg, type }, ...prev]);
        const timerId = setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
            toastTimers.current.delete(id);
        }, 3000);
        toastTimers.current.set(id, timerId);
    };

    return (
        <div className="app">
            <div className="bg-glow-orb orb-1"></div>
            <div className="bg-glow-orb orb-2"></div>
            <Header />
            <ErrorBoundary>
                {view === 'intro' ? (
                    <main className="container intro-container">
                        <IntroView showToast={showToast} />
                    </main>
                ) : (
                    <main className="container">
                        <div className="workspace-topbar">
                            <button className="btn btn-secondary workspace-back-btn" onClick={backToIntro}>
                                <ArrowLeft size={14} /> {t.btnBackToIntro}
                            </button>
                            <div className="workspace-topic-label">
                                {config.konu || t.topicPlaceholder}
                            </div>
                        </div>
                        <div className="layout-grid-3">
                            <div className="sidebar">
                                <ConfigPanel />
                            </div>
                            <div className="main-content">
                                <ModuleGrid />
                            </div>
                            <div className="right-sidebar">
                                <ActionBar showToast={showToast} />
                                <PreviewPanel />
                            </div>
                        </div>
                    </main>
                )}
            </ErrorBoundary>

            <div className="toast-container">
                {toasts.map(toast => (
                    <Toast key={toast.id} msg={toast.msg} type={toast.type} />
                ))}
            </div>
            <OnboardingTour />
        </div>
    );
}
