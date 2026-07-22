import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { getPresets } from '../engine/presetEngine';
import {
    Zap, FlaskConical, FileCheck, Wrench, Layers, BookOpen, Box, Terminal, Bug, Sparkles,
    Rocket, Search, Blocks, Compass, ShieldCheck, FileText, ShieldAlert,
    Scale, Mic, TestTube, Gauge, RefreshCw
} from 'lucide-react';

const presetIcons = {
    // Learning domain
    hizli: Zap,
    derin: FlaskConical,
    sinav: FileCheck,
    muhendis: Wrench,
    tam: Layers,
    arastirmaci: BookOpen,
    temeller: Box,
    pratik: Terminal,
    hata: Bug,
    yaratici: Sparkles,
    karsilastir: Scale,
    mulakat: Mic,
    // Code domain
    'ship-feature': Rocket,
    'code-review': Search,
    debug: Bug,
    refactor: Wrench,
    'system-design': Blocks,
    onboard: Compass,
    harden: ShieldCheck,
    document: FileText,
    'security-review': ShieldAlert,
    'test-strategy': TestTube,
    'perf-tune': Gauge,
    modernize: RefreshCw
};

export default function PresetBar() {
    const { config, setPreset, activePreset } = useEngineState(useShallow(state => ({
        config: state.config,
        setPreset: state.setPreset,
        activePreset: state.activePreset
    })));
    const t = getTranslation(config.lang, config.domain);
    const presets = getPresets(config.domain);

    // Cluster presets by their structural `group` field so the row doesn't
    // degrade into a flat wall of buttons as more presets are added. Order
    // of first appearance in `presets` determines group display order.
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

    return (
        <section className="card delay-3">
            <div className="card-title"><span className="dot"></span> {t.presetsTitle || "Uzman Modları (System Presets)"}</div>
            {groupOrder.map(groupKey => (
                <div key={groupKey} className="preset-group">
                    <div className="preset-group-title">{t.presetGroups?.[groupKey] || groupKey}</div>
                    <div className="presets-row">
                        {grouped[groupKey].map(key => {
                            const Icon = presetIcons[key] || Box;
                            const description = t.presetDescriptions?.[key];
                            return (
                                <div key={key} className="preset-btn-wrapper" style={{ position: 'relative' }}>
                                    <button
                                        className={`preset-btn ${activePreset === key ? 'active' : ''}`}
                                        onClick={() => setPreset(key)}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%' }}
                                    >
                                        <Icon size={14} />
                                        {t.presets?.[key] || key}
                                    </button>
                                    {description && (
                                        <div className="module-tooltip">
                                            <div className="tooltip-title">{t.presets?.[key] || key}</div>
                                            <div className="tooltip-explain">{description}</div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            {activePreset && (
                <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--accent-1)', fontStyle: 'italic' }}>
                    {t.systemIntelligence} "{t.presets?.[activePreset]}" {t.presetAppliedDesc}
                </div>
            )}
        </section>
    );
}
