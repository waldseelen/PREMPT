import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { Sparkles, LayoutGrid } from 'lucide-react';

export default function ModeTogglePill() {
    const { config, setGorunum } = useEngineState(useShallow((state) => ({
        config: state.config,
        setGorunum: state.setGorunum
    })));

    const t = getTranslation(config.lang, config.domain);
    const isAdvanced = config.gorunum === 'advanced';

    return (
        <div className="mode-toggle-pill" role="radiogroup" aria-label={t.viewModeLabel || 'Çalışma Alanı Görünümü'}>
            <button
                type="button"
                role="radio"
                aria-checked={!isAdvanced}
                className={`mode-pill-btn ${!isAdvanced ? 'is-active' : ''}`}
                onClick={() => setGorunum('default')}
            >
                <Sparkles size={13} aria-hidden="true" />
                <span>{t.modeUnified || 'Standart'}</span>
            </button>
            <button
                type="button"
                role="radio"
                aria-checked={isAdvanced}
                className={`mode-pill-btn ${isAdvanced ? 'is-active' : ''}`}
                onClick={() => setGorunum('advanced')}
            >
                <LayoutGrid size={13} aria-hidden="true" />
                <span>{t.modeCockpit || 'Kokpit'}</span>
            </button>
        </div>
    );
}
