import { useState, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Header from './ui/Header';
import ConfigPanel from './ui/ConfigPanel';
import PresetBar from './ui/PresetBar';
import ModuleGrid from './ui/ModuleGrid';
import TopicInput from './ui/TopicInput';
import ActionBar from './ui/ActionBar';
import PreviewPanel from './ui/PreviewPanel';
import Toast from './ui/Toast';
import OnboardingTour from './ui/OnboardingTour';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { useEngineState } from './store/engineState';
import { getDomain } from './domains';
import { pathToDomain } from './utils/domainRoute';
import './index.css';

export default function App() {
    const [toasts, setToasts] = useState([]);
    const toastTimers = useRef(new Map());

    const { config, startTour } = useEngineState(useShallow(state => ({
        config: state.config,
        startTour: state.startTour
    })));

    // Sync the initial URL to the persisted/default domain on first mount. No
    // module/preset state needs resetting here — selectedModules etc. aren't
    // persisted (see engineState.js partialize), so they're already empty at
    // this point; setDomain's reset is a no-op on top of that empty state.
    useEffect(() => {
        const { config: currentConfig, setDomain } = useEngineState.getState();
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

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (!config.tourCompleted && !isMobile) {
            startTour();
        }
    }, [config.tourCompleted, startTour]);

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
                <main className="container">
                    <div className="layout-grid-3">
                        <div className="sidebar">
                            <ConfigPanel />
                        </div>
                        <div className="main-content">
                            <PresetBar />
                            <ModuleGrid />
                        </div>
                        <div className="right-sidebar">
                            <TopicInput />
                            <ActionBar showToast={showToast} />
                            <PreviewPanel />
                        </div>
                    </div>
                </main>
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
