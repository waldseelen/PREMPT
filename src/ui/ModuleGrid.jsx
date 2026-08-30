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
import PortalTooltip from './PortalTooltip';

const VIEW_KEYS = ['all', 'recommended', 'selected'];

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
    const [view, setView] = useState('all');
    const [query, setQuery] = useState('');
    const [activeLayer, setActiveLayer] = useState('all');
    const [expandedLayers, setExpandedLayers] = useState(() => new Set(layers));
    const [hoveredId, setHoveredId] = useState(null);
    const [hoveredTarget, setHoveredTarget] = useState(null);

    const suggestions = useMemo(() => getSuggestions(config, selectedModules), [config, selectedModules]);
    const suggestionIds = useMemo(() => new Set(suggestions.map((suggestion) => suggestion.id)), [suggestions]);
    const recommendedIds = useMemo(() => {
        if (suggestionIds.size > 0) return suggestionIds;
        return new Set(layers.flatMap((layer) => modules.filter((module) => module.layer === layer).slice(0, 2).map((module) => module.id)));
    }, [layers, modules, suggestionIds]);

    const prereqIds = useMemo(() => {
        const required = new Set();
        selectedModules.forEach((id) => {
            const mod = modules.find((m) => m.id === id);
            (mod?.requires || []).forEach((req) => required.add(req));
        });
        return required;
    }, [selectedModules, modules]);

    const hoveredRequires = useMemo(() => {
        if (!hoveredId) return new Set();
        const mod = modules.find((m) => m.id === hoveredId);
        return new Set(mod?.requires || []);
    }, [hoveredId, modules]);

    const normalizedQuery = query.trim().toLowerCase();

    const visibleModules = useMemo(() => {
        return modules.filter((module) => {
            if (activeLayer !== 'all' && module.layer !== activeLayer) return false;

            if (view === 'selected' && !selectedModules.includes(module.id)) return false;
            if (view === 'recommended' && !recommendedIds.has(module.id) && !selectedModules.includes(module.id)) return false;

            if (!normalizedQuery) return true;
            return (
                module.name.toLowerCase().includes(normalizedQuery) ||
                module.desc.toLowerCase().includes(normalizedQuery) ||
                module.id.toLowerCase().includes(normalizedQuery)
            );
        });
    }, [modules, activeLayer, view, selectedModules, recommendedIds, normalizedQuery]);

    const visibleModuleIds = useMemo(() => new Set(visibleModules.map((module) => module.id)), [visibleModules]);

    const toggleAllVisible = () => {
        const targetIds = visibleModules.map((module) => module.id);
        const allSelected = targetIds.every((id) => selectedModules.includes(id));
        if (allSelected) {
            setModules(selectedModules.filter((id) => !targetIds.includes(id)));
            return;
        }
        setModules(Array.from(new Set([...selectedModules, ...targetIds])));
    };

    const toggleLayerExpansion = (layerKey) => {
        setExpandedLayers((prev) => {
            const next = new Set(prev);
            if (next.has(layerKey)) {
                next.delete(layerKey);
            } else {
                next.add(layerKey);
            }
            return next;
        });
    };

    const emptyMessage = view === 'selected'
        ? (t.emptyStateHint || 'Henüz modül seçilmedi.')
        : (t.moduleFilterEmpty || 'Aradığınız kriterlere uygun modül bulunamadı.');

    return (
        <section className="card delay-2 module-discovery" aria-label={t.modulesTitle || 'Modüller'}>
            <div className="card-title">
                <span className="dot"></span>
                {t.modulesTitle || 'Modüller (Module Blocks)'}
                <span className="badge" style={{ marginLeft: 'auto' }}>
                    {selectedModules.length}/{modules.length}
                </span>
            </div>

            {dependencyHints.length > 0 && (
                <div className="dependency-alert" role="status">
                    <Lightbulb size={14} />
                    <span>{dependencyHints[0]}</span>
                </div>
            )}

            <div className="module-control-bar">
                <div className="module-filter-row">
                    <label className="module-search-input" aria-label={t.moduleSearchPlaceholder || 'Modül ara'}>
                        <Search size={14} />
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={t.moduleSearchPlaceholder || 'Modül ara...'}
                        />
                    </label>

                    <div className="modules-actions">
                        <button type="button" className="btn btn-secondary" onClick={toggleAllVisible}>
                            <Check size={13} /> {visibleModules.every((module) => selectedModules.includes(module.id)) ? t.clearAll : t.selectAll}
                        </button>
                    </div>

                    <div className="module-view-pills" role="tablist" aria-label={t.modulesTitle}>
                        {VIEW_KEYS.map((key) => {
                            const label = key === 'recommended'
                                ? t.moduleViewRecommended
                                : key === 'selected'
                                    ? t.moduleViewSelected
                                    : t.moduleViewAll;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    role="tab"
                                    aria-selected={view === key}
                                    className={`view-pill ${view === key ? 'is-active' : ''}`}
                                    onClick={() => setView(key)}
                                >
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
                                className="category-header-toggle"
                                onClick={() => toggleLayerExpansion(catKey)}
                                aria-expanded={isExpanded}
                                aria-controls={`module-list-${catKey}`}
                            >
                                <span className="cat-title-text">{catTitle}</span>
                                <span className="cat-header-meta">
                                    <span className="cat-count">
                                        {activeCount > 0 && <strong className="cat-active-pill">{activeCount}</strong>}
                                        {catModules.length}
                                    </span>
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
                                                onMouseEnter={(event) => {
                                                    setHoveredId(mod.id);
                                                    setHoveredTarget({ id: mod.id, rect: event.currentTarget.getBoundingClientRect(), mod });
                                                }}
                                                onMouseLeave={() => {
                                                    setHoveredId(null);
                                                    setHoveredTarget(null);
                                                }}
                                                onFocus={(event) => {
                                                    setHoveredId(mod.id);
                                                    setHoveredTarget({ id: mod.id, rect: event.currentTarget.getBoundingClientRect(), mod });
                                                }}
                                                onBlur={() => {
                                                    setHoveredId(null);
                                                    setHoveredTarget(null);
                                                }}
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
                                                        {isPrereq && <span className="status-badge status-badge-emerald" title={t.autoResolved}><Check size={11} /></span>}
                                                        {isSuggested && !isActive && <span className="status-badge status-badge-amber">AI</span>}
                                                    </div>
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

            {hoveredTarget && (
                <PortalTooltip targetRect={hoveredTarget.rect} isOpen={Boolean(hoveredTarget)}>
                    {(() => {
                        const hover = getModuleHoverModel(hoveredTarget.mod, modules, t);
                        const TooltipIcon = getModuleIcon(hoveredTarget.mod.id);
                        return (
                            <>
                                <div className="tooltip-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <TooltipIcon size={16} strokeWidth={1.6} />
                                    <span>{hover.title}</span>
                                </div>
                                {hover.description && <div className="tooltip-explain">{hover.description}</div>}
                                {hover.promptPreview && <div className="tooltip-prompt-preview">“{hover.promptPreview}”</div>}
                                {hover.requirements.length > 0 && (
                                    <div className="tooltip-reqs">
                                        <span className="tooltip-reqs-icon">{t.reqsLabel}</span>{' '}
                                        {hover.requirements.map((requirement) => `“${requirement.name}”`).join(', ')}
                                    </div>
                                )}
                            </>
                        );
                    })()}
                </PortalTooltip>
            )}
        </section>
    );
}
