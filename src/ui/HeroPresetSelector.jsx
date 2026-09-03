import { useState, useRef, useEffect, useMemo } from 'react';
import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getPresets } from '../engine/presetEngine';
import { getDomain } from '../domains';
import { getTranslation } from '../locales/i18n';
import { Zap, Check, ChevronDown, Sparkles } from 'lucide-react';

export default function HeroPresetSelector() {
    const { config, activePreset, setPreset } = useEngineState(useShallow((state) => ({
        config: state.config,
        activePreset: state.activePreset,
        setPreset: state.setPreset
    })));

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const triggerRef = useRef(null);

    const t = getTranslation(config.lang, config.domain);
    const domainDef = getDomain(config.domain);
    const lang = config.lang || 'tr';
    const presets = getPresets(config.domain);

    const allEntries = useMemo(() => Object.entries(presets), [presets]);
    const heroEntries = useMemo(() => allEntries.slice(0, 3), [allEntries]);
    const remainingEntries = useMemo(() => allEntries.slice(3), [allEntries]);

    // Group remaining presets by preset.group
    const remainingGrouped = useMemo(() => {
        const groups = {};
        remainingEntries.forEach(([key, preset]) => {
            const groupKey = preset.group || 'other';
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push([key, preset]);
        });
        return groups;
    }, [remainingEntries]);

    const presetGroupsMap = domainDef?.ui?.[lang]?.presetGroups || domainDef?.ui?.tr?.presetGroups || t.presetGroups || {};

    // Check if active preset is in remaining presets
    const activeInRemaining = useMemo(() => {
        return remainingEntries.find(([key]) => key === activePreset);
    }, [remainingEntries, activePreset]);

    // Close menu on outside click or touch
    useEffect(() => {
        if (!isMenuOpen) return;
        const handleOutsidePointer = (event) => {
            if (!menuRef.current?.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('pointerdown', handleOutsidePointer);
        return () => document.removeEventListener('pointerdown', handleOutsidePointer);
    }, [isMenuOpen]);

    const handleSelectPreset = (presetId) => {
        setPreset(presetId);
        setIsMenuOpen(false);
    };

    const getPresetName = (preset, key) => {
        return preset?.name?.[lang] || preset?.name?.tr || (typeof preset?.name === 'string' ? preset.name : null) || t.presets?.[key] || key;
    };

    const getPresetDesc = (preset, key) => {
        return preset?.desc?.[lang] || preset?.desc?.tr || (typeof preset?.desc === 'string' ? preset.desc : null) || t.presetDescriptions?.[key] || '';
    };

    return (
        <section className="hero-preset-selector" aria-label={t.heroPresetsTitle || 'Öne Çıkan Şablonlar'}>
            <div className="hero-preset-grid">
                {heroEntries.map(([key, preset]) => {
                    const isActive = activePreset === key;
                    const name = getPresetName(preset, key);
                    const desc = getPresetDesc(preset, key);

                    return (
                        <button
                            key={key}
                            type="button"
                            className={`hero-preset-card ${isActive ? 'is-active' : ''}`}
                            onClick={() => handleSelectPreset(key)}
                            aria-pressed={isActive}
                        >
                            <div className="hero-preset-card-header">
                                <div className="hero-preset-icon-wrap">
                                    {isActive ? (
                                        <Check size={14} className="hero-preset-icon active-icon" aria-hidden="true" />
                                    ) : (
                                        <Zap size={14} className="hero-preset-icon" aria-hidden="true" />
                                    )}
                                </div>
                                <span className="hero-preset-title">{name}</span>
                            </div>
                            {desc && <p className="hero-preset-desc">{desc}</p>}
                        </button>
                    );
                })}

                {/* Dropdown / Popover for remaining presets */}
                <div ref={menuRef} className={`hero-more-presets-wrapper ${isMenuOpen ? 'is-open' : ''}`}>
                    <button
                        ref={triggerRef}
                        type="button"
                        className={`hero-more-presets-btn ${activeInRemaining ? 'has-active' : ''} ${isMenuOpen ? 'is-expanded' : ''}`}
                        aria-haspopup="true"
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                setIsMenuOpen(false);
                            }
                        }}
                    >
                        <Sparkles size={13} className="hero-more-icon" aria-hidden="true" />
                        <span className="hero-more-label">
                            {activeInRemaining
                                ? `${getPresetName(activeInRemaining[1], activeInRemaining[0])}`
                                : `${t.morePresetsBtn || 'Diğer Şablonlar'} (${remainingEntries.length})`}
                        </span>
                        <ChevronDown size={13} className="hero-more-chevron" aria-hidden="true" />
                    </button>

                    {isMenuOpen && (
                        <div
                            className="hero-more-presets-popover"
                            role="menu"
                            aria-label={t.morePresetsTitle || 'Tüm Şablonlar'}
                        >
                            <div className="hero-popover-header">
                                <span className="hero-popover-title">{t.morePresetsTitle || 'Tüm Şablonlar'}</span>
                            </div>
                            <div className="hero-popover-groups">
                                {Object.entries(remainingGrouped).map(([groupKey, groupPresets]) => {
                                    const groupTitle = presetGroupsMap[groupKey] || t.presetGroups?.[groupKey] || groupKey.toUpperCase();
                                    return (
                                        <div key={groupKey} className="hero-popover-group">
                                            <div className="hero-group-title">{groupTitle}</div>
                                            <div className="hero-group-options">
                                                {groupPresets.map(([key, preset]) => {
                                                    const isActive = activePreset === key;
                                                    const name = getPresetName(preset, key);
                                                    const desc = getPresetDesc(preset, key);

                                                    return (
                                                        <button
                                                            key={key}
                                                            type="button"
                                                            role="menuitem"
                                                            className={`hero-popover-option ${isActive ? 'is-active' : ''}`}
                                                            onClick={() => handleSelectPreset(key)}
                                                        >
                                                            <div className="hero-option-header">
                                                                <span className="hero-option-name">{name}</span>
                                                                {isActive && <Check size={13} className="hero-option-check" aria-hidden="true" />}
                                                            </div>
                                                            {desc && <span className="hero-option-desc">{desc}</span>}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
