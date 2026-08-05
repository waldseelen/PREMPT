import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import {
    GraduationCap, Brain, Zap, Beaker, Building2, Backpack,
    Code, Bot, Shield, FileText, Palette, Globe,
    Briefcase, Heart, Plane
} from 'lucide-react';

const ICON_MAP = {
    learning: GraduationCap,
    decision: Brain,
    problemsolving: Zap,
    academic: Beaker,
    philosophy: Building2,
    edudesign: Backpack,
    code: Code,
    agentarch: Bot,
    cyber: Shield,
    blog: FileText,
    image: Palette,
    language: Globe,
    business: Briefcase,
    wellness: Heart,
    travel: Plane
};

const GROUPS = [
    {
        id: 'mind',
        name: { tr: 'Düşünce & Mantık', en: 'Mind & Logic' },
        color: '#6366f1',
        bg: 'rgba(99, 102, 241, 0.12)',
        border: 'rgba(99, 102, 241, 0.28)',
        domains: [
            { id: 'learning', label: { tr: 'Öğrenme', en: 'Learn' } },
            { id: 'decision', label: { tr: 'Karar', en: 'Decision' } },
            { id: 'problemsolving', label: { tr: 'Problem Çözme', en: 'Problem' } }
        ]
    },
    {
        id: 'academia',
        name: { tr: 'Akademi & Felsefe', en: 'Academia & Philosophy' },
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.12)',
        border: 'rgba(16, 185, 129, 0.28)',
        domains: [
            { id: 'academic', label: { tr: 'Akademik', en: 'Academic' } },
            { id: 'philosophy', label: { tr: 'Felsefe', en: 'Philosophy' } },
            { id: 'edudesign', label: { tr: 'Eğitim Tasarımı', en: 'Edu Design' } }
        ]
    },
    {
        id: 'tech',
        name: { tr: 'Mühendislik & AI', en: 'Engineering & AI' },
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.12)',
        border: 'rgba(245, 158, 11, 0.28)',
        domains: [
            { id: 'code', label: { tr: 'Kod', en: 'Code' } },
            { id: 'agentarch', label: { tr: 'Agent Mimari', en: 'Agent Arch' } },
            { id: 'cyber', label: { tr: 'Siber', en: 'Cyber' } }
        ]
    },
    {
        id: 'creation',
        name: { tr: 'İçerik, Sanat & Dil', en: 'Content, Art & Language' },
        color: '#ec4899',
        bg: 'rgba(236, 72, 153, 0.12)',
        border: 'rgba(236, 72, 153, 0.28)',
        domains: [
            { id: 'blog', label: { tr: 'Blog', en: 'Blog' } },
            { id: 'image', label: { tr: 'Görsel', en: 'Image' } },
            { id: 'language', label: { tr: 'Dil', en: 'Language' } }
        ]
    },
    {
        id: 'life',
        name: { tr: 'İş & Yaşam Ops', en: 'Business & Life Ops' },
        color: '#06b6d4',
        bg: 'rgba(6, 182, 212, 0.12)',
        border: 'rgba(6, 182, 212, 0.28)',
        domains: [
            { id: 'business', label: { tr: 'İş', en: 'Business' } },
            { id: 'wellness', label: { tr: 'Sağlık', en: 'Wellness' } },
            { id: 'travel', label: { tr: 'Seyahat', en: 'Travel' } }
        ]
    }
];

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
            {GROUPS.map(grp => (
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
                        const IconComponent = ICON_MAP[d.id];
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
