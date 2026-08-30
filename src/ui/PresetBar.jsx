import { useState } from 'react';
import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { getPresets } from '../engine/presetEngine';
import { getDomain } from '../domains';
import { Check, Zap } from 'lucide-react';
import PortalTooltip from './PortalTooltip';

export default function PresetBar() {
    const { config, setPreset, activePreset } = useEngineState(useShallow((state) => ({
        config: state.config,
        setPreset: state.setPreset,
        activePreset: state.activePreset
    })));
    const [hoveredPreset, setHoveredPreset] = useState(null);

    const t = getTranslation(config.lang, config.domain);
    const domainDef = getDomain(config.domain);
    const presets = getPresets(config.domain);
    const lang = config.lang || 'tr';

    const groupOrder = [];
    const grouped = {};
    Object.entries(presets).forEach(([key, preset]) => {
        const groupKey = preset.group || 'other';
        if (!grouped[groupKey]) {
            grouped[groupKey] = [];
            groupOrder.push(groupKey);
        }
        grouped[groupKey].push(key);
    });

    const presetGroupsMap = domainDef?.ui?.[lang]?.presetGroups || domainDef?.ui?.tr?.presetGroups || t.presetGroups || {};
    const activePresetName = activePreset ? presets[activePreset]?.name?.[lang] || presets[activePreset]?.name?.tr : null;

    return (
        <section className="card delay-3 preset-discovery">
            <div className="card-title">
                <span className="dot"></span>
                {domainDef?.ui?.[lang]?.presetsTitle || t.presetsTitle || 'Uzman Hazır Şablonları (System Presets)'}
            </div>

            <div className="preset-group-list">
                {groupOrder.map((groupKey) => {
                    const groupTitle = presetGroupsMap[groupKey] || t.presetGroups?.[groupKey] || groupKey.toUpperCase();
                    return (
                        <section key={groupKey} className="preset-group">
                            <h3 className="preset-group-title">{groupTitle}</h3>
                            <div className="presets-row">
                                {grouped[groupKey].map((key) => {
                                    const preset = presets[key];
                                    const presetName = preset?.name?.[lang] || preset?.name?.tr || (typeof preset?.name === 'string' ? preset.name : null) || t.presets?.[key] || key;
                                    const description = preset?.desc?.[lang] || preset?.desc?.tr || (typeof preset?.desc === 'string' ? preset.desc : null) || t.presetDescriptions?.[key];
                                    const isActive = activePreset === key;

                                    return (
                                        <div key={key} className="preset-btn-wrapper">
                                            <button
                                                className={`preset-btn ${isActive ? 'active' : ''}`}
                                                type="button"
                                                onClick={() => setPreset(key)}
                                                onMouseEnter={(event) => {
                                                    if (description) {
                                                        setHoveredPreset({
                                                            name: presetName,
                                                            desc: description,
                                                            rect: event.currentTarget.getBoundingClientRect()
                                                        });
                                                    }
                                                }}
                                                onMouseLeave={() => setHoveredPreset(null)}
                                                onFocus={(event) => {
                                                    if (description) {
                                                        setHoveredPreset({
                                                            name: presetName,
                                                            desc: description,
                                                            rect: event.currentTarget.getBoundingClientRect()
                                                        });
                                                    }
                                                }}
                                                onBlur={() => setHoveredPreset(null)}
                                                aria-label={presetName}
                                                aria-pressed={isActive}
                                            >
                                                {isActive ? <Check size={13} aria-hidden="true" /> : <Zap size={13} aria-hidden="true" />}
                                                <span>{presetName}</span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    );
                })}
            </div>

            {activePresetName && (
                <div className="preset-active-note" role="status">
                    <Check size={14} aria-hidden="true" />
                    <span>“{activePresetName}” {t.presetAppliedDesc || 'şablonu uygulandı.'}</span>
                </div>
            )}

            {hoveredPreset && (
                <PortalTooltip targetRect={hoveredPreset.rect} isOpen={Boolean(hoveredPreset)}>
                    <div className="tooltip-title">{hoveredPreset.name}</div>
                    <div className="tooltip-explain">{hoveredPreset.desc}</div>
                </PortalTooltip>
            )}
        </section>
    );
}
