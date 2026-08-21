import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { getDomain } from '../domains';
import { OUTPUT_TARGETS } from '../config/outputTargets';
import { GraduationCap, Workflow, Layers, FileText, BrainCircuit, Link, Terminal } from 'lucide-react';
import { getParameterDescription } from '../domains/parameterDescriptions';
import ParameterSelect from './ParameterSelect';
import ParameterHoverMenu from './ParameterHoverMenu';

export default function ConfigPanel() {
    const { config, setConfig } = useEngineState(useShallow(state => ({
        config: state.config,
        setConfig: state.setConfig
    })));
    const t = getTranslation(config.lang, config.domain);
    const domain = getDomain(config.domain);

    const levelIds = domain.levelIds || Object.keys(domain.optionSets?.levels || {}) || [];
    const modeIds = domain.modeIds || Object.keys(domain.optionSets?.modes || {}) || [];
    const depthIds = domain.depthIds || Object.keys(domain.optionSets?.depths || {}) || [];
    const formatIds = domain.formatIds || Object.keys(domain.optionSets?.formats || {}) || [];

    const getOptionLabel = (optionsMap, id) => {
        const val = optionsMap?.[id];
        if (!val) return id;
        if (typeof val === 'string') return val;
        return val[config.lang] || val.tr || val.en || id;
    };

    const getParameterOptions = (field, ids, optionsMap) => ids.map((id) => ({
        id,
        label: getOptionLabel(optionsMap, id),
        description: getParameterDescription(config.domain, config.lang, field, id)
    }));

    const parameterOptions = {
        levels: getParameterOptions('levels', levelIds, domain.optionSets?.levels || t.levels),
        modes: getParameterOptions('modes', modeIds, domain.optionSets?.modes || t.modes),
        depths: getParameterOptions('depths', depthIds, domain.optionSets?.depths || t.depths),
        formats: getParameterOptions('formats', formatIds, domain.optionSets?.formats || t.formats)
    };

    return (
        <aside className="advanced-parameter-panel">
            <div className="card delay-1">
                <div className="card-title"><span className="dot"></span> {domain.ui?.paramsTitle || t.paramsTitle || 'Parametreler'}</div>
                
                <div className="config-form">
                    <div className="input-group">
                        <label htmlFor="sel-seviye" style={{display: 'flex', alignItems: 'center', gap: '6px', position: 'relative'}}>
                            <GraduationCap size={14} /> {domain.ui?.levelLabel || t.levelLabel}
                            <ParameterHoverMenu
                                label={domain.ui?.levelLabel || t.levelLabel}
                                options={parameterOptions.levels}
                            />
                        </label>
                        <ParameterSelect
                            id="sel-seviye"
                            label={domain.ui?.levelLabel || t.levelLabel}
                            value={config.seviye}
                            options={parameterOptions.levels}
                            onChange={(value) => setConfig('seviye', value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="sel-mod" style={{display: 'flex', alignItems: 'center', gap: '6px', position: 'relative'}}>
                            <Workflow size={14} /> {domain.ui?.modeLabel || t.modeLabel}
                            <ParameterHoverMenu
                                label={domain.ui?.modeLabel || t.modeLabel}
                                options={parameterOptions.modes}
                            />
                        </label>
                        <ParameterSelect
                            id="sel-mod"
                            label={domain.ui?.modeLabel || t.modeLabel}
                            value={config.mod}
                            options={parameterOptions.modes}
                            onChange={(value) => setConfig('mod', value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="sel-derinlik" style={{display: 'flex', alignItems: 'center', gap: '6px', position: 'relative'}}>
                            <Layers size={14} /> {domain.ui?.depthLabel || t.depthLabel}
                            <ParameterHoverMenu
                                label={domain.ui?.depthLabel || t.depthLabel}
                                options={parameterOptions.depths}
                                placement=""
                            />
                        </label>
                        <ParameterSelect
                            id="sel-derinlik"
                            label={domain.ui?.depthLabel || t.depthLabel}
                            value={config.derinlik}
                            options={parameterOptions.depths}
                            onChange={(value) => setConfig('derinlik', value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="sel-format" style={{display: 'flex', alignItems: 'center', gap: '6px', position: 'relative'}}>
                            <FileText size={14} /> {domain.ui?.formatLabel || t.formatLabel}
                            <ParameterHoverMenu
                                label={domain.ui?.formatLabel || t.formatLabel}
                                options={parameterOptions.formats}
                                placement=""
                            />
                        </label>
                        <ParameterSelect
                            id="sel-format"
                            label={domain.ui?.formatLabel || t.formatLabel}
                            value={config.format}
                            options={parameterOptions.formats}
                            onChange={(value) => setConfig('format', value)}
                        />
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
                            {OUTPUT_TARGETS.map((id) => (
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
            </div>
        </aside>
    );
}
