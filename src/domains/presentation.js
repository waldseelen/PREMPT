// Cross-domain presentation metadata. Domain behavior and prompt content stay in
// the domain specs; this catalog owns only shared navigation and visual chrome.

export const DOMAIN_GROUPS = [
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

export const DOMAIN_ICON_IDS = {
    learning: 'graduation-cap',
    decision: 'brain',
    problemsolving: 'zap',
    academic: 'beaker',
    philosophy: 'building-2',
    edudesign: 'backpack',
    code: 'code',
    agentarch: 'bot',
    cyber: 'shield',
    blog: 'file-text',
    image: 'palette',
    language: 'globe',
    business: 'briefcase',
    wellness: 'heart',
    travel: 'plane'
};

export function getDomainGroup(domainId) {
    return DOMAIN_GROUPS.find((group) => group.domains.some((domain) => domain.id === domainId));
}
