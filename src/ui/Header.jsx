import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { Sun, Moon, HelpCircle } from 'lucide-react';
import { getNextTheme, getThemeLabel } from '../config/theme';
import DomainSwitcher from './DomainSwitcher';
import PremptLogo from './PremptLogo';

export default function Header({ showDomainSwitcher = true }) {
    const { config, view, setTheme, setConfig, startTour, enterWorkspace } = useEngineState(useShallow(state => ({
        config: state.config,
        view: state.view,
        setTheme: state.setTheme,
        setConfig: state.setConfig,
        startTour: state.startTour,
        enterWorkspace: state.enterWorkspace
    })));
    const t = getTranslation(config.lang, config.domain);

    const toggleTheme = () => {
        setTheme(getNextTheme(config.theme));
    };

    const handleReplayTour = () => {
        if (view !== 'workspace') enterWorkspace();
        startTour();
    };

    const toggleLang = () => {
        setConfig('lang', config.lang === 'en' ? 'tr' : 'en');
    };

    const ThemeIcon = config.theme === 'light' ? Moon : Sun;

    return (
        <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', padding: '12px 20px' }}>
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PremptLogo size={34} />
                <div>
                    <h1 style={{ fontSize: '1.15rem', margin: 0, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                        PREMPT
                    </h1>
                    <p style={{ fontSize: '0.65rem', margin: 0, color: 'var(--text-muted)', whiteSpace: 'nowrap', letterSpacing: '0.01em', fontWeight: 400 }}>
                        Parametric AI Engine
                    </p>
                </div>
            </div>
            
                <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
                    {showDomainSwitcher ? <DomainSwitcher /> : <span className="header-context-label">PREMPT</span>}
                </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
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
                    title={getThemeLabel(config.lang, config.theme)}
                >
                    <ThemeIcon size={18} />
                </button>
            </div>
        </header>
    );
}
