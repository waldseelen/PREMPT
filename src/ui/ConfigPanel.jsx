import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { getDomain } from '../domains';
import { GraduationCap, Workflow, Layers, FileText, BrainCircuit, Link, Terminal } from 'lucide-react';

// Global, domain-agnostic target-syntax ids (Tier B formatters). Kept as a
// local literal rather than importing from src/compiler/ — ui/ must not
// reach into compiler/ per the project's layering rules. Mirrors the
// FORMATTERS keys in finalPromptAssembler.js and VALID_TARGETS in
// statePayload.js; update all three together if a target is added/removed.
const TARGET_IDS = ['markdown', 'claude-xml', 'openai-json'];

export default function ConfigPanel() {
    const { config, setConfig } = useEngineState(useShallow(state => ({
        config: state.config,
        setConfig: state.setConfig
    })));
    const t = getTranslation(config.lang, config.domain);
    const domain = getDomain(config.domain);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <section className="card" style={{ marginBottom: 0, height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="card-title" style={{ marginBottom: 0 }}><span className="dot"></span> {t.paramsTitle || 'Parametreler'}</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                    <div className="input-group">
                        <label htmlFor="sel-seviye" style={{display: 'flex', alignItems: 'center', gap: '6px', position: 'relative'}}>
                            <GraduationCap size={14} /> {t.levelLabel}
                            <div className="config-tooltip tooltip-down">
                                <ul className="tooltip-list">
                                    {Object.entries(t.levelDescs || {}).map(([key, text]) => {
                                        const [title, ...rest] = text.split(':');
                                        return (
                                            <li key={key}>
                                                <strong>{title}:</strong>{rest.join(':')}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </label>
                        <select id="sel-seviye" value={config.seviye} onChange={(e) => setConfig('seviye', e.target.value)}>
                            {domain.levelIds.map((id) => (
                                <option key={id} value={id}>{t.levels?.[id]}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="sel-mod" style={{display: 'flex', alignItems: 'center', gap: '6px', position: 'relative'}}>
                            <Workflow size={14} /> {t.modeLabel}
                            <div className="config-tooltip tooltip-down">
                                <ul className="tooltip-list">
                                    {Object.entries(t.modeDescs || {}).map(([key, text]) => {
                                        const [title, ...rest] = text.split(':');
                                        return (
                                            <li key={key}>
                                                <strong>{title}:</strong>{rest.join(':')}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </label>
                        <select id="sel-mod" value={config.mod} onChange={(e) => setConfig('mod', e.target.value)}>
                            {domain.modeIds.map((id) => (
                                <option key={id} value={id}>{t.modes?.[id]}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="sel-derinlik" style={{display: 'flex', alignItems: 'center', gap: '6px', position: 'relative'}}>
                            <Layers size={14} /> {t.depthLabel}
                            <div className="config-tooltip">
                                <ul className="tooltip-list">
                                    {Object.entries(t.depthDescs || {}).map(([key, text]) => {
                                        const [title, ...rest] = text.split(':');
                                        return (
                                            <li key={key}>
                                                <strong>{title}:</strong>{rest.join(':')}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </label>
                        <select id="sel-derinlik" value={config.derinlik} onChange={(e) => setConfig('derinlik', e.target.value)}>
                            {domain.depthIds.map((id) => (
                                <option key={id} value={id}>{t.depths?.[id]}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="sel-format" style={{display: 'flex', alignItems: 'center', gap: '6px', position: 'relative'}}>
                            <FileText size={14} /> {t.formatLabel}
                            <div className="config-tooltip">
                                <ul className="tooltip-list">
                                    {Object.entries(t.formatDescs || {}).map(([key, text]) => {
                                        const [title, ...rest] = text.split(':');
                                        return (
                                            <li key={key}>
                                                <strong>{title}:</strong>{rest.join(':')}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </label>
                        <select id="sel-format" value={config.format} onChange={(e) => setConfig('format', e.target.value)}>
                            {domain.formatIds.map((id) => (
                                <option key={id} value={id}>{t.formats?.[id]}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="sel-hedef" style={{display: 'flex', alignItems: 'center', gap: '6px', position: 'relative'}}>
                            <Terminal size={14} /> {t.targetLabel}
                            <div className="config-tooltip">
                                <ul className="tooltip-list">
                                    {Object.entries(t.targetDescs || {}).map(([key, text]) => {
                                        const [title, ...rest] = text.split(':');
                                        return (
                                            <li key={key}>
                                                <strong>{title}:</strong>{rest.join(':')}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </label>
                        <select id="sel-hedef" value={config.hedef} onChange={(e) => setConfig('hedef', e.target.value)}>
                            {TARGET_IDS.map((id) => (
                                <option key={id} value={id}>{t.targets?.[id]}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    <div className="toggle-row">
                        <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <label className="toggle-switch">
                                <input type="checkbox" id="chk-monolog" checked={config.monolog} onChange={(e) => setConfig('monolog', e.target.checked)} />
                                <span className="slider"></span>
                            </label>
                            <label htmlFor="chk-monolog" style={{ margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <BrainCircuit size={14} /> {t.monologLabel}
                            </label>
                        </div>
                        <div className="config-tooltip">
                            {t.monologDesc}
                        </div>
                    </div>
                    <div className="toggle-row">
                        <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <label className="toggle-switch">
                                <input type="checkbox" id="chk-autoresolve" checked={config.autoResolveDeps} onChange={(e) => setConfig('autoResolveDeps', e.target.checked)} />
                                <span className="slider"></span>
                            </label>
                            <label htmlFor="chk-autoresolve" style={{ margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Link size={14} /> {t.autoResolveLabel}
                            </label>
                        </div>
                        <div className="config-tooltip">
                            {t.autoResolveDesc}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
