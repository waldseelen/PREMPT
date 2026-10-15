import { useState, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Header from './ui/Header';
import DefaultFlow from './ui/DefaultFlow';
import TopicInput from './ui/TopicInput';
import PresetBar from './ui/PresetBar';
import ConfigPanel from './ui/ConfigPanel';
import ModuleGrid from './ui/ModuleGrid';
import ActionBar from './ui/ActionBar';
import PreviewPanel from './ui/PreviewPanel';
import Toast from './ui/Toast';
import OnboardingTour from './ui/OnboardingTour';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { useEngineState } from './store/engineState';
import { getDomain, DOMAINS } from './domains';
import { getPresets } from './engine/presetEngine';
import { getModuleRegistry } from './engine/moduleRegistry';
import { getTranslation } from './locales/i18n';
import { pathToDomain } from './utils/domainRoute';
import { decodePayloadFromParam, sanitizePayloadWithWarnings } from './utils/statePayload';
import { ArrowLeft } from 'lucide-react';
import './index.css';

export default function App() {
    const [toasts, setToasts] = useState([]);
    const toastTimers = useRef(new Map());

    const { config, activePreset, selectedModules, setGorunum } = useEngineState(useShallow((state) => ({
        config: state.config,
        activePreset: state.activePreset,
        selectedModules: state.selectedModules,
        setGorunum: state.setGorunum
    })));

    // Mount-time URL Query & Path handling. Every externally-sourced value
    // goes through the same sanitize contract as share/import (Phase 16.1):
    // unknown ids fall back silently no more — the user gets a warning toast.
    useEffect(() => {
        const { config: currentConfig, setDomain, setPreset, setModules, applySharedState } = useEngineState.getState();
        const params = new URLSearchParams(window.location.search);
        const shareParam = params.get('share');

        // Local notifier using only the stable setState setter and ref, so this
        // []-deps effect stays exhaustive-deps clean without a suppression.
        const notifyWarn = (msg) => {
            const id = Date.now() + Math.random();
            setToasts((prev) => [{ id, msg, type: 'warn' }, ...prev]);
            const timerId = setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
                toastTimers.current.delete(id);
            }, 4000);
            toastTimers.current.set(id, timerId);
        };
        const t0 = getTranslation(currentConfig.lang, currentConfig.domain);

        if (shareParam) {
            const decoded = decodePayloadFromParam(shareParam);
            if (decoded) {
                const { clean, warnings } = sanitizePayloadWithWarnings(decoded, currentConfig.lang);
                applySharedState(clean);
                if (warnings.length > 0) notifyWarn(t0.toastUrlParamsFixed);
                return;
            }
        }

        // 1. Determine target domain from ?domain= OR URL pathname (/academic, /code, etc.)
        const queryDomain = params.get('domain');
        const pathDomain = pathToDomain(window.location.pathname);
        const targetDomain = queryDomain || pathDomain;

        if (queryDomain && !Object.hasOwn(DOMAINS, queryDomain)) {
            notifyWarn(t0.toastUrlParamsFixed);
        }
        if (targetDomain && targetDomain !== (currentConfig.domain ?? 'learning')) {
            setDomain(targetDomain);
        }
        const resolvedDomain = useEngineState.getState().config.domain;

        // 2. Preset or custom modules parameters (?preset=... or ?modules=...)
        const presetParam = params.get('preset');
        if (presetParam) {
            const available = getPresets(resolvedDomain);
            const known = available[presetParam] || Object.values(available).find((p) => p?.id === presetParam);
            if (known) {
                setPreset(presetParam);
            } else {
                notifyWarn(t0.toastUnknownPreset);
            }
        } else {
            const modulesParam = params.get('modules') || params.get('mods');
            if (modulesParam) {
                const moduleList = modulesParam.split(',').map((m) => m.trim()).filter(Boolean);
                const validIds = new Set(
                    getModuleRegistry(resolvedDomain, useEngineState.getState().config.lang).map((m) => m.id)
                );
                const dropped = moduleList.filter((id) => !validIds.has(id));
                if (dropped.length > 0) {
                    notifyWarn(`${t0.toastUnknownModules} (${dropped.slice(0, 3).join(', ')}${dropped.length > 3 ? '…' : ''})`);
                }
                // setModules filters defensively again; passing only known ids
                // keeps the warning above accurate.
                setModules(moduleList.filter((id) => validIds.has(id)));
            }
        }

        // 3. Explicit URL parameter overrides (?konu=..., ?mod=..., ?seviye=..., ?derinlik=..., etc.)
        const overrides = {};
        const konu = params.get('konu') || params.get('topic') || params.get('q');
        if (konu !== null) overrides.konu = konu;

        const alan = params.get('alan');
        if (alan !== null) overrides.alan = alan;

        const mod = params.get('mod') || params.get('mode');
        if (mod !== null) overrides.mod = mod;

        const seviye = params.get('seviye') || params.get('level');
        if (seviye !== null) overrides.seviye = seviye;

        const derinlik = params.get('derinlik') || params.get('depth');
        if (derinlik !== null) overrides.derinlik = derinlik;

        const format = params.get('format');
        if (format !== null) overrides.format = format;

        const hedef = params.get('hedef');
        if (hedef !== null) overrides.hedef = hedef;

        const lang = params.get('lang');
        if (lang !== null && (lang === 'tr' || lang === 'en')) overrides.lang = lang;

        if (Object.keys(overrides).length > 0) {
            const cur = useEngineState.getState().config;
            const raw = {
                domain: resolvedDomain,
                seviye: overrides.seviye ?? cur.seviye,
                mod: overrides.mod ?? cur.mod,
                derinlik: overrides.derinlik ?? cur.derinlik,
                format: overrides.format ?? cur.format,
                hedef: overrides.hedef ?? cur.hedef
            };
            if (overrides.konu !== undefined) raw.konu = overrides.konu;
            if (overrides.alan !== undefined) raw.alan = overrides.alan;
            const { clean, warnings } = sanitizePayloadWithWarnings(raw, cur.lang);
            const applied = {};
            for (const key of Object.keys(overrides)) {
                if (key === 'lang') {
                    applied[key] = overrides.lang;
                } else {
                    applied[key] = clean[key];
                }
            }
            // NOTE: overrides intentionally do not eject activePreset. Deep links
            // always carry ?preset= together with the preset's own values, so
            // ejecting here would break every shared preset round-trip.
            useEngineState.setState((state) => ({
                config: { ...state.config, ...applied }
            }));
            if (warnings.some((w) => w.field && w.field in overrides)) {
                notifyWarn(t0.toastUrlParamsFixed);
            }
        }
    }, []);

    // Sync active state back to URL query parameters dynamically (debounced 250ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                const activeDomain = getDomain(config.domain);
                const route = activeDomain ? activeDomain.route : 'learn';
                const params = new URLSearchParams();

                if (config.konu) params.set('konu', config.konu);
                if (config.alan) params.set('alan', config.alan);
                if (config.mod) params.set('mod', config.mod);
                if (config.seviye && config.seviye !== 'otomatik') params.set('seviye', config.seviye);
                if (config.derinlik && config.derinlik !== 'orta') params.set('derinlik', config.derinlik);
                if (config.format && config.format !== 'markdown') params.set('format', config.format);
                // config.hedef is part of the compiled output: without it a
                // copied URL silently loses the output target on reopen (Phase 16.2).
                if (config.hedef && config.hedef !== 'markdown') params.set('hedef', config.hedef);
                
                if (activePreset) {
                    params.set('preset', activePreset);
                } else if (selectedModules && selectedModules.length > 0) {
                    params.set('modules', selectedModules.join(','));
                }

                const queryString = params.toString();
                const targetPath = `/${route}`;
                const newUrl = `${targetPath}${queryString ? '?' + queryString : ''}`;

                if (window.location.pathname + window.location.search !== newUrl) {
                    window.history.replaceState(null, '', newUrl);
                }
            } catch (err) {
                console.warn('URL state sync failed:', err);
            }
        }, 250);

        return () => clearTimeout(timer);
    }, [config.domain, config.konu, config.alan, config.mod, config.seviye, config.derinlik, config.format, config.hedef, activePreset, selectedModules]);

    // Browser back/forward navigation
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
        const timers = toastTimers.current;
        return () => {
            timers.forEach(clearTimeout);
        };
    }, []);

    const showToast = (msg, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [{ id, msg, type }, ...prev]);
        const timerId = setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
            toastTimers.current.delete(id);
        }, 3000);
        toastTimers.current.set(id, timerId);
    };

    const isAdvanced = config.gorunum === 'advanced';
    const t = getTranslation(config.lang, config.domain);

    return (
        <ErrorBoundary>
            <div className="app">
                <div className="bg-glow-orb orb-1"></div>
                <div className="bg-glow-orb orb-2"></div>
                <Header showDomainSwitcher={true} />
                
                {isAdvanced ? (
                    <main className="container advanced-container" style={{ paddingTop: '16px' }}>
                        <div className="workspace-topbar">
                            <button type="button" className="btn btn-secondary workspace-back-btn" onClick={() => setGorunum('default')}>
                                <ArrowLeft size={15} /> {t.flow?.modeDefault || 'Default'}
                            </button>
                            <span className="workspace-topic-label">{t.flow?.modeAdvanced || 'Advanced'}</span>
                        </div>
                        <div className="layout-grid-3">
                            <div className="sidebar">
                                <ConfigPanel />
                            </div>
                            <div className="main-content">
                                <TopicInput />
                                <PresetBar />
                                <ModuleGrid key={config.domain} />
                            </div>
                            <div className="right-sidebar">
                                <ActionBar showToast={showToast} />
                                <PreviewPanel />
                            </div>
                        </div>
                    </main>
                ) : (
                    <DefaultFlow onAdvanced={() => setGorunum('advanced')} showToast={showToast} />
                )}

                <div className="toast-container">
                    {toasts.map((toast) => (
                        <Toast key={toast.id} msg={toast.msg} type={toast.type} />
                    ))}
                </div>
                {isAdvanced && <OnboardingTour />}
            </div>
        </ErrorBoundary>
    );
}
