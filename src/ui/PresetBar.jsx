import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { getPresets } from '../engine/presetEngine';
import { getDomain } from '../domains';
import { Zap } from 'lucide-react';

export default function PresetBar() {
    const { config, setPreset, activePreset } = useEngineState(useShallow(state => ({
        config: state.config,
        setPreset: state.setPreset,
        activePreset: state.activePreset
    })));
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

    return (
        <section className="card delay-3" style={{ overflow: 'hidden' }}>
            <div className="card-title"><span className="dot"></span> {domainDef?.ui?.[lang]?.presetsTitle || t.presetsTitle || "Uzman Hazır Şablonları (System Presets)"}</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {groupOrder.map(groupKey => {
                    const groupTitle = presetGroupsMap[groupKey] || t.presetGroups?.[groupKey] || groupKey.toUpperCase();
                    return (
                        <div key={groupKey} className="preset-group">
                            <div className="preset-group-title" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                {groupTitle}
                            </div>
                            <div className="presets-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                                {grouped[groupKey].map(key => {
                                    const preset = presets[key];
                                    const presetName = preset?.name?.[lang] || preset?.name?.tr || (typeof preset?.name === 'string' ? preset.name : null) || t.presets?.[key] || key;
                                    const description = preset?.desc?.[lang] || preset?.desc?.tr || (typeof preset?.desc === 'string' ? preset.desc : null) || t.presetDescriptions?.[key];

                                    return (
                                        <div key={key} className="preset-btn-wrapper" style={{ position: 'relative', flexShrink: 0 }}>
                                            <button
                                                className={`preset-btn ${activePreset === key ? 'active' : ''}`}
                                                onClick={() => setPreset(key)}
                                                title={presetName}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    maxWidth: '240px',
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    fontSize: '0.88rem',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <Zap size={13} style={{ flexShrink: 0 }} />
                                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {presetName}
                                                </span>
                                            </button>
                                            {description && (
                                                <div className="module-tooltip" style={{ zIndex: 100 }}>
                                                    <div className="tooltip-title">{presetName}</div>
                                                    <div className="tooltip-explain">{description}</div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {activePreset && presets[activePreset] && (
                <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--accent-1)', fontStyle: 'italic' }}>
                    ⚡ "{presets[activePreset]?.name?.[lang] || presets[activePreset]?.name?.tr}" {t.presetAppliedDesc || 'şablonu uygulandı.'}
                </div>
            )}
        </section>
    );
}
