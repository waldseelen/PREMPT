import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { getPresets } from '../engine/presetEngine';
import {
    Zap, FlaskConical, FileCheck, Wrench, Layers, BookOpen, Box, Terminal, Bug, Sparkles,
    Rocket, Search, Blocks, Compass, ShieldCheck, FileText
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
    // Code domain
    'ship-feature': Rocket,
    'code-review': Search,
    debug: Bug,
    refactor: Wrench,
    'system-design': Blocks,
    onboard: Compass,
    harden: ShieldCheck,
    document: FileText
};

export default function PresetBar() {
    const { config, setPreset, activePreset } = useEngineState(useShallow(state => ({
        config: state.config,
        setPreset: state.setPreset,
        activePreset: state.activePreset
    })));
    const t = getTranslation(config.lang, config.domain);
    const presets = getPresets(config.domain);

    return (
        <section className="card delay-3">
            <div className="card-title"><span className="dot"></span> {t.presetsTitle || "Uzman Modları (System Presets)"}</div>
            <div className="presets-row">
                {Object.keys(presets).map(key => {
                    const Icon = presetIcons[key] || Box;
                    return (
                        <button
                            key={key}
                            className={`preset-btn ${activePreset === key ? 'active' : ''}`}
                            onClick={() => setPreset(key)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                        >
                            <Icon size={14} />
                            {t.presets?.[key] || key}
                        </button>
                    );
                })}
            </div>

            {activePreset && (
                <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--accent-1)', fontStyle: 'italic' }}>
                    {t.systemIntelligence} "{t.presets?.[activePreset]}" {t.presetAppliedDesc}
                </div>
            )}
        </section>
    );
}
