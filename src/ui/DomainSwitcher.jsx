import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { DOMAIN_GROUPS, DOMAIN_ICON_IDS } from '../domains/presentation';
import { getIcon } from './iconRegistry';

export default function DomainSwitcher() {
    const { config, setDomain } = useEngineState(useShallow(state => ({
        config: state.config,
        setDomain: state.setDomain
    })));

    const activeDomain = config.domain || 'learning';
    const lang = config.lang || 'tr';

    return (
        <nav 
            className="header-domain-bar" 
            aria-label="Domain Selector"
            style={{ 
                display: 'flex', 
                gap: '6px', 
                alignItems: 'center', 
                overflowX: 'auto', 
                padding: '2px 0',
                maxWidth: '100%',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}
        >
            {DOMAIN_GROUPS.map(grp => (
                <div 
                    key={grp.id} 
                    style={{ 
                        display: 'flex', 
                        gap: '2px', 
                        padding: '2px 4px', 
                        borderRadius: '8px', 
                        background: grp.bg, 
                        border: `1px solid ${grp.border}`, 
                        alignItems: 'center',
                        flexShrink: 0
                    }}
                >
                    {grp.domains.map(d => {
                        const isActive = activeDomain === d.id;
                        const IconComponent = getIcon(DOMAIN_ICON_IDS[d.id]);
                        return (
                            <button
                                key={d.id}
                                onClick={() => setDomain(d.id)}
                                title={d.label[lang] || d.label.tr}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    padding: '3px 7px',
                                    borderRadius: '5px',
                                    fontSize: '0.7rem',
                                    fontWeight: isActive ? 700 : 500,
                                    color: isActive ? '#ffffff' : 'var(--text-primary)',
                                    background: isActive ? grp.color : 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: isActive ? `0 0 8px ${grp.color}` : 'none',
                                    transition: 'all 0.15s ease',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {IconComponent && <IconComponent size={14} strokeWidth={2} />}
                                <span>{d.label[lang] || d.label.tr}</span>
                            </button>
                        );
                    })}
                </div>
            ))}
        </nav>
    );
}
