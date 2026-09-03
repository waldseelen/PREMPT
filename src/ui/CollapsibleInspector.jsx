import { useState, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useEngineState } from '../store/engineState';
import { analyzePromptComplexity } from '../compiler/finalPromptAssembler';
import { getTranslation } from '../locales/i18n';
import ActiveModuleBadgeRow from './ActiveModuleBadgeRow';
import ModuleGrid from './ModuleGrid';
import { Zap, Component, Brain, Hash, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function CollapsibleInspector() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { config, selectedModules, injectedRules, setConfig } = useEngineState(useShallow(state => ({
        config: state.config,
        selectedModules: state.selectedModules,
        injectedRules: state.injectedRules,
        setConfig: state.setConfig
    })));

    const t = getTranslation(config.lang, config.domain);

    const stats = useMemo(() => {
        return analyzePromptComplexity({ config, selectedModules, injectedRules });
    }, [config, selectedModules, injectedRules]);

    return (
        <section className="collapsible-inspector-container" aria-label={t.inspectorTitle || 'Modül Denetçisi'}>
            <ActiveModuleBadgeRow
                isExpanded={isExpanded}
                onToggleExpand={() => setIsExpanded(prev => !prev)}
            />

            {isExpanded && (
                <div
                    id="collapsible-inspector-drawer"
                    className="collapsible-inspector-drawer is-open"
                    role="region"
                    aria-label={t.inspectorTitle || (config.lang === 'en' ? 'Module Inspector' : 'Modül Denetçisi')}
                >
                    <div className="inspector-toolbar">
                        <div className="inspector-auto-resolve">
                            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={config.autoResolveDeps}
                                    onChange={(e) => setConfig('autoResolveDeps', e.target.checked)}
                                />
                                <span>{t.autoResolveLabel || (config.lang === 'en' ? 'Auto-resolve Dependencies (DAG)' : 'Otomatik Bağımlılık Çözme (DAG)')}</span>
                            </label>
                        </div>

                        {injectedRules && injectedRules.length > 0 && (
                            <div className="inspector-rules-badge" title={injectedRules.join(' · ')}>
                                <ShieldAlert size={13} aria-hidden="true" />
                                <span>{injectedRules.length} {t.activeConstraintRules || (config.lang === 'en' ? 'Active Preset Rules' : 'Aktif Şablon Kuralı')}</span>
                            </div>
                        )}

                        <div className="inspector-stats-pills">
                            <span className="stat-pill" title={t.statModules}>
                                <Component size={12} aria-hidden="true" /> {stats.moduleCount} {t.statModules || (config.lang === 'en' ? 'Modules' : 'Modül')}
                            </span>
                            <span className="stat-pill" title={t.statLayers}>
                                <Brain size={12} aria-hidden="true" /> {stats.layersUsed} {t.statLayers || (config.lang === 'en' ? 'Layers' : 'Katman')}
                            </span>
                            <span className="stat-pill" title={t.statComplexity}>
                                <Zap size={12} aria-hidden="true" /> {stats.complexityScore} {t.statComplexity || (config.lang === 'en' ? 'Score' : 'Skor')}
                            </span>
                            {stats.tokens > 0 && (
                                <span className="stat-pill" title={t.previewTokens || (config.lang === 'en' ? 'Tokens' : 'Token')}>
                                    <Hash size={12} aria-hidden="true" /> ~{stats.tokens} tok
                                </span>
                            )}
                            {stats.isTooLongForUrl && (
                                <span className="stat-pill stat-pill-warning" title={t.previewWarning}>
                                    <AlertTriangle size={12} aria-hidden="true" /> &gt;3800 ch
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="inspector-grid-wrapper">
                        <ModuleGrid key={config.domain} />
                    </div>
                </div>
            )}
        </section>
    );
}
