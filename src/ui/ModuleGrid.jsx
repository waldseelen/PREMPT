import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getModuleRegistry } from '../engine/moduleRegistry';
import { getSuggestions } from '../engine/intelligenceLayer';
import { getTranslation } from '../locales/i18n';
import { getDomain } from '../domains';
import { useMemo, useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { getModuleIcon } from './moduleIconRegistry';
import { getModuleHoverModel } from './moduleHover';

export default function ModuleGrid() {
    const { config, selectedModules, setModules, toggleModule, dependencyHints } = useEngineState(useShallow(state => ({
        config: state.config,
        selectedModules: state.selectedModules,
        setModules: state.setModules,
        toggleModule: state.toggleModule,
        dependencyHints: state.dependencyHints
    })));
    
    const modules = getModuleRegistry(config.domain, config.lang);
    const t = getTranslation(config.lang, config.domain);
    const layers = getDomain(config.domain).layers;

    const suggestions = useMemo(() => {
        return getSuggestions(config, selectedModules);
    }, [config, selectedModules]);

    // Dependency-status visualization: a selected module counts as a
    // "resolved prerequisite" if it's also listed in another *currently
    // selected* module's `requires` — regardless of whether autoResolveDeps
    // added it or the user picked both by hand. Derived from data already on
    // the client (module registry + selection), no engine change needed.
    const prereqIds = useMemo(() => {
        const set = new Set();
        selectedModules.forEach((id) => {
            const mod = modules.find((m) => m.id === id);
            (mod?.requires || []).forEach((reqId) => {
                if (selectedModules.includes(reqId)) set.add(reqId);
            });
        });
        return set;
    }, [selectedModules, modules]);

    // Hover-link: highlight a card's prerequisite(s) elsewhere in the grid
    // instead of drawing cross-column SVG connectors, which would be fragile
    // against the categories-container's CSS grid reflow.
    const [hoveredId, setHoveredId] = useState(null);
    const hoveredRequires = useMemo(() => {
        const hovered = hoveredId ? modules.find((m) => m.id === hoveredId) : null;
        return new Set(hovered?.requires || []);
    }, [hoveredId, modules]);

    return (
        <section className="card delay-4" style={{ position: 'relative', paddingTop: 0 }}>
            <div className="modules-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 10, padding: '16px 0 12px 0', margin: '0 -16px 16px -16px', paddingLeft: '16px', paddingRight: '16px', borderBottom: '1px solid var(--border)' }}>
                <div className="title-side">
                    <div className="card-title" style={{ marginBottom: 0 }}>
                        <span className="dot"></span> {t.modulesTitle}
                    </div>
                    <span className="module-counter" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '10px' }}>
                        {selectedModules.length} / {modules.length}
                    </span>
                    
                    {selectedModules.length === 0 && (
                        <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {t.emptyStateHint}
                        </div>
                    )}

                    {/* Intelligence Layer UI: Suggestions and Hints */}
                    <div style={{ marginTop: '8px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', minHeight: '18px' }}>
                        {(dependencyHints.length > 0 || suggestions.length > 0) && (
                            <>
                                {dependencyHints.map((hint, idx) => (
                                    <span key={`hint-${hint.substring(0, 10)}-${idx}`} style={{ color: 'var(--accent-1)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                        <Lightbulb size={12} /> {hint}
                                    </span>
                                ))}
                                {suggestions.map((sug) => {
                                    const modName = modules.find(m => m.id === sug.id)?.name;
                                    const reasonText = t.suggestionReasons?.[sug.reasonKey] || t.suggestAdd;
                                    return (
                                        <span
                                            key={`sug-${sug.id}`}
                                            role="button"
                                            tabIndex={0}
                                            style={{ color: 'var(--accent-2)', cursor: 'pointer' }}
                                            onClick={() => toggleModule(sug.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    toggleModule(sug.id);
                                                }
                                            }}
                                        >
                                            {t.aiSuggestion}: "{modName}" — {reasonText} ({t.clickToAdd})
                                        </span>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
                <div className="modules-actions" style={{ display: 'flex', gap: '8px' }}>
                    <button 
                        className="btn btn-secondary" 
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }} 
                        onClick={() => setModules(modules.map(m => m.id))}
                    >
                        {t.selectAll}
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }} 
                        onClick={() => setModules([])}
                    >
                        {t.clearAll}
                    </button>
                </div>
            </div>
            
            {/* --module-columns drives .categories-container's grid-template-columns
                (index.css) so the column count matches this domain's actual layer
                count instead of a hardcoded 5 -- mobile/tablet breakpoints still
                override it via source order, see the CSS comment. */}
            <div className="categories-container" style={{ '--module-columns': layers.length }}>
                {layers.map(catKey => {
                    const catModules = modules.filter(m => m.layer === catKey);
                    const catTitle = t.categories?.[catKey] || catKey;
                    const activeCount = catModules.filter(m => selectedModules.includes(m.id)).length;
                    
                    return (
                        <div key={catKey} className={`category-column category-${catKey}`}>
                            <div className="category-column-header">
                                <span className="category-column-title">{catTitle}</span>
                                <span className="category-column-counter">
                                    {activeCount} / {catModules.length}
                                </span>
                            </div>
                            <div className="category-modules-list">
                                {catModules.map(mod => {
                                    const isActive = selectedModules.includes(mod.id);
                                    const isSuggested = suggestions.some(s => s.id === mod.id);
                                    const isPrereq = isActive && prereqIds.has(mod.id);
                                    const isPrereqHighlight = hoveredId && hoveredId !== mod.id && hoveredRequires.has(mod.id);
                                    const Icon = getModuleIcon(mod.id);
                                    const hover = getModuleHoverModel(mod, modules, t);
                                    const cardClasses = [
                                        'module-card',
                                        isActive ? 'active' : '',
                                        isSuggested && !isActive ? 'suggested' : '',
                                        isPrereq ? 'is-prereq' : '',
                                        isPrereqHighlight ? 'is-prereq-highlight' : ''
                                    ].filter(Boolean).join(' ');

                                    return (
                                        <div
                                            key={mod.id}
                                            className={cardClasses}
                                            onClick={() => toggleModule(mod.id)}
                                            onMouseEnter={() => setHoveredId(mod.id)}
                                            onMouseLeave={() => setHoveredId(null)}
                                            role="button"
                                            tabIndex={0}
                                            aria-pressed={isActive}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    toggleModule(mod.id);
                                                }
                                            }}
                                            style={{ position: 'relative' }}
                                        >
                                            <div className="module-icon"><Icon size={18} strokeWidth={1.5} /></div>
                                            <div className="module-info">
                                                <div className="module-name" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.82rem' }}>
                                                    {mod.name}
                                                    {isPrereq && <span className="status-badge status-badge-emerald" title={t.autoResolved}>✓</span>}
                                                    {isSuggested && !isActive && <span className="status-badge status-badge-amber">AI</span>}
                                                </div>
                                            </div>

                                            {/* Central module hover model: content remains in bilingual module data. */}
                                            <div className="module-tooltip">
                                                <div className="tooltip-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span>{hover.icon}</span> {hover.title}
                                                </div>
                                                {hover.description && (
                                                    <div className="tooltip-explain">{hover.description}</div>
                                                )}
                                                {hover.promptPreview && (
                                                    <div className="tooltip-prompt-preview">
                                                        "{hover.promptPreview}"
                                                    </div>
                                                )}
                                                {hover.requirements.length > 0 && (
                                                    <div className="tooltip-reqs">
                                                        <span className="tooltip-reqs-icon">{t.reqsLabel}</span>{' '}
                                                        {hover.requirements.map((requirement) => `"${requirement.name}"`).join(', ')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
