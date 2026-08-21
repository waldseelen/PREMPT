import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Check, ChevronDown, Lightbulb, Search, SlidersHorizontal } from 'lucide-react';
import { useEngineState } from '../store/engineState';
import { getModuleRegistry } from '../engine/moduleRegistry';
import { getSuggestions } from '../engine/intelligenceLayer';
import { getTranslation } from '../locales/i18n';
import { getDomain } from '../domains';
import { getModuleIcon } from './moduleIconRegistry';
import { getModuleHoverModel } from './moduleHover';

const VIEW_KEYS = ['recommended', 'selected', 'all'];

export default function ModuleGrid() {
    const { config, selectedModules, setModules, toggleModule, dependencyHints } = useEngineState(useShallow((state) => ({
        config: state.config,
        selectedModules: state.selectedModules,
        setModules: state.setModules,
        toggleModule: state.toggleModule,
        dependencyHints: state.dependencyHints
    })));

    const modules = getModuleRegistry(config.domain, config.lang);
    const t = getTranslation(config.lang, config.domain);
    const layers = getDomain(config.domain).layers;
    const [view, setView] = useState('recommended');
    const [query, setQuery] = useState('');
    const [activeLayer, setActiveLayer] = useState('all');
    const [expandedLayers, setExpandedLayers] = useState(() => new Set(layers));
    const [hoveredId, setHoveredId] = useState(null);


    const suggestions = useMemo(() => getSuggestions(config, selectedModules), [config, selectedModules]);
    const suggestionIds = useMemo(() => new Set(suggestions.map((suggestion) => suggestion.id)), [suggestions]);
    const recommendedIds = useMemo(() => {
        if (suggestionIds.size > 0) return suggestionIds;
        return new Set(layers.flatMap((layer) => modules.filter((module) => module.layer === layer).slice(0, 2).map((module) => module.id)));
    }, [layers, modules, suggestionIds]);

    const prereqIds = useMemo(() => {
        const set = new Set();
        selectedModules.forEach((id) => {
            const mod = modules.find((module) => module.id === id);
            (mod?.requires || []).forEach((reqId) => {
                if (selectedModules.includes(reqId)) set.add(reqId);
            });
        });
        return set;
    }, [selectedModules, modules]);

    const hoveredRequires = useMemo(() => {
        const hovered = hoveredId ? modules.find((module) => module.id === hoveredId) : null;
        return new Set(hovered?.requires || []);
    }, [hoveredId, modules]);

    const normalizedQuery = query.trim().toLocaleLowerCase(config.lang === 'tr' ? 'tr-TR' : 'en-US');
    const visibleModules = useMemo(() => modules.filter((module) => {
        const matchesLayer = activeLayer === 'all' || module.layer === activeLayer;
        const matchesView = view === 'all'
            || (view === 'selected' && selectedModules.includes(module.id))
            || (view === 'recommended' && (recommendedIds.has(module.id) || selectedModules.includes(module.id)));
        const searchable = `${module.name || ''} ${module.description || ''}`.toLocaleLowerCase(config.lang === 'tr' ? 'tr-TR' : 'en-US');
        return matchesLayer && matchesView && (!normalizedQuery || searchable.includes(normalizedQuery));
    }), [activeLayer, config.lang, modules, normalizedQuery, recommendedIds, selectedModules, view]);

    const visibleModuleIds = useMemo(() => new Set(visibleModules.map((module) => module.id)), [visibleModules]);

    const emptyMessage = view === 'selected' ? t.emptyStateHint : normalizedQuery ? t.moduleSearchPlaceholder : t.emptyStateHint;

    const toggleLayer = (layer) => {
        setExpandedLayers((current) => {
            const next = new Set(current);
            if (next.has(layer)) next.delete(layer);
            else next.add(layer);
            return next;
        });
    };

    return (
        <section className="card delay-4 module-discovery" style={{ position: 'relative', paddingTop: 0 }}>
            <div className="modules-header" style={{ position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 10, padding: '16px 0 12px 0', margin: '0 -16px 16px -16px', paddingLeft: '16px', paddingRight: '16px', borderBottom: '1px solid var(--border)' }}>
                <div className="module-header-topline">
                    <div className="title-side">
                        <div className="card-title" style={{ marginBottom: 0 }}>
                            <span className="dot"></span> {t.modulesTitle}
                            <span className="module-counter">{selectedModules.length} / {modules.length}</span>
                        </div>
                        {selectedModules.length === 0 && (
                            <div className="module-empty-hint">{t.emptyStateHint}</div>
                        )}
                    </div>
                    <div className="modules-actions">
                        <button className="btn btn-secondary" type="button" onClick={() => setModules(modules.map((module) => module.id))}>
                            {t.selectAll}
                        </button>
                        <button className="btn btn-secondary" type="button" onClick={() => setModules([])}>
                            {t.clearAll}
                        </button>
                    </div>
                </div>

                {(dependencyHints.length > 0 || suggestions.length > 0) && (
                    <div className="module-intelligence" aria-live="polite">
                        {dependencyHints.map((hint, index) => (
                            <span key={`hint-${hint.substring(0, 10)}-${index}`} className="module-hint">
                                <Lightbulb size={12} /> {hint}
                            </span>
                        ))}
                        {suggestions.slice(0, 3).map((suggestion) => {
                            const modName = modules.find((module) => module.id === suggestion.id)?.name;
                            const reasonText = t.suggestionReasons?.[suggestion.reasonKey] || t.suggestAdd;
                            return (
                                <button
                                    key={`sug-${suggestion.id}`}
                                    type="button"
                                    className="module-suggestion"
                                    onClick={() => toggleModule(suggestion.id)}
                                >
                                    {t.aiSuggestion}: “{modName}” — {reasonText} ({t.clickToAdd})
                                </button>
                            );
                        })}
                    </div>
                )}

                <div className="module-discovery-toolbar">
                    <label className="module-search">
                        <Search size={15} aria-hidden="true" />
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={t.moduleSearchPlaceholder}
                            aria-label={t.moduleSearchPlaceholder}
                        />
                    </label>
                    <div className="module-view-tabs" role="tablist" aria-label={t.modulesTitle}>
                        {VIEW_KEYS.map((key) => {
                            const label = key === 'recommended' ? t.moduleViewRecommended : key === 'selected' ? t.moduleViewSelected : t.moduleViewAll;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    role="tab"
                                    aria-selected={view === key}
                                    className={`module-view-tab ${view === key ? 'is-active' : ''}`}
                                    onClick={() => setView(key)}
                                >
                                    {key === 'selected' && <Check size={13} />}
                                    {label}
                                    {key === 'selected' && <span>{selectedModules.length}</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="module-category-tabs" role="tablist" aria-label={t.moduleCategoryAll}>
                    <button type="button" role="tab" aria-selected={activeLayer === 'all'} className={activeLayer === 'all' ? 'is-active' : ''} onClick={() => setActiveLayer('all')}>
                        <SlidersHorizontal size={13} /> {t.moduleCategoryAll}
                    </button>
                    {layers.map((layer) => (
                        <button key={layer} type="button" role="tab" aria-selected={activeLayer === layer} className={activeLayer === layer ? 'is-active' : ''} onClick={() => setActiveLayer(layer)}>
                            {t.categories?.[layer] || layer}
                        </button>
                    ))}
                </div>
            </div>

            <div className="categories-container" style={{ '--module-columns': layers.length }}>
                {layers.map((catKey) => {
                    const catModules = modules.filter((module) => module.layer === catKey && visibleModuleIds.has(module.id));
                    if (catModules.length === 0) return null;
                    const catTitle = t.categories?.[catKey] || catKey;
                    const activeCount = modules.filter((module) => module.layer === catKey && selectedModules.includes(module.id)).length;
                    const isExpanded = expandedLayers.has(catKey) || Boolean(normalizedQuery) || activeLayer !== 'all';

                    return (
                        <section key={catKey} className={`category-column category-${catKey} ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}>
                            <button
                                type="button"
                                className="category-column-header"
                                aria-expanded={isExpanded}
                                aria-controls={`module-list-${catKey}`}
                                onClick={() => toggleLayer(catKey)}
                            >
                                <span className="category-column-title">{catTitle}</span>
                                <span className="category-column-meta">
                                    <span className="category-column-counter">{activeCount} / {modules.filter((module) => module.layer === catKey).length}</span>
                                    {isExpanded ? <ChevronDown size={14} aria-label={t.moduleCollapse} /> : <ChevronDown size={14} aria-label={t.moduleExpand} className="is-rotated" />}
                                </span>
                            </button>
                            {isExpanded && (
                                <div className="category-modules-list" id={`module-list-${catKey}`}>
                                    {catModules.map((mod) => {
                                        const isActive = selectedModules.includes(mod.id);
                                        const isSuggested = suggestionIds.has(mod.id);
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
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter' || event.key === ' ') {
                                                        event.preventDefault();
                                                        toggleModule(mod.id);
                                                    }
                                                }}
                                                style={{ position: 'relative' }}
                                            >
                                                <div className="module-icon"><Icon size={18} strokeWidth={1.5} /></div>
                                                <div className="module-info">
                                                    <div className="module-name">
                                                        {mod.name}
                                                        {isPrereq && <span className="status-badge status-badge-emerald" title={t.autoResolved}>✓</span>}
                                                        {isSuggested && !isActive && <span className="status-badge status-badge-amber">AI</span>}
                                                    </div>
                                                </div>
                                                <div className="module-tooltip">
                                                    <div className="tooltip-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <span>{hover.icon}</span> {hover.title}
                                                    </div>
                                                    {hover.description && <div className="tooltip-explain">{hover.description}</div>}
                                                    {hover.promptPreview && <div className="tooltip-prompt-preview">“{hover.promptPreview}”</div>}
                                                    {hover.requirements.length > 0 && (
                                                        <div className="tooltip-reqs">
                                                            <span className="tooltip-reqs-icon">{t.reqsLabel}</span>{' '}
                                                            {hover.requirements.map((requirement) => `“${requirement.name}”`).join(', ')}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    );
                })}
                {visibleModules.length === 0 && (
                    <div className="module-filter-empty" role="status">{emptyMessage}</div>
                )}
            </div>
        </section>
    );
}
