import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { DOMAINS, DEFAULT_DOMAIN } from '../domains';
import { Sun, Moon, HelpCircle } from 'lucide-react';

export default function Header() {
    const { config, view, setTheme, setConfig, setDomain, startTour, enterWorkspace } = useEngineState(useShallow(state => ({
        config: state.config,
        view: state.view,
        setTheme: state.setTheme,
        setConfig: state.setConfig,
        setDomain: state.setDomain,
        startTour: state.startTour,
        enterWorkspace: state.enterWorkspace
    })));
    const t = getTranslation(config.lang, config.domain);
    const activeDomain = config.domain ?? DEFAULT_DOMAIN;

    const toggleTheme = () => {
        setTheme(config.theme === 'light' ? 'dark' : 'light');
    };

    // Tour steps are anchored to workspace-only DOM (see OnboardingTour.jsx),
    // so replaying it from intro must switch views first.
    const handleReplayTour = () => {
        if (view !== 'workspace') enterWorkspace();
        startTour();
    };

    const toggleLang = () => {
        setConfig('lang', config.lang === 'en' ? 'tr' : 'en');
    };

    const ThemeIcon = config.theme === 'light' ? Moon : Sun;

    return (
        <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <div>
                <h1>{t.title}</h1>
                <p>{t.subtitle}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                <div className="domain-switch" role="tablist" aria-label="Domain">
                    {Object.values(DOMAINS).map((d) => (
                        <button
                            key={d.id}
                            role="tab"
                            aria-selected={activeDomain === d.id}
                            className={`domain-switch-pill ${activeDomain === d.id ? 'active' : ''}`}
                            onClick={() => setDomain(d.id)}
                        >
                            {getTranslation(config.lang, d.id).switchLabel}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleReplayTour}
                    className="header-icon-btn"
                    title={t.tour?.btnReplay || 'Quick Tour'}
                >
                    <HelpCircle size={18} strokeWidth={1.5} />
                </button>
                <button
                    onClick={toggleLang}
                    className="header-icon-btn"
                    style={{ fontSize: '0.75rem', fontWeight: 700 }}
                    title={config.lang === 'en' ? 'Türkçe' : 'English'}
                >
                    {config.lang === 'en' ? 'TR' : 'EN'}
                </button>
                <button
                    onClick={toggleTheme}
                    className="header-icon-btn"
                    title={`Theme: ${config.theme}`}
                >
                    <ThemeIcon />
                </button>
            </div>
        </header>
    );
}
