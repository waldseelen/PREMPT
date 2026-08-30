import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { analyzePromptComplexity, assembleFinalPrompt } from '../compiler/finalPromptAssembler';
import { useEngineState } from '../store/engineState';
import { getTranslation } from '../locales/i18n';
import { Component, Brain, Zap, Hash } from 'lucide-react';

export default function PreviewPanel() {
    const { config, selectedModules, injectedRules } = useEngineState(useShallow(state => ({
        config: state.config,
        selectedModules: state.selectedModules,
        injectedRules: state.injectedRules
    })));

    const t = getTranslation(config.lang, config.domain);

    const stats = useMemo(() => {
        return analyzePromptComplexity({ config, selectedModules, injectedRules });
    }, [config, selectedModules, injectedRules]);

    // Compiled live — no separate "Generate" step. injectedRules is part of
    // the compiled output (structureBuilder reads it) but isn't in `config`,
    // so it's an explicit dependency here.
    const generatedPrompt = useMemo(() => {
        return assembleFinalPrompt({ config, selectedModules, injectedRules });
    }, [config, selectedModules, injectedRules]);

    return (
        <section className={`card preview-panel ${generatedPrompt ? 'has-prompt' : 'is-empty'}`} id="preview-card" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, marginBottom: 0 }}>
            <div className="preview-header">
                <div className="card-title" style={{ marginBottom: 0 }}>
                    <span className="dot" style={{ background: 'var(--accent-2)' }}></span> {t.previewTitle}
                </div>
                {generatedPrompt && (
                    <div className="preview-stats" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span className="stat-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Component size={12} /> {stats.moduleCount} {t.statModules}
                        </span>
                        <span className="stat-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Brain size={12} /> {stats.layersUsed} {t.statLayers}
                        </span>
                        <span className="stat-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Zap size={12} /> {stats.complexityScore} {t.statComplexity}
                        </span>
                        <span className="stat-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Hash size={12} /> {stats.charCount} ({stats.tokenEstimate} tok)
                        </span>
                    </div>
                )}
            </div>

            {stats.isTooLongForUrl && generatedPrompt && (
                <div style={{ padding: '12px', background: 'var(--warning-bg)', border: '1px solid var(--warning-border)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--warning-text)', fontWeight: 500 }}>
                    {t.previewWarning}
                </div>
            )}

            {generatedPrompt ? (
                <div className="preview-box" id="preview-box" tabIndex={0} role="region" aria-label={t.previewTitle || 'Compiled prompt'}>
                    {generatedPrompt}
                </div>
            ) : (
                <div className="preview-empty" style={{ gap: '12px', padding: '1.25rem 1rem' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-1)' }}>
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" style={{ opacity: 0.3 }} />
                            <polyline points="14 2 14 8 20 8" style={{ opacity: 0.3 }} />
                            <line x1="8" y1="13" x2="16" y2="13" className="pulse-line-1" />
                            <line x1="8" y1="17" x2="14" y2="17" className="pulse-line-2" />
                        </svg>
                    </div>
                    <p style={{ fontSize: '0.8rem', fontStyle: 'italic', maxWidth: '240px', lineHeight: 1.4, margin: 0 }}>
                        {t.previewEmpty}
                    </p>
                </div>
            )}
        </section>
    );
}
