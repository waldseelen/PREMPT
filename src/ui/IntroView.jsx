import { useMemo } from 'react';
import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { getModuleRegistry } from '../engine/moduleRegistry';
import { analyzePromptComplexity } from '../compiler/finalPromptAssembler';
import TopicInput from './TopicInput';
import PresetBar from './PresetBar';
import RecipesPanel from './RecipesPanel';
import { ArrowRight, Wand2, Component, Brain, Hash } from 'lucide-react';

// Entry view: topic + preset-first "what do you need" grid. Presets
// (PresetBar) only preview a selection here — they don't navigate on their
// own, so the resolved-module pill row below stays visible before the user
// commits via "Çalışma alanını aç". "Modülleri kendim seçeceğim" is the
// explicit escape hatch so preset-first never becomes preset-mandatory.
export default function IntroView({ showToast }) {
    const { config, selectedModules, enterWorkspace, startManual } = useEngineState(useShallow(state => ({
        config: state.config,
        selectedModules: state.selectedModules,
        enterWorkspace: state.enterWorkspace,
        startManual: state.startManual
    })));
    const t = getTranslation(config.lang, config.domain);
    const modules = getModuleRegistry(config.domain, config.lang);

    const stats = useMemo(() => analyzePromptComplexity({ config, selectedModules }), [config, selectedModules]);

    const pillModules = selectedModules
        .map((id) => modules.find((m) => m.id === id))
        .filter(Boolean);

    return (
        <div className="intro-view">
            <TopicInput />

            <PresetBar />
            <RecipesPanel showToast={showToast} />

            {pillModules.length > 0 && (
                <section className="card intro-preview">
                    <div className="intro-pills">
                        {pillModules.map((mod) => (
                            <span key={mod.id} className="intro-pill">
                                <i className={`intro-pill-dot cat-dot-${mod.layer}`} />
                                {mod.name}
                            </span>
                        ))}
                    </div>
                    <div className="intro-meta">
                        <span><Component size={12} /> {stats.moduleCount} {t.statModules}</span>
                        <span><Brain size={12} /> {stats.layersUsed} {t.statLayers}</span>
                        <span><Hash size={12} /> ~{stats.tokens} {t.previewTokens}</span>
                    </div>
                </section>
            )}

            <div className="intro-actions">
                <button className="btn btn-primary intro-cta" onClick={enterWorkspace}>
                    {t.btnOpenWorkspace} <ArrowRight size={16} />
                </button>
                <button className="btn btn-secondary intro-cta" onClick={startManual}>
                    <Wand2 size={16} /> {t.btnStartManual}
                </button>
            </div>
        </div>
    );
}
