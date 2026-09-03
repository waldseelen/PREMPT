import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useEngineState } from '../store/engineState';
import { getModuleRegistry } from '../engine/moduleRegistry';
import { getModuleIcon } from './moduleIconRegistry';
import { getTranslation } from '../locales/i18n';
import { SlidersHorizontal, ChevronDown, ChevronUp, X, Sparkles, Unlock } from 'lucide-react';

export default function ActiveModuleBadgeRow({ isExpanded, onToggleExpand }) {
    const { config, selectedModules, activePreset, toggleModule, ejectPreset } = useEngineState(useShallow(state => ({
        config: state.config,
        selectedModules: state.selectedModules,
        activePreset: state.activePreset,
        toggleModule: state.toggleModule,
        ejectPreset: state.ejectPreset
    })));

    const t = getTranslation(config.lang, config.domain);
    const allModules = useMemo(() => getModuleRegistry(config.domain, config.lang), [config.domain, config.lang]);
    const moduleMap = useMemo(() => new Map(allModules.map(m => [m.id, m])), [allModules]);

    const activeList = useMemo(() => {
        return selectedModules.map(id => moduleMap.get(id)).filter(Boolean);
    }, [selectedModules, moduleMap]);

    return (
        <div className="active-module-badge-row" role="region" aria-label={t.activeModulesSummary || (config.lang === 'en' ? 'Active Modules' : 'Aktif Modüller')}>
            <div className="badge-row-summary">
                <span className="badge-summary-text">
                    <strong>{selectedModules.length}</strong> {t.modulesActiveLabel || (config.lang === 'en' ? 'Modules Active' : 'Modül Aktif')}
                </span>
                {activePreset && (
                    <span className="badge-preset-tag">
                        <Sparkles size={12} aria-hidden="true" />
                        <span className="badge-preset-name">{activePreset}</span>
                        <button
                            type="button"
                            className="btn-eject-inline"
                            onClick={ejectPreset}
                            title={t.ejectPresetTooltip || (config.lang === 'en' ? 'Unlock preset into independent customizable blocks' : 'Şablon kilidini aç')}
                            aria-label={t.ejectPresetTooltip || (config.lang === 'en' ? 'Unlock preset into independent customizable blocks' : 'Şablon kilidini aç')}
                        >
                            <Unlock size={11} aria-hidden="true" />
                            <span>{t.ejectBtn || (config.lang === 'en' ? 'Customize' : 'Özelleştir')}</span>
                        </button>
                    </span>
                )}
            </div>

            <div className="active-badge-scroll" tabIndex={0} aria-label={t.selectedModules || (config.lang === 'en' ? 'Selected Modules' : 'Seçili modüller')}>
                {activeList.map(mod => {
                    const Icon = getModuleIcon(mod.id);
                    const removeLabel = t.removeModuleAria
                        ? t.removeModuleAria.replace('{{name}}', mod.name).replace('{name}', mod.name)
                        : (config.lang === 'en' ? `Remove module ${mod.name}` : `${mod.name} modülünü kaldır`);
                    return (
                        <span key={mod.id} className="active-module-chip">
                            <Icon size={12} className="chip-icon" aria-hidden="true" />
                            <span className="chip-name">{mod.name}</span>
                            <button
                                type="button"
                                className="chip-remove-btn"
                                onClick={() => toggleModule(mod.id)}
                                title={removeLabel}
                                aria-label={removeLabel}
                            >
                                <X size={11} aria-hidden="true" />
                            </button>
                        </span>
                    );
                })}
            </div>

            <button
                type="button"
                className={`btn btn-secondary inspector-toggle-btn ${isExpanded ? 'is-active' : ''}`}
                onClick={onToggleExpand}
                aria-expanded={isExpanded}
                aria-controls="collapsible-inspector-drawer"
            >
                <SlidersHorizontal size={13} aria-hidden="true" />
                <span>{isExpanded ? (t.collapseInspector || (config.lang === 'en' ? 'Collapse Blocks' : 'Blokları Daralt')) : (t.expandInspector || (config.lang === 'en' ? 'Customize Blocks' : 'Blokları Düzenle'))}</span>
                {isExpanded ? <ChevronUp size={13} aria-hidden="true" /> : <ChevronDown size={13} aria-hidden="true" />}
            </button>
        </div>
    );
}
