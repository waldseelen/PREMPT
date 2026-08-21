// Shared domain navigation and visual presentation metadata.
// Domain-specific behavior remains in src/domains/specs/.

export const DOMAIN_GROUPS = [
    {
        id: 'mind',
        name: { tr: 'Düşünce & Mantık', en: 'Mind & Logic' },
        color: '#6366f1',
        bg: 'rgba(99, 102, 241, 0.12)',
        border: 'rgba(99, 102, 241, 0.28)',
        domains: [
            {
                id: 'learning',
                label: { tr: 'Öğrenme', en: 'Learn' },
                description: { tr: 'Bir konuyu anlaşılır, sistematik ve kalıcı biçimde öğren.', en: 'Learn any topic clearly, systematically, and deeply.' },
                example: { tr: 'Bir kavramı parçala, açıkla ve pekiştir.', en: 'Break down, explain, and reinforce a concept.' }
            },
            {
                id: 'decision',
                label: { tr: 'Karar', en: 'Decision' },
                description: { tr: 'Belirsiz seçenekleri ölçütlere ayır ve daha sağlam karar ver.', en: 'Turn uncertain choices into structured, defensible decisions.' },
                example: { tr: 'Seçenekleri karşılaştır, riskleri tart ve seçimini gerekçelendir.', en: 'Compare options, weigh risks, and justify a choice.' }
            },
            {
                id: 'problemsolving',
                label: { tr: 'Problem Çözme', en: 'Problem' },
                description: { tr: 'Karmaşık bir sorunu kök nedenlerine indir ve çözüm üret.', en: 'Reduce complex problems to root causes and actionable solutions.' },
                example: { tr: 'Tıkanıklığı bul, alternatifler üret ve test planı kur.', en: 'Find the bottleneck, generate alternatives, and build a test plan.' }
            }
        ]
    },
    {
        id: 'academia',
        name: { tr: 'Akademi & Felsefe', en: 'Academia & Philosophy' },
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.12)',
        border: 'rgba(16, 185, 129, 0.28)',
        domains: [
            {
                id: 'academic',
                label: { tr: 'Akademik', en: 'Academic' },
                description: { tr: 'Araştırma sorularını kanıt, kaynak ve yöntem disipliniyle çalış.', en: 'Work through research questions with evidence, sources, and method.' },
                example: { tr: 'Literatürü tara, argümanları karşılaştır ve araştırma çerçevesi kur.', en: 'Scan literature, compare arguments, and build a research frame.' }
            },
            {
                id: 'philosophy',
                label: { tr: 'Felsefe', en: 'Philosophy' },
                description: { tr: 'Kavramları, varsayımları ve etik sonuçları dikkatle sorgula.', en: 'Examine concepts, assumptions, and ethical consequences carefully.' },
                example: { tr: 'Bir fikri farklı felsefi merceklerden değerlendir.', en: 'Evaluate an idea through multiple philosophical lenses.' }
            },
            {
                id: 'edudesign',
                label: { tr: 'Eğitim Tasarımı', en: 'Edu Design' },
                description: { tr: 'Öğrenme hedeflerini ölçülebilir ders ve değerlendirmelere dönüştür.', en: 'Turn learning goals into measurable lessons and assessments.' },
                example: { tr: 'Ders akışı, etkinlik ve değerlendirme planı tasarla.', en: 'Design a lesson flow, activities, and an assessment plan.' }
            }
        ]
    },
    {
        id: 'tech',
        name: { tr: 'Mühendislik & AI', en: 'Engineering & AI' },
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.12)',
        border: 'rgba(245, 158, 11, 0.28)',
        domains: [
            {
                id: 'code',
                label: { tr: 'Kod', en: 'Code' },
                description: { tr: 'Kod tasarla, incele, düzelt ve üretim kalitesine taşı.', en: 'Design, review, debug, and ship production-quality code.' },
                example: { tr: 'Mimari karar, refaktör, test veya hata ayıklama yap.', en: 'Handle architecture, refactoring, testing, or debugging.' }
            },
            {
                id: 'agentarch',
                label: { tr: 'Agent Mimari', en: 'Agent Arch' },
                description: { tr: 'AI agent ve system prompt yapılarını güvenilir biçimde tasarla.', en: 'Design reliable AI agents and system-prompt architectures.' },
                example: { tr: 'Rol, araç, bellek, güvenlik ve çalışma döngüsü kur.', en: 'Define roles, tools, memory, safety, and execution loops.' }
            },
            {
                id: 'cyber',
                label: { tr: 'Siber', en: 'Cyber' },
                description: { tr: 'Güvenlik tehditlerini modelle, savunmaları sınırla ve sertleştir.', en: 'Model security threats, test defenses, and harden systems.' },
                example: { tr: 'Saldırı yüzeyini incele ve savunma kontrol listesi çıkar.', en: 'Inspect the attack surface and produce a defense checklist.' }
            }
        ]
    },
    {
        id: 'creation',
        name: { tr: 'İçerik, Sanat & Dil', en: 'Content, Art & Language' },
        color: '#ec4899',
        bg: 'rgba(236, 72, 153, 0.12)',
        border: 'rgba(236, 72, 153, 0.28)',
        domains: [
            {
                id: 'blog',
                label: { tr: 'Blog', en: 'Blog' },
                description: { tr: 'Araştırılmış, net ve yayınlanabilir içerik üret.', en: 'Create researched, clear, and publishable editorial content.' },
                example: { tr: 'İçerik açısı, yapı, ton ve editoryal kontrol listesi oluştur.', en: 'Build an angle, structure, voice, and editorial checklist.' }
            },
            {
                id: 'image',
                label: { tr: 'Görsel', en: 'Image' },
                description: { tr: 'Görsel fikirleri kompozisyon, stil ve üretim ayrıntılarına dönüştür.', en: 'Turn visual ideas into precise composition and generation direction.' },
                example: { tr: 'Sahne, ışık, lens, stil ve negatif kısıtları tarif et.', en: 'Specify scene, lighting, lens, style, and negative constraints.' }
            },
            {
                id: 'language',
                label: { tr: 'Dil', en: 'Language' },
                description: { tr: 'Çeviri, yazım, ton ve dil öğrenme görevlerini bağlama uyarla.', en: 'Adapt translation, writing, tone, and language-learning tasks to context.' },
                example: { tr: 'Metni çevir, sadeleştir, düzelt veya hedef kitleye uyarla.', en: 'Translate, simplify, refine, or adapt text for an audience.' }
            }
        ]
    },
    {
        id: 'life',
        name: { tr: 'İş & Yaşam Ops', en: 'Business & Life Ops' },
        color: '#06b6d4',
        bg: 'rgba(6, 182, 212, 0.12)',
        border: 'rgba(6, 182, 212, 0.28)',
        domains: [
            {
                id: 'business',
                label: { tr: 'İş', en: 'Business' },
                description: { tr: 'İş hedeflerini strateji, analiz ve uygulanabilir planlara bağla.', en: 'Connect business goals to strategy, analysis, and executable plans.' },
                example: { tr: 'Pazar, müşteri, teklif veya büyüme planını yapılandır.', en: 'Structure a market, customer, offer, or growth plan.' }
            },
            {
                id: 'wellness',
                label: { tr: 'Sağlık', en: 'Wellness' },
                description: { tr: 'Günlük iyilik halini güvenli, ölçülü ve sürdürülebilir planlara çevir.', en: 'Turn wellbeing goals into safe, balanced, sustainable plans.' },
                example: { tr: 'Rutin, alışkanlık, enerji veya egzersiz planı oluştur.', en: 'Create a routine, habit, energy, or exercise plan.' }
            },
            {
                id: 'travel',
                label: { tr: 'Seyahat', en: 'Travel' },
                description: { tr: 'Seyahati ilgi alanı, tempo, bütçe ve lojistikle dengeli biçimde planla.', en: 'Plan travel around interests, pace, budget, and logistics.' },
                example: { tr: 'Rota, yemek, kültür, ulaşım ve bütçeyi tek planda birleştir.', en: 'Combine routes, food, culture, transit, and budget in one plan.' }
            }
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

export function getDomainPresentation(domainId) {
    const group = getDomainGroup(domainId);
    return group?.domains.find((domain) => domain.id === domainId) || null;
}
