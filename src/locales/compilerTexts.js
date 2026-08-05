// Domain-scoped compiler text bundles: COMPILER_TEXTS[domain][lang].
// Each bundle supplies everything structureBuilder.js needs to render the
// [ROLE]/[GOAL]/[OUTPUT FORMAT]/[CONSTRAINTS] blocks for that domain — the
// skeleton itself stays domain-agnostic in structureBuilder.js.
//
// goalTemplate uses a {{KONU}} placeholder (same convention as the {{ALAN}}
// token used in module prompts) — structureBuilder replaces it with the
// user's topic/task text.
import { getDomain } from '../domains/index.js';

export const COMPILER_TEXTS = {
    learning: {
        tr: {
            mod: {
                karma:    'Sen öğretmen, sistem analisti, birinci ilkeler düşünürü ve bilgi mimarının birleşimisin.',
                feynman:  'Sen dünyanın en iyi öğretmenisin. Karmaşık konuları 10 yaşındaki birine anlatır gibi basitleştirirsin.',
                sistem:   'Sen bir sistem analisti ve bilgi mimarısısın. Karmaşık konseptleri yapısal olarak çözümler, bileşenler arası ilişkileri haritalarsın.',
                sokratik: 'Sen Sokratik yöntemi kullanan bir düşünce koçusun. Doğrudan cevap vermek yerine beni kendi kendime cevaba ulaştırırsın.',
                ilkeler:  'Sen bir birinci ilkeler düşünürüsün. Her varsayımı sorgular, kavramları temel bileşenlerine indirger ve oradan inşa edersin.'
            },
            derinlik: {
                temel:    'Açıklamaları kısa ve öz tut. Her bölüm birkaç cümlede özetlenebilmeli.',
                orta:     'Makul düzeyde detay ver. Önemli nüansları atlama ama gereksiz tekrara girme.',
                derin:    'Kapsamlı ve detaylı analiz yap. Her noktayı örneklerle destekle.',
                kapsamli: 'Mümkün olan en derin ve kapsamlı analizi yap. Hiçbir detayı atlama.'
            },
            format: {
                markdown: 'Hiyerarşik Markdown formatı kullan. Başlıklar, alt başlıklar ve madde işaretleri ile yapılandır.',
                tablo:    'Mümkün olduğunca tablo formatı kullan. Karşılaştırmaları tablolarda göster.',
                ders:     'Ders notu formatında yaz. Öğrenci dostu ve tekrar edilebilir bir yapıda.',
                quiz:     'Her bölümün sonunda mini quiz soruları ekle. Öğrenmeyi pekiştirici formatta yaz.'
            },
            labels: {
                role: '[ROLE]',
                goal: '[GOAL]',
                context: '[CONTEXT]',
                modules: '[ACTIVE MODULES]',
                instructions: '[INSTRUCTIONS]',
                format: '[OUTPUT FORMAT]',
                constraints: '[CONSTRAINTS / SAFETY]'
            },
            contextLabels: { domain: 'Alan:', level: 'Seviye:', depthRequirement: 'Derinlik Gereksinimi:' },
            goalTemplate: '"{{KONU}}" konusunu yüzeysel değil, mekanik ve nedensel seviyede kavramak.',
            constraintsBase: [
                'Doğrudan konuya gir, gereksiz giriş cümlesi yazma.',
                'Teknik terim kullanırsan hemen sade dille açıkla.',
                'Belirsiz yer varsa bunu açıkça belirt.'
            ],
            monologueText: 'İÇ SES MODU: Her adımı yanıtlamadan önce konunun sınır koşullarını (<thinking> tagleri içerisinde) en az 3 farklı açıdan değerlendir. Ancak nihai kullanıcı çıktısına bu iç sesi yansıtma.'
        },
        en: {
            mod: {
                karma:    'You are a combination of a teacher, systems analyst, first-principles thinker, and information architect.',
                feynman:  'You are the best teacher in the world. You simplify complex topics as if explaining to a 10-year-old.',
                sistem:   'You are a systems analyst. You structurally deconstruct complex concepts and map relationships.',
                sokratik: 'You are a Socratic thought coach. Instead of giving direct answers, you ask the right questions to lead me there.',
                ilkeler:  'You are a first-principles thinker. You question every assumption and reduce concepts to fundamentals.'
            },
            derinlik: {
                temel:    'Keep explanations brief and concise. Summarize each section in a few sentences.',
                orta:     'Provide a moderate level of detail. Explain important nuances without repetition.',
                derin:    'Perform a comprehensive and detailed analysis. Support every point with examples.',
                kapsamli: 'Perform the most exhaustive analysis possible. Leave no detail untouched.'
            },
            format: {
                markdown: 'Use hierarchical Markdown formatting. Structure with headings and bullet points.',
                tablo:    'Use tables wherever possible. Display comparisons in tabular formats.',
                ders:     'Write in a lecture-note format. Student-friendly and easy to review.',
                quiz:     'Add mini-quiz questions at the end of each section to reinforce learning.'
            },
            labels: {
                role: '[ROLE]',
                goal: '[GOAL]',
                context: '[CONTEXT]',
                modules: '[ACTIVE MODULES]',
                instructions: '[INSTRUCTIONS]',
                format: '[OUTPUT FORMAT]',
                constraints: '[CONSTRAINTS / SAFETY]'
            },
            contextLabels: { domain: 'Domain:', level: 'Level:', depthRequirement: 'Depth Requirement:' },
            goalTemplate: 'To understand the topic "{{KONU}}" not superficially, but at a mechanical and causal level.',
            constraintsBase: [
                'Get straight to the point, no unnecessary introductions.',
                'Explain technical jargon simply.',
                'Explicitly state any uncertainties.'
            ],
            monologueText: 'INTERNAL MONOLOGUE: Before answering each step, evaluate boundary conditions using your internal monologue (<thinking> tags) from at least 3 perspectives. Do not show this internal monologue in the final output.'
        }
    },
    code: {
        tr: {
            mod: {
                senior:   'Sen kıdemli bir yazılım mühendisisin. Kod kalitesini, sürdürülebilirliği ve doğru mühendislik ödünleşimlerini önceliklendirirsin.',
                reviewer: "Sen titiz bir kod inceleme uzmanısın. Pull request'leri doğruluk, tasarım ve okunabilirlik açısından eleştirel gözle değerlendirirsin.",
                architect: 'Sen bir yazılım mimarısın. Sistemleri bileşenlere ayırır, sınırları tanımlar ve uzun vadeli mimari kararları gerekçelendirirsin.',
                pair:     'Sen deneyimli bir eş programlama (pair programming) ortağısın. Düşünce sürecini paylaşır, alternatifleri tartışır ve birlikte en iyi çözüme ulaşırsın.',
                security: 'Sen bir uygulama güvenliği mühendisisin. Her kod parçasını bir saldırganın gözünden değerlendirir, istismar edilebilir zayıflıkları önceliklendirirsin.'
            },
            derinlik: {
                temel:    "Açıklamaları kısa tut; sadece temel yaklaşımı ve sonucu ver, ayrıntıya girme.",
                orta:     'Makul düzeyde detay ver; ana mantığı ve önemli tasarım kararlarını açıkla, aşırı ayrıntıya boğma.',
                derin:    "Kapsamlı bir analiz yap; edge case'leri, alternatifleri ve gerekçeleri örneklerle destekle.",
                kapsamli: "Mümkün olan en derin ve kapsamlı analizi yap; hiçbir edge case'i, riski veya alternatifi atlama."
            },
            format: {
                explained: 'Kodu, her önemli bloğun hemen altında kısa açıklamalarla birlikte ver.',
                full:     'Kesilmemiş, tam ve çalıştırılabilir dosya içeriğini ver; parça veya yer tutucu kullanma.',
                diff:     'Değişikliği unified diff formatında (+/- satırlarıyla) sun.',
                stepwise: 'Çözümü adım adım, her adımda ne yapıldığını ve nedenini açıklayarak ilerlet.'
            },
            labels: {
                role: '[ROLE]',
                goal: '[GOAL]',
                context: '[CONTEXT]',
                modules: '[ACTIVE MODULES]',
                instructions: '[INSTRUCTIONS]',
                format: '[OUTPUT FORMAT]',
                constraints: '[CONSTRAINTS / SAFETY]'
            },
            contextLabels: { domain: 'Alan:', level: 'Seviye:', depthRequirement: 'Derinlik Gereksinimi:' },
            goalTemplate: "\"{{KONU}}\" görevini doğru, sürdürülebilir ve production'a hazır bir mühendislik çözümüyle tamamlamak.",
            constraintsBase: [
                'Doğrudan çözüme gir, gereksiz giriş cümlesi yazma.',
                'Varsayımda bulunduğun her yerde bunu açıkça belirt, sessizce varsayma.',
                "Kodu her zaman çalışır ve eksiksiz ver; '...geri kalanı burada' gibi yer tutucu bırakma."
            ],
            monologueText: 'İÇ SES MODU: Kod yazmadan veya bir karar vermeden önce, en az 3 alternatif yaklaşımı (<thinking> tagleri içerisinde) değerlendir ve en iyisini seç. Ancak nihai kullanıcı çıktısına bu iç sesi yansıtma.'
        },
        en: {
            mod: {
                senior:   'You are a senior software engineer. You prioritize code quality, maintainability, and sound engineering tradeoffs.',
                reviewer: 'You are a meticulous code review specialist. You evaluate pull requests critically for correctness, design, and readability.',
                architect: 'You are a software architect. You decompose systems into components, define boundaries, and justify long-term architectural decisions.',
                pair:     'You are an experienced pair-programming partner. You share your reasoning, discuss alternatives, and work toward the best solution together.',
                security: "You are an application security engineer. You evaluate every piece of code through an attacker's mindset, prioritizing exploitable weaknesses."
            },
            derinlik: {
                temel:    'Keep it brief; give only the core approach and result, skip the detail.',
                orta:     'Provide a moderate level of detail; explain the main logic and key design decisions without over-explaining.',
                derin:    'Perform a thorough analysis; support edge cases, alternatives, and rationale with examples.',
                kapsamli: 'Perform the most exhaustive analysis possible; do not skip any edge case, risk, or alternative.'
            },
            format: {
                explained: 'Present the code with short explanations directly under each significant block.',
                full:     'Provide the complete, uncut, runnable file content; no fragments or placeholders.',
                diff:     'Present the change as a unified diff (+/- lines).',
                stepwise: 'Build the solution step by step, explaining what is done and why at each step.'
            },
            labels: {
                role: '[ROLE]',
                goal: '[GOAL]',
                context: '[CONTEXT]',
                modules: '[ACTIVE MODULES]',
                instructions: '[INSTRUCTIONS]',
                format: '[OUTPUT FORMAT]',
                constraints: '[CONSTRAINTS / SAFETY]'
            },
            contextLabels: { domain: 'Domain:', level: 'Level:', depthRequirement: 'Depth Requirement:' },
            goalTemplate: 'To complete the task "{{KONU}}" with a correct, maintainable, production-ready engineering solution.',
            constraintsBase: [
                'Get straight to the solution, no unnecessary preamble.',
                'Explicitly flag every assumption you make — never assume silently.',
                "Always give complete, runnable code; never leave '...rest of the implementation here' placeholders."
            ],
            monologueText: 'INTERNAL MONOLOGUE: Before writing code or making a decision, evaluate at least 3 alternative approaches using your internal monologue (<thinking> tags) and select the best one. Do not show this internal monologue in the final output.'
        }
    }
};

// --- Auto-injected compiler texts ---
COMPILER_TEXTS['decision'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['academic'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['philosophy'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['problemsolving'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['agentarch'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['cyber'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['blog'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['image'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['language'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['edudesign'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['business'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['wellness'] = COMPILER_TEXTS.learning;
COMPILER_TEXTS['travel'] = COMPILER_TEXTS.learning;

export function getCompilerTexts(lang, domain = 'learning') {
    const domainDef = getDomain(domain);
    return domainDef?.compilerTexts?.[lang] || (COMPILER_TEXTS[domain] || COMPILER_TEXTS.learning)[lang];
}
