import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { getDomain } from '../domains';
import { Target, Compass } from 'lucide-react';

export default function TopicInput({ onSubmit, autoFocus = false, isHero = false }) {
    const { config, setConfig } = useEngineState(useShallow(state => ({
        config: state.config,
        setConfig: state.setConfig
    })));
    const t = getTranslation(config.lang, config.domain);
    const domain = getDomain(config.domain);

    const topicLabel = domain.ui?.topicLabel || t.topicLabel;
    const topicPlaceholder = domain.ui?.topicPlaceholder || t.topicPlaceholder;
    const domainLabel = domain.ui?.domainLabel || t.domainLabel;
    const domainPlaceholder = domain.ui?.domainPlaceholder || t.domainPlaceholder;

    const handleTopicKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (onSubmit) {
                onSubmit(e);
            } else {
                const nextInput = document.getElementById('inp-alan');
                if (nextInput && !config.alan) {
                    nextInput.focus();
                }
            }
        }
    };

    return (
        <section className={`card topic-input-card ${isHero ? 'topic-hero-card' : ''}`} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="input-group">
                    <label htmlFor="inp-konu" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                        <Target size={14} className="topic-icon-accent" /> {topicLabel} <span style={{color: 'var(--text-secondary)'}}>*</span>
                    </label>
                    <input 
                        type="text" 
                        id="inp-konu" 
                        placeholder={topicPlaceholder}
                        value={config.konu}
                        onChange={(e) => setConfig('konu', e.target.value)}
                        onKeyDown={handleTopicKeyDown}
                        autoFocus={autoFocus}
                        required
                        aria-required="true"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="inp-alan" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                        <Compass size={14} className="topic-icon-secondary" /> {domainLabel}
                    </label>
                    <input 
                        type="text" 
                        id="inp-alan" 
                        placeholder={domainPlaceholder}
                        value={config.alan}
                        onChange={(e) => setConfig('alan', e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && onSubmit) {
                                onSubmit(e);
                            }
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
