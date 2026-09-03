import { useState } from 'react';
import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { assembleFinalPrompt } from '../compiler/finalPromptAssembler';
import { copyToClipboard } from '../utils/aiRouter';
import TopicInput from './TopicInput';
import HeroPresetSelector from './HeroPresetSelector';
import ActionBar from './ActionBar';
import ParameterChipsBar from './ParameterChipsBar';
import CollapsibleInspector from './CollapsibleInspector';
import PreviewPanel from './PreviewPanel';
import { Eye, EyeOff, LayoutGrid } from 'lucide-react';

export default function DefaultFlow({ onAdvanced, showToast }) {
    const [showPreview, setShowPreview] = useState(true);

    const { config } = useEngineState(useShallow((state) => ({
        config: state.config
    })));

    const t = getTranslation(config.lang, config.domain);

    const handleTopicSubmit = () => {
        const currentState = useEngineState.getState();
        const prompt = assembleFinalPrompt(currentState);
        if (!prompt) {
            showToast?.(t.toastNeedPrompt || 'Önce bir konu girip en az bir modül seçmelisiniz.', 'warn');
            return;
        }
        copyToClipboard(prompt,
            () => showToast?.(t.toastCopied || 'Panoya kopyalandı!'),
            () => showToast?.(t.toastCopyFail || 'Kopyalama başarısız oldu.', 'warn')
        );
    };

    return (
        <main className="container progressive-workspace-container" style={{ paddingTop: '16px', paddingBottom: '32px' }}>
            {/* L0: Intent-First Core Workspace */}
            <div className="progressive-tier tier-l0" role="region" aria-label={config.lang === 'en' ? 'L0: Intent & Presets' : 'L0: Amaç ve Şablonlar'}>
                <TopicInput onSubmit={handleTopicSubmit} autoFocus isHero />
                <HeroPresetSelector />
                <ActionBar showToast={showToast} />
            </div>

            {/* L1: Contextual Tuning via Interactive Parameter Chips */}
            <div className="progressive-tier tier-l1" role="region" aria-label={t.contextualTuning ? `L1: ${t.contextualTuning}` : (config.lang === 'en' ? 'L1: Contextual Tuning' : 'L1: Bağlamsal Ayarlar')}>
                <ParameterChipsBar />
            </div>

            {/* L2: Collapsible Granular Inspector & Eject Mechanism */}
            <div className="progressive-tier tier-l2" role="region" aria-label={t.inspectorTitle ? `L2: ${t.inspectorTitle}` : (config.lang === 'en' ? 'L2: Granular Inspector' : 'L2: Modül Denetçisi')}>
                <CollapsibleInspector />
            </div>

            {/* Live Preview Panel with Toggle */}
            <div className="progressive-tier tier-preview" role="region" aria-label={t.previewTitle || (config.lang === 'en' ? 'Prompt Preview' : 'Prompt Önizleme')}>
                <div className="progressive-preview-header" style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                        type="button"
                        className="btn btn-secondary cockpit-launch-btn"
                        onClick={onAdvanced}
                        title={t.flow?.startAdvanced || (config.lang === 'en' ? 'Open Advanced mode' : 'Gelişmiş görünüme geç')}
                    >
                        <LayoutGrid size={14} aria-hidden="true" />
                        <span>{t.modeCockpit || (config.lang === 'en' ? 'Cockpit' : 'Kokpit')}</span>
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary preview-toggle-btn"
                        onClick={() => setShowPreview((prev) => !prev)}
                        aria-expanded={showPreview}
                    >
                        {showPreview ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
                        <span>{showPreview ? (t.flow?.hidePreview || (config.lang === 'en' ? 'Hide preview' : 'Önizlemeyi Gizle')) : (t.flow?.showPreview || (config.lang === 'en' ? 'Show preview' : 'Önizlemeyi Göster'))}</span>
                    </button>
                </div>
                {showPreview && (
                    <div className="progressive-preview-content">
                        <PreviewPanel />
                    </div>
                )}
            </div>
        </main>
    );
}
