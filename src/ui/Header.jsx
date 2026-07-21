import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { Sun, Moon, HelpCircle } from 'lucide-react';

const DOMAIN_ORDER = ['learning', 'code'];

export default function Header() {
    const { config, setTheme, setConfig, setDomain, startTour } = useEngineState(useShallow(state => ({
        config: state.config,
        setTheme: state.setTheme,
        setConfig: state.setConfig,
        setDomain: state.setDomain,
        startTour: state.startTour
    })));
    const t = getTranslation(config.lang, config.domain);
    const activeDomain = config.domain ?? 'learning';

    const toggleTheme = () => {
        setTheme(config.theme === 'light' ? 'dark' : 'light');
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
                    {DOMAIN_ORDER.map((domainId) => (
                        <button
                            key={domainId}
                            role="tab"
                            aria-selected={activeDomain === domainId}
                            className={`domain-switch-pill ${activeDomain === domainId ? 'active' : ''}`}
                            onClick={() => setDomain(domainId)}
                        >
                            {domainId === 'learning' ? t.domainSwitchLearn : t.domainSwitchCode}
                        </button>
                    ))}
                </div>
                <button
                    onClick={startTour}
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
