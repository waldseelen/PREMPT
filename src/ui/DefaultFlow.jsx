import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, Sparkles, Zap } from 'lucide-react';
import { useEngineState } from '../store/engineState';
import { getTranslation } from '../locales/i18n';
import { getDomain } from '../domains';
import { getPresets } from '../engine/presetEngine';
import { DOMAIN_GROUPS, DOMAIN_ICON_IDS, getDomainPresentation } from '../domains/presentation';
import { getParameterDescription } from '../domains/parameterDescriptions';
import { getIcon } from './iconRegistry';
import ParameterSelect from './ParameterSelect';
import TopicInput from './TopicInput';
import ActionBar from './ActionBar';
import PreviewPanel from './PreviewPanel';

const PARAMETER_COPY = {
    levels: { tr: 'Ne kadar biliyorsun?', en: 'How familiar are you?' },
    modes: { tr: 'Nasıl yaklaşalım?', en: 'How should we approach it?' },
    depths: { tr: 'Ne kadar ayrıntılı olsun?', en: 'How detailed should it be?' },
    formats: { tr: 'Yanıt nasıl görünsün?', en: 'How should the answer look?' }
};

const PARAMETER_FIELDS = [
    { key: 'levels', configKey: 'seviye', idsKey: 'levelIds' },
    { key: 'modes', configKey: 'mod', idsKey: 'modeIds' },
    { key: 'depths', configKey: 'derinlik', idsKey: 'depthIds' },
    { key: 'formats', configKey: 'format', idsKey: 'formatIds' }
];

function getLocalized(value, lang, fallback = '') {
    if (!value) return fallback;
    if (typeof value === 'string') return value;
    return value[lang] || value.tr || value.en || fallback;
}

export default function DefaultFlow({ onAdvanced, showToast }) {
    const [step, setStep] = useState(0);
    const [showAllPresets, setShowAllPresets] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [focusedDomain, setFocusedDomain] = useState(null);
    const [showAllDomains, setShowAllDomains] = useState(false);
    const [topicError, setTopicError] = useState('');

    const {
        config,
        activePreset,
        setDomain,
        setPreset,
        setConfig
    } = useEngineState(useShallow((state) => ({
        config: state.config,
        activePreset: state.activePreset,
        setDomain: state.setDomain,
        setPreset: state.setPreset,
        setConfig: state.setConfig
    })));

    const t = getTranslation(config.lang, config.domain);
    const flow = t.flow;
    const domain = getDomain(config.domain);
    const lang = config.lang || 'tr';
    const presets = getPresets(config.domain);
    const presetEntries = useMemo(() => Object.entries(presets), [presets]);
    const recommendedPresets = presetEntries.slice(0, 4);
    const visiblePresets = showAllPresets ? presetEntries : recommendedPresets;
    const currentDomainPresentation = getDomainPresentation(config.domain);
    const domainGroups = useMemo(() => {
        if (showAllDomains) return DOMAIN_GROUPS;
        return DOMAIN_GROUPS
            .map((group) => ({ ...group, domains: group.domains.filter((domainEntry) => domainEntry.featured) }))
            .filter((group) => group.domains.length > 0);
    }, [showAllDomains]);

    const parameterOptions = PARAMETER_FIELDS.map(({ key, idsKey }) => {
        const ids = domain[idsKey] || Object.keys(domain.optionSets?.[key] || {});
        const optionsMap = domain.optionSets?.[key] || t[key] || {};
        return {
            key,
            ids,
            options: ids.map((id) => ({
                id,
                label: getLocalized(optionsMap[id], lang, id),
                description: getParameterDescription(config.domain, lang, key, id)
            }))
        };
    });

    const chooseDomain = (domainId) => {
        if (domainId !== config.domain) setDomain(domainId);
        setFocusedDomain(domainId);
        setStep(1);
    };

    const choosePreset = (presetId) => {
        setPreset(presetId);
        setStep(2);
    };

    const continueFromTopic = () => {
        if (!config.konu.trim()) {
            setTopicError(t.toastNeedTopic || 'Lütfen bir konu girin.');
            document.getElementById('inp-konu')?.focus();
            return;
        }
        setTopicError('');
        setStep(3);
    };

    const continueFromParameters = () => {
        setStep(4);
    };

    const handleAdvanced = () => {
        onAdvanced();
    };

    const goBack = () => {
        setTopicError('');
        setStep((current) => Math.max(0, current - 1));
    };

    const renderDomainStep = () => (
        <section className="default-flow-surface default-domain-step" aria-labelledby="default-domain-title">
            <div className="default-flow-kicker"><Sparkles size={14} /> {flow.modeDefault}</div>
            <h2 id="default-domain-title">{flow.chooseDomainTitle}</h2>
            <p className="default-flow-lead">{flow.chooseDomainDesc}</p>
            <div className="default-domain-mode-row">
                <span className="default-domain-mode-label">{showAllDomains ? flow.showAllDomains : flow.recommendedDomains}</span>
                <button type="button" className="default-inline-action" onClick={() => setShowAllDomains((value) => !value)}>
                    {showAllDomains ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    {showAllDomains ? flow.showFeaturedDomains : flow.showAllDomains}
                </button>
            </div>
            <div className={`default-domain-grid ${showAllDomains ? 'is-expanded' : 'is-featured'}`}>
                {domainGroups.map((group) => (
                    <section key={group.id} className="default-domain-group" style={{ '--group-color': group.color, '--group-bg': group.bg, '--group-border': group.border }}>
                        <div className="default-domain-group-heading">
                            <span className="default-domain-group-line" />
                            <span>{getLocalized(group.name, lang)}</span>
                        </div>
                        <div className="default-domain-cards">
                            {group.domains.map((domainEntry) => {
                                const Icon = getIcon(DOMAIN_ICON_IDS[domainEntry.id]);
                                const isFocused = focusedDomain === domainEntry.id;
                                return (
                                    <button
                                        key={domainEntry.id}
                                        type="button"
                                        className={`default-domain-card ${isFocused ? 'is-focused' : ''}`}
                                        onClick={() => chooseDomain(domainEntry.id)}
                                        onMouseEnter={() => setFocusedDomain(domainEntry.id)}
                                        onFocus={() => setFocusedDomain(domainEntry.id)}
                                        style={{ '--group-color': group.color, '--group-bg': group.bg, '--group-border': group.border }}
                                        aria-describedby={`domain-description-${domainEntry.id}`}
                                        aria-current={config.domain === domainEntry.id ? 'true' : undefined}
                                    >
                                        <span className="default-domain-icon"><Icon size={22} strokeWidth={1.6} /></span>
                                        <span className="default-domain-card-copy">
                                            <strong>{getLocalized(domainEntry.label, lang)}</strong>
                                            <span>{getLocalized(domainEntry.description, lang)}</span>
                                        </span>
                                        <ArrowRight className="default-domain-arrow" size={16} />
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
            {focusedDomain && (
                <div className="default-domain-detail" id={`domain-description-${focusedDomain}`} aria-live="polite">
                    <div className="default-domain-detail-title">
                        {getLocalized(getDomainPresentation(focusedDomain)?.label, lang)}
                    </div>
                    <div>{getLocalized(getDomainPresentation(focusedDomain)?.description, lang)}</div>
                    <small>{getLocalized(getDomainPresentation(focusedDomain)?.example, lang)}</small>
                </div>
            )}
        </section>
    );

    const renderPresetStep = () => (
        <section className="default-flow-surface" aria-labelledby="default-preset-title">
            <div className="default-flow-kicker"><Zap size={14} /> {currentDomainPresentation ? getLocalized(currentDomainPresentation.label, lang) : domain.id}</div>
            <h2 id="default-preset-title">{flow.recommendedPresetsTitle}</h2>
            <p className="default-flow-lead">{flow.recommendedPresetsDesc}</p>
            <div className="default-preset-grid">
                {visiblePresets.map(([key, preset]) => {
                    const name = getLocalized(preset.name, lang, key);
                    const description = getLocalized(preset.desc, lang, '');
                    return (
                        <button
                            key={key}
                            type="button"
                            className={`default-preset-card ${activePreset === key ? 'is-selected' : ''}`}
                            onClick={() => choosePreset(key)}
                        >
                            <span className="default-preset-icon"><Zap size={16} /></span>
                            <span className="default-preset-copy">
                                <strong>{name}</strong>
                                <span>{description}</span>
                            </span>
                            {activePreset === key && <Check className="default-preset-check" size={18} />}
                        </button>
                    );
                })}
            </div>
            {presetEntries.length > recommendedPresets.length && (
                <button type="button" className="default-inline-action" onClick={() => setShowAllPresets((value) => !value)}>
                    {showAllPresets ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    {showAllPresets ? flow.hidePresets : flow.showAllPresets}
                </button>
            )}
            <p className="default-flow-note">{flow.presetHint}</p>
        </section>
    );

    const renderTopicStep = () => (
        <section className="default-flow-surface" aria-labelledby="default-topic-title">
            <div className="default-flow-kicker"><Sparkles size={14} /> {getLocalized(currentDomainPresentation?.label, lang)}</div>
            <h2 id="default-topic-title">{flow.topicTitle}</h2>
            <p className="default-flow-lead">{flow.topicDesc}</p>
            <TopicInput />
            {topicError && <p className="default-flow-error" role="alert">{topicError}</p>}
        </section>
    );

    const renderParameterStep = () => (
        <section className="default-flow-surface" aria-labelledby="default-parameter-title">
            <div className="default-flow-kicker"><Sparkles size={14} /> {getLocalized(currentDomainPresentation?.label, lang)}</div>
            <h2 id="default-parameter-title">{flow.parametersTitle}</h2>
            <p className="default-flow-lead">{flow.parametersDesc}</p>
            <div className="default-flow-parameter-grid">
                {parameterOptions.map(({ key, options }) => {
                    const field = PARAMETER_FIELDS.find((entry) => entry.key === key);
                    const label = PARAMETER_COPY[key]?.[lang] || key;
                    return (
                        <div className="default-flow-parameter" key={key}>
                            <label htmlFor={`default-${field.configKey}`}>{label}</label>
                            <ParameterSelect
                                id={`default-${field.configKey}`}
                                label={label}
                                value={config[field.configKey]}
                                options={options}
                                onChange={(value) => setConfig(field.configKey, value)}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );

    const renderOutputStep = () => (
        <section className="default-flow-surface default-output-step" aria-labelledby="default-output-title">
            <div className="default-flow-kicker"><Check size={14} /> {getLocalized(currentDomainPresentation?.label, lang)}</div>
            <h2 id="default-output-title">{flow.outputTitle}</h2>
            <p className="default-flow-lead">{flow.outputDesc}</p>
            <div className="default-output-summary">
                <span>{getLocalized(currentDomainPresentation?.label, lang)}</span>
                {activePreset && <span>{getLocalized(presets[activePreset]?.name, lang, activePreset)}</span>}
                {config.konu && <span>{config.konu}</span>}
            </div>
            <div className="default-output-grid">
                <div className="default-output-actions">
                    <ActionBar showToast={showToast} />
                </div>
                <div className="default-output-preview">
                    <button type="button" className="default-preview-toggle" onClick={() => setPreviewOpen((value) => !value)} aria-expanded={previewOpen}>
                        {previewOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {previewOpen ? flow.hidePreview : flow.showPreview}
                    </button>
                    {previewOpen && <PreviewPanel />}
                </div>
            </div>
        </section>
    );

    const steps = [renderDomainStep, renderPresetStep, renderTopicStep, renderParameterStep, renderOutputStep];

    return (
        <main className="default-flow" aria-label={flow.modeDefault}>
            <header className="default-flow-header">
                <div className="default-flow-brand">
                    <div className="default-flow-brand-mark"><Sparkles size={18} /></div>
                    <div>
                        <p className="default-flow-brand-title">{flow.modeDefault}</p>
                    </div>
                </div>
                <div className="default-flow-mode-actions">
                    <button type="button" className="default-mode-pill is-active" aria-current="page">{flow.modeDefault}</button>
                    <button type="button" className="default-mode-pill" onClick={handleAdvanced}>{flow.modeAdvanced}</button>
                </div>
            </header>

            <nav className="default-flow-progress" aria-label={lang === 'en' ? 'Progress' : 'İlerleme'}>
                {flow.steps.map((label, index) => (
                    <button
                        key={label}
                        type="button"
                        className={`default-flow-step ${index === step ? 'is-current' : ''} ${index < step ? 'is-complete' : ''}`}
                        onClick={() => index <= step && setStep(index)}
                        disabled={index > step}
                        aria-current={index === step ? 'step' : undefined}
                    >
                        <span className="default-flow-step-number">{index < step ? <Check size={12} /> : index + 1}</span>
                        <span>{label}</span>
                    </button>
                ))}
            </nav>

            <div className="default-flow-content" key={step}>
                {steps[step]()}
            </div>

            <footer className="default-flow-footer">
                <button type="button" className="btn btn-secondary" onClick={goBack} disabled={step === 0}>
                    <ArrowLeft size={16} /> {flow.back}
                </button>
                <div className="default-flow-footer-spacer" />
                {step === 0 && <button type="button" className="btn btn-secondary" onClick={handleAdvanced}>{flow.startAdvanced}</button>}
                {step === 1 && <button type="button" className="btn btn-secondary" onClick={handleAdvanced}>{flow.startAdvanced}</button>}
                {step === 2 && <button type="button" className="btn btn-primary" onClick={continueFromTopic}>{flow.continue} <ArrowRight size={16} /></button>}
                {step === 3 && <button type="button" className="btn btn-primary" onClick={continueFromParameters}>{flow.continue} <ArrowRight size={16} /></button>}
                {step === 4 && <button type="button" className="btn btn-secondary" onClick={handleAdvanced}>{flow.startAdvanced}</button>}
            </footer>
        </main>
    );
}
