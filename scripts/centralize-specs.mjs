import { writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const specsDir = join(__dirname, '..', 'src', 'domains', 'specs');

const DOMAIN_DATA = {
    learning: {
        categories: {
            tr: {
                foundation: 'Temel Kavramlar',
                mechanism: 'Çalışma Mekanizması',
                context: 'Bağlam ve İlişkiler',
                boundaries: 'Sınırlar ve Kısıtlar',
                application: 'Pratik Uygulama'
            },
            en: {
                foundation: 'Foundations',
                mechanism: 'Mechanism',
                context: 'Context & Relations',
                boundaries: 'Boundaries & Constraints',
                application: 'Practical Application'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    karma: 'Sen öğretmen, sistem analisti, birinci ilkeler düşünürü ve bilgi mimarının birleşimisin.',
                    feynman: 'Sen dünyanın en iyi öğretmenisin. Karmaşık konuları 10 yaşındaki birine anlatır gibi basitleştirirsin.',
                    sistem: 'Sen bir sistem analisti ve bilgi mimarısısın. Karmaşık konseptleri yapısal olarak çözümler, bileşenler arası ilişkileri haritalarsın.',
                    sokratik: 'Sen Sokratik yöntemi kullanan bir düşünce koçusun. Doğrudan cevap vermek yerine beni kendi kendime cevaba ulaştırırsın.',
                    ilkeler: 'Sen bir birinci ilkeler düşünürüsün. Her varsayımı sorgular, kavramları temel bileşenlerine indirger ve oradan inşa edersin.'
                },
                derinlik: {
                    temel: 'Açıklamaları kısa ve öz tut. Her bölüm birkaç cümlede özetlenebilmeli.',
                    orta: 'Makul düzeyde detay ver. Önemli nüansları atlama ama gereksiz tekrara girme.',
                    derin: 'Kapsamlı ve detaylı analiz yap. Her noktayı örneklerle destekle.',
                    kapsamli: 'Mümkün olan en derin ve kapsamlı analizi yap. Hiçbir detayı atlama.'
                },
                format: {
                    markdown: 'Hiyerarşik Markdown formatı kullan. Başlıklar, alt başlıklar ve madde işaretleri ile yapılandır.',
                    tablo: 'Mümkün olduğunca tablo formatı kullan. Karşılaştırmaları tablolarda göster.',
                    ders: 'Ders notu formatında yaz. Öğrenci dostu ve tekrar edilebilir bir yapıda.',
                    quiz: 'Her bölümün sonunda mini quiz soruları ekle. Öğrenmeyi pekiştirici formatta yaz.'
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
                    karma: 'You are a combination of a teacher, systems analyst, first-principles thinker, and information architect.',
                    feynman: 'You are the best teacher in the world. You simplify complex topics as if explaining to a 10-year-old.',
                    sistem: 'You are a systems analyst. You structurally deconstruct complex concepts and map relationships.',
                    sokratik: 'You are a Socratic thought coach. Instead of giving direct answers, you ask the right questions to lead me there.',
                    ilkeler: 'You are a first-principles thinker. You question every assumption and reduce concepts to fundamentals.'
                },
                derinlik: {
                    temel: 'Keep explanations brief and concise. Summarize each section in a few sentences.',
                    orta: 'Provide a moderate level of detail. Explain important nuances without repetition.',
                    derin: 'Perform a comprehensive and detailed analysis. Support every point with examples.',
                    kapsamli: 'Perform the most exhaustive analysis possible. Leave no detail untouched.'
                },
                format: {
                    markdown: 'Use hierarchical Markdown formatting. Structure with headings and bullet points.',
                    tablo: 'Use tables wherever possible. Display comparisons in tabular formats.',
                    ders: 'Write in a lecture-note format. Student-friendly and easy to review.',
                    quiz: 'Add mini-quiz questions at the end of each section to reinforce learning.'
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
        }
    },
    code: {
        categories: {
            tr: {
                design: 'Sistem Tasarımı',
                build: 'İnşa & İmplementasyon',
                comprehend: 'Kod Anlama & Analiz',
                harden: 'Güvenlik & Dayanıklılık',
                ship: 'Dağıtım & Operasyon'
            },
            en: {
                design: 'System Design',
                build: 'Build & Implementation',
                comprehend: 'Comprehension & Analysis',
                harden: 'Hardening & Security',
                ship: 'Shipping & Ops'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    senior: 'Sen kıdemli bir yazılım mühendisisin. Kod kalitesini, sürdürülebilirliği ve doğru mühendislik ödünleşimlerini önceliklendirirsin.',
                    reviewer: "Sen titiz bir kod inceleme uzmanısın. Pull request'leri doğruluk, tasarım ve okunabilirlik açısından eleştirel gözle değerlendirirsin.",
                    architect: 'Sen bir yazılım mimarısın. Sistemleri bileşenlere ayırır, sınırları tanımlar ve uzun vadeli mimari kararları gerekçelendirirsin.',
                    pair: 'Sen deneyimli bir eş programlama (pair programming) ortağısın. Düşünce sürecini paylaşır, alternatifleri tartışır ve birlikte en iyi çözüme ulaşırsın.',
                    security: 'Sen bir uygulama güvenliği mühendisisin. Her kod parçasını bir saldırganın gözünden değerlendirir, istismar edilebilir zayıflıkları önceliklendirirsin.'
                },
                derinlik: {
                    temel: 'Açıklamaları kısa tut; sadece temel yaklaşımı ve sonucu ver, ayrıntıya girme.',
                    orta: 'Makul düzeyde detay ver; ana mantığı ve önemli tasarım kararlarını açıkla, aşırı ayrıntıya boğma.',
                    derin: "Kapsamlı bir analiz yap; edge case'leri, alternatifleri ve gerekçeleri örneklerle destekle.",
                    kapsamli: "Mümkün olan en derin ve kapsamlı analizi yap; hiçbir edge case'i, riski veya alternatifi atlama."
                },
                format: {
                    explained: 'Kodu, her önemli bloğun hemen altında kısa açıklamalarla birlikte ver.',
                    full: 'Kesilmemiş, tam ve çalıştırılabilir dosya içeriğini ver; parça veya yer tutucu kullanma.',
                    diff: 'Değişikliği unified diff formatında (+/- satırlarıyla) sun.',
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
                goalTemplate: '"{{KONU}}" görevini doğru, sürdürülebilir ve production\'a hazır bir mühendislik çözümüyle tamamlamak.',
                constraintsBase: [
                    'Doğrudan çözüme gir, gereksiz giriş cümlesi yazma.',
                    'Varsayımda bulunduğun her yerde bunu açıkça belirt, sessizce varsayma.',
                    "Kodu her zaman çalışır ve eksiksiz ver; '...geri kalanı burada' gibi yer tutucu bırakma."
                ],
                monologueText: 'İÇ SES MODU: Kod yazmadan veya bir karar vermeden önce, en az 3 alternatif yaklaşımı (<thinking> tagleri içerisinde) değerlendir ve en iyisini seç. Ancak nihai kullanıcı çıktısına bu iç sesi yansıtma.'
            },
            en: {
                mod: {
                    senior: 'You are a senior software engineer. You prioritize code quality, maintainability, and sound engineering tradeoffs.',
                    reviewer: 'You are a meticulous code review specialist. You evaluate pull requests critically for correctness, design, and readability.',
                    architect: 'You are a software architect. You decompose systems into components, define boundaries, and justify long-term architectural decisions.',
                    pair: 'You are an experienced pair-programming partner. You share your reasoning, discuss alternatives, and work toward the best solution together.',
                    security: 'You are an application security engineer. You evaluate every piece of code through an attacker\'s mindset, prioritizing exploitable weaknesses.'
                },
                derinlik: {
                    temel: 'Keep it brief; give only the core approach and result, skip the detail.',
                    orta: 'Provide a moderate level of detail; explain the main logic and key design decisions without over-explaining.',
                    derin: 'Perform a thorough analysis; support edge cases, alternatives, and rationale with examples.',
                    kapsamli: 'Perform the most exhaustive analysis possible; do not skip any edge case, risk, or alternative.'
                },
                format: {
                    explained: 'Present the code with short explanations directly under each significant block.',
                    full: 'Provide the complete, uncut, runnable file content; no fragments or placeholders.',
                    diff: 'Present the change as a unified diff (+/- lines).',
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
    },
    decision: {
        categories: {
            tr: {
                foundation: 'Karar Çerçevesi',
                analysis: 'Seçenek Analizi',
                tradeoff: 'Ödünleşim & Risk',
                biases: 'Bilişsel Yanlılıklar',
                execution: 'Uygulama & Takip'
            },
            en: {
                foundation: 'Decision Framing',
                analysis: 'Option Analysis',
                tradeoff: 'Tradeoffs & Risks',
                biases: 'Cognitive Biases',
                execution: 'Execution & Tracking'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    premortem: 'Sen bir risk ve premortem analistisin. Kararın gelecekte neden başarısız olabileceğini baştan simüle eder ve zayıf noktaları ortaya çıkarırsın.',
                    rasyonel: 'Sen rasyonel karar kuramcısı ve stratejik danışmansın. Seçenekleri objektif kriterler, ağırlıklar ve beklenen değerler üzerinden puanlarsın.',
                    ikincicil: 'Sen ikinci ve üçüncü derece sonuçları düşünen bir sistem analistisin. Bir kararın yalnızca anlık değil, dolaylı ve uzun vadeli zincirleme etkilerini modelllersin.',
                    sokratik: 'Sen kritik düşünme koçusun. Karar vericinin kör noktalarını, gizli varsayımlarını ve duygusal yanlılıklarını yönlendirici sorularla açığa çıkarırsın.'
                },
                derinlik: {
                    temel: 'Temel karar matrisini ve ana riskleri özetle.',
                    orta: 'Kriterleri puanla, ödünleşimleri ve 2. derece sonuçları dengeli açıkla.',
                    derin: 'Kapsamlı senaryo analizi, hassasiyet testleri ve bilişsel yanlılık denetimi yap.',
                    kapsamli: 'Uç riskler, geri döndürülebilirlik katsayıları ve detaylı uygulama yol haritası dahil tam analizi sun.'
                },
                format: {
                    matris2x2: '2x2 Karar matrisi ve ağırlıklı puanlama tablosu formatında yapılandır.',
                    evtablo: 'Beklenen değer ve olasılık tablosu formatında hazırla.',
                    tradeoffs: 'Ödünleşimler ve artı/eksi dengesini maddeler halinde sun.',
                    agac: 'Karar ağacı ve dallanan senaryolar formatında yapılandır.'
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
                goalTemplate: '"{{KONU}}" kararını tüm boyutları, riskleri, alternatifleri ve ödünleşimleriyle rasyonel olarak değerlendirip net bir aksiyona varmak.',
                constraintsBase: [
                    'Tüm seçeneklerin artı ve eksilerini net ve dürüstçe ortaya koy.',
                    'Kararın geri döndürülebilir (Tip 1 vs Tip 2) olup olmadığını mutlaka belirt.',
                    'Bilişsel yanlılıklardan arınmış, somut bir eylem önerisiyle sonlandır.'
                ],
                monologueText: 'İÇ SES MODU: Karar önerisi oluşturmadan önce (<thinking> tagleri içinde) en olumsuz 3 senaryoyu ve en az 2 alternatif seçeneği simüle et.'
            },
            en: {
                mod: {
                    premortem: 'You are a premortem and risk analyst. You simulate why a decision might fail in the future and expose fatal flaws proactively.',
                    rasyonel: 'You are a rational decision theorist and strategic advisor. You score options against objective criteria, weights, and expected values.',
                    ikincicil: 'You are a systems thinker focused on second and third-order consequences. You model long-term systemic ripples.',
                    sokratik: 'You are a critical thinking coach. You expose blind spots, hidden assumptions, and emotional biases through structured questions.'
                },
                derinlik: {
                    temel: 'Summarize the core decision matrix and primary risks.',
                    orta: 'Score criteria with balanced explanations of tradeoffs and second-order effects.',
                    derin: 'Perform comprehensive scenario analysis, sensitivity checks, and cognitive bias audits.',
                    kapsamli: 'Provide an exhaustive evaluation including tail risks, reversibility ratings, and step-by-step execution triggers.'
                },
                format: {
                    matris2x2: 'Structure as a 2x2 decision matrix and weighted scoring table.',
                    evtablo: 'Format as expected value and probability tables.',
                    tradeoffs: 'Present explicit pros/cons tradeoffs and non-negotiables.',
                    agac: 'Structure as a decision tree with branching decision nodes.'
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
                goalTemplate: 'To rigorously evaluate the decision "{{KONU}}" across all dimensions, risks, alternatives, and tradeoffs to arrive at a clear, defensible action.',
                constraintsBase: [
                    'State all pros and cons transparently and objectively.',
                    'Explicitly categorize decision reversibility (Type 1 vs Type 2).',
                    'Conclude with a clear, bias-resistant recommendation.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before formulating advice, simulate 3 catastrophic failure modes and at least 2 counter-alternatives in <thinking> tags.'
            }
        }
    },
    academic: {
        categories: {
            tr: {
                methodology: 'Metodoloji & Tasarım',
                literature: 'Literatür & Kuram',
                writing: 'Akademik Yazım',
                review: 'Hakem İncelemesi',
                validation: 'Doğrulama & Etik'
            },
            en: {
                methodology: 'Methodology & Design',
                literature: 'Literature & Theory',
                writing: 'Academic Writing',
                review: 'Peer Review',
                validation: 'Validation & Ethics'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    reviewer2: 'Sen en titiz Q1 dergilerinin Hakem 2 (Reviewer #2) personasısın. Metodolojik zayıflıkları, eksik kanıtları ve mantıksal sıçramaları acımasızca tespit edersin.',
                    ampirik: 'Sen ampirik araştırma metodoloğusun. Veri toplama, örneklem geçerliliği, istatistiksel güç ve tekrarlanabilirlik standartlarını denetlersin.',
                    teorisyen: 'Sen kuramsal çerçeve uzmanısın. Hipotezlerin epistemolojik zeminini, kavramsal tanımlarını ve literatürdeki ontolojik konumunu kurgularsın.'
                },
                derinlik: {
                    lisans: 'Temel literatür taraması ve açık araştırma sorusu formatında tut.',
                    doktora: 'Kapsamlı kuramsal zemin, metodolojik gerekçelendirme ve karşılaştırmalı analiz sun.',
                    journal: 'Q1 dergi seviyesinde titiz hakem eleştirisi, metodolojik kısıtlar ve etki analizi üret.'
                },
                format: {
                    apa: 'APA 7 ve akademik makale yapısına uygun format kullan.',
                    hakemmatris: 'Hakem eleştirisi ve revizyon matrisi formatında hazırla.',
                    kunye: 'Kavramsal çerçeve ve araştırma künyesi formatında yapılandır.'
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
                goalTemplate: '"{{KONU}}" akademik araştırma konusunu metodolojik titizlik, kuramsal zemin ve literatür disipliniyle incelemek.',
                constraintsBase: [
                    'Tüm iddiaları kuramsal veya ampirik temele dayandır.',
                    'Literatürdeki boşluğu (research gap) net olarak tanımla.',
                    'Metodolojik sınırları ve tehditleri (threats to validity) dürüstçe belirt.'
                ],
                monologueText: 'İÇ SES MODU: Araştırma çerçevesini kurmadan önce (<thinking> tagleri içinde) hipotezin zayıf noktalarını ve alternatif açıklamaları sorgula.'
            },
            en: {
                mod: {
                    reviewer2: 'You are the hyper-critical Reviewer #2 of a top-tier Q1 academic journal. You spot methodological flaws, unsupported claims, and logic gaps.',
                    ampirik: 'You are an empirical research methodologist. You audit data integrity, sample validity, statistical power, and reproducibility.',
                    teorisyen: 'You are a theoretical framework specialist. You ground hypotheses in rigorous ontology, epistemology, and literature lineage.'
                },
                derinlik: {
                    lisans: 'Provide a structured literature overview and clear research question scope.',
                    doktora: 'Deliver comprehensive theoretical grounding, methodological justification, and comparative synthesis.',
                    journal: 'Produce top-tier journal quality critique, validity threats, and scholarly contribution analysis.'
                },
                format: {
                    apa: 'Structure using formal academic style (APA 7 standards).',
                    hakemmatris: 'Format as a peer-review commentary and revision matrix.',
                    kunye: 'Format as a structured research proposal and theoretical blueprint.'
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
                goalTemplate: 'To examine the academic research topic "{{KONU}}" with methodological rigor, theoretical grounding, and scholarly discipline.',
                constraintsBase: [
                    'Ground all assertions in theoretical or empirical evidence.',
                    'Clearly articulate the research gap and contribution.',
                    'Explicitly document limitations and threats to validity.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before structuring findings, evaluate methodological vulnerabilities and rival explanations in <thinking> tags.'
            }
        }
    },
    philosophy: {
        categories: {
            tr: {
                logic: 'Mantık & Akıl Yürütme',
                ethics: 'Etik & Ahlak Felsefesi',
                epistemology: 'Epistemoloji & Bilgi',
                'thought-experiments': 'Düşünce Deneyleri',
                critique: 'Eleştiri & Diyalektik'
            },
            en: {
                logic: 'Logic & Reasoning',
                ethics: 'Ethics & Moral Philosophy',
                epistemology: 'Epistemology & Knowledge',
                'thought-experiments': 'Thought Experiments',
                critique: 'Critique & Dialectics'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    sokratik: 'Sen Sokratik sorgulama ustasısın. Karşı tarafın tanımlarındaki çelişkileri açığa çıkarır, aporia (çıkmaz) noktalarını gösterirsin.',
                    stoaci: 'Sen Stoacı ve rasyonel bir filozofsundur. Olayları kontrol edilebilir ve edilemez alanlara ayırır, akılcı duruşu temel alırsın.',
                    pozitivist: 'Sen bir mantıksal pozitivistsin. Doğrulanamayan metafizik önermeleri ayıklar, kavramsal açıklık ve formel mantık talep edersin.',
                    varoluscu: 'Sen varoluşçu bir düşünürsün. Özgürlük, sorumluluk, kaygı ve otantik varoluş ikilemlerini incelersin.'
                },
                derinlik: {
                    temel: 'Temel kavramları ve argüman hattını sade felsefi dille açıkla.',
                    orta: 'Öncülleri, karşı argümanları ve felsefi gelenekleri dengeli sun.',
                    derin: 'Birincil metin titizliğinde, ontolojik ve epistemolojik temelleri eksiksiz incele.'
                },
                format: {
                    diyalog: 'Sokratik diyalog ve sorgulama formatında yapılandır.',
                    oncul: 'Öncül-Sonuç (Premise-Conclusion) formel mantık dizilimi kullan.',
                    matris: 'Etik ve felsefi teorileri karşılaştırma matrisinde göster.'
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
                goalTemplate: '"{{KONU}}" felsefi problemini temel kavramlarına, epistemik varsayımlarına ve mantıksal sonuçlarına ayırarak derinlemesine sorgulamak.',
                constraintsBase: [
                    'Öncüller ile sonuç arasındaki mantıksal bağı netleştir.',
                    'Safsatalardan (fallacies) ve totolojilerden kesinlikle kaçın.',
                    'Karşıt felsefi görüşleri en güçlü halleriyle (steelmanning) ele al.'
                ],
                monologueText: 'İÇ SES MODU: Yanıt üretmeden önce (<thinking> tagleri içinde) argümanın gizli ontolojik varsayımlarını sorgula.'
            },
            en: {
                mod: {
                    sokratik: 'You are a master of Socratic elenchus. You expose contradictions in definitions and guide toward productive aporia.',
                    stoaci: 'You are a Stoic rationalist. You divide reality into what is within our control and what is not, emphasizing virtue and reason.',
                    pozitivist: 'You are a logical positivist. You reject ungrounded metaphysics and enforce strict conceptual clarity and formal verification.',
                    varoluscu: 'You are an existential thinker. You explore radical freedom, subjective meaning, anguish, and authentic existence.'
                },
                derinlik: {
                    temel: 'Explain core concepts and the main argumentative line in accessible philosophical terms.',
                    orta: 'Present premises, counter-arguments, and historical philosophical lineages with balanced depth.',
                    derin: 'Conduct exhaustive primary-source level analysis with complete ontological and epistemic deconstruction.'
                },
                format: {
                    diyalog: 'Structure as a structured Socratic dialogue and dialectical inquiry.',
                    oncul: 'Format as formal premise-conclusion logical arguments.',
                    matris: 'Present as a comparative matrix of ethical/philosophical traditions.'
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
                goalTemplate: 'To deeply investigate the philosophical problem "{{KONU}}" by deconstructing its core concepts, epistemic premises, and logical implications.',
                constraintsBase: [
                    'Make the deductive or inductive chain explicit and valid.',
                    'Strictly avoid informal and formal fallacies.',
                    'Steelman counter-positions before critiquing them.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before presenting the argument, test for hidden metaphysical assumptions in <thinking> tags.'
            }
        }
    },
    problemsolving: {
        categories: {
            tr: {
                deconstruction: 'Sorun Ayrıştırma',
                triz: 'TRIZ & Çelişkiler',
                lateral: 'Yanal Düşünce',
                scamper: 'SCAMPER & İnovasyon',
                evaluation: 'Değerlendirme & Test'
            },
            en: {
                deconstruction: 'Problem Deconstruction',
                triz: 'TRIZ & Contradictions',
                lateral: 'Lateral Thinking',
                scamper: 'SCAMPER & Innovation',
                evaluation: 'Evaluation & Testing'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    radikal: 'Sen radikal inovasyon ve birinci ilkeler problem çözücüsüsün. Mevcut kabulleri yıkar, sorunu en saf fiziksel sınırlarına indirgersin.',
                    mimar: 'Sen sistemik problem mimarısısın. Tıkanıklıkları (bottlenecks), geri besleme döngülerini ve kök neden ağaçlarını haritalarsın.',
                    yanal: 'Sen yanal (lateral) düşünce ustasısın. Alakasız alanlardan analojiler kurar, tersine çevirme ve kural dışı sıçramalarla çözüm üretirsin.',
                    yikici: 'Sen yıkıcı inovasyon ve tersine mühendislik uzmanısın. Sorunun neden var olduğunu sorgular, problemi çözmek yerine gereksiz kılan çözümler ararsın.'
                },
                derinlik: {
                    temel: 'Kök nedeni ve 3 hızlı uygulanabilir çözümü özetle.',
                    orta: 'TRIZ çelişkilerini, SCAMPER dönüşümlerini ve uygulama adımlarını sun.',
                    derin: 'Kapsamlı kök neden ağacı, sistemik ödünleşimler ve test protokolü üret.',
                    kapsamli: 'Uç senaryolar, yan etkiler, kaynak haritası ve pilot doğrulama planı dahil eksiksiz çözüm mimarisi sun.'
                },
                format: {
                    scampertablo: 'SCAMPER inovasyon tablosu formatında yapılandır.',
                    trizmatris: 'TRIZ çelişki ve 40 prensip matrisi formatında sun.',
                    hatscikti: 'Hata Ağacı ve Kök Neden şeması formatında hazırla.',
                    balikkilcigi: 'Ishikawa (Balık Kılçığı) neden-sonuç formatında düzenle.'
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
                goalTemplate: '"{{KONU}}" problemini kök nedenlerine, sistemik çelişkilerine ve çözüm parametrelerine ayırarak yenilikçi ve uygulanabilir çözümler üretmek.',
                constraintsBase: [
                    'Semptomları değil, kök nedeni hedef al.',
                    'Çözümlerin yaratacağı ikinci derece yan etkileri belirt.',
                    'Her öneri için ölçülebilir bir doğrulama metriği tanımla.'
                ],
                monologueText: 'İÇ SES MODU: Çözüm önermeden önce (<thinking> tagleri içinde) sorunu tersine çevirerek ve en az 3 farklı alandan analoji kurarak düşün.'
            },
            en: {
                mod: {
                    radikal: 'You are a radical innovation and first-principles problem solver. You dismantle legacy assumptions and solve from raw constraints.',
                    mimar: 'You are a systems problem architect. You map systemic bottlenecks, vicious cycles, and root-cause trees.',
                    yanal: 'You are a master of lateral thinking. You use cross-domain analogies, provocative operations, and oblique perspectives.',
                    yikici: 'You are a disruptive innovation engineer. You eliminate the conditions that created the problem rather than merely treating it.'
                },
                derinlik: {
                    temel: 'Identify the root cause and deliver 3 quick-win actionable solutions.',
                    orta: 'Analyze TRIZ contradictions, apply SCAMPER transforms, and provide implementation steps.',
                    derin: 'Deliver an in-depth root-cause diagram, tradeoff matrix, and testing framework.',
                    kapsamli: 'Provide an exhaustive innovation blueprint including edge cases, side-effect audits, and pilot deployment plans.'
                },
                format: {
                    scampertablo: 'Structure as a SCAMPER innovation ideation matrix.',
                    trizmatris: 'Format using TRIZ technical contradiction and inventive principles table.',
                    hatscikti: 'Format as a Fault Tree and Root Cause Analysis breakdown.',
                    balikkilcigi: 'Structure as an Ishikawa (Fishbone) cause-and-effect framework.'
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
                goalTemplate: 'To systematically decompose the problem "{{KONU}}" into root causes and systemic contradictions to generate innovative, actionable solutions.',
                constraintsBase: [
                    'Target root causes rather than superficial symptoms.',
                    'Explicitly flag potential negative side effects of each fix.',
                    'Provide a concrete validation metric for proposed solutions.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before pitching solutions, invert the problem and explore 3 cross-disciplinary analogies in <thinking> tags.'
            }
        }
    },
    agentarch: {
        categories: {
            tr: {
                persona: 'Persona & Sistem Rolü',
                cot: 'Düşünce Zinciri (CoT)',
                guardrails: 'Güvenlik & Sınırlar',
                fewshot: 'Few-Shot Örnekleri',
                orchestration: 'Araçlar & Orkestrasyon'
            },
            en: {
                persona: 'Persona & System Role',
                cot: 'Chain-of-Thought (CoT)',
                guardrails: 'Safety Guardrails',
                fewshot: 'Few-Shot Examples',
                orchestration: 'Tools & Orchestration'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    guardrail: 'Sen sıfır toleranslı bir yapay zeka güvenlik ve prompt mimarısısın. Halüsinasyonu engelleyen deterministik kısıtlar ve savunma bariyerleri tasarlarsın.',
                    cot: 'Sen akıl yürütme (Reasoning & CoT) mimarısısın. Modelin adım adım düşünmesini, ara adımları doğrulamasını ve mantık zincirini kurmasını sağlarsın.',
                    fewshot: 'Sen örnek temelli öğrenme (Few-Shot Prompting) uzmanısın. Karmaşık girdi/çıktı sözleşmelerini mükemmel kurgulanmış örnek çiftleriyle tanımlarsın.'
                },
                derinlik: {
                    standart: 'Temel sistem promptu, rol tanımı ve standart kısıtlar.',
                    zerohallucination: 'Sıkı halüsinasyon engelleme, negatif kısıtlar ve doğrulama filtreleri.',
                    askeri: 'Askeri düzeyde deterministik guardrail mimarisi, tool calling şemaları ve hata yakalama döngüleri.'
                },
                format: {
                    xml: 'Claude ve gelişmiş LLM uyumlu XML tag hiyerarşisi kullan.',
                    systemjson: 'OpenAI API ve Structured Outputs uyumlu JSON formatı hazırla.',
                    template: 'Değişken parametreli ve modüler Markdown template formatı kullan.'
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
                goalTemplate: '"{{KONU}}" yapay zeka ajanı için sıfır-halüsinasyon hedefli, deterministik ve üretim kalitesinde bir sistem promptu ve çalışma mimarisi oluşturmak.',
                constraintsBase: [
                    'Prompt içinde belirsiz, yoruma açık ifadeler bırakma.',
                    'Modelin bilmediği durumlarda "bilmiyorum" demesini zorunlu kıl.',
                    'Girdi ve çıktı formatını şematik olarak kilitli tut.'
                ],
                monologueText: 'İÇ SES MODU: Prompt mimarisini yazmadan önce (<thinking> tagleri içinde) olası prompt enjeksiyonu ve halüsinasyon vektörlerini test et.'
            },
            en: {
                mod: {
                    guardrail: 'You are a zero-tolerance AI safety and prompt architect. You design deterministic constraints, refusal boundaries, and anti-hallucination barriers.',
                    cot: 'You are a Chain-of-Thought and reasoning loop architect. You enforce rigorous step-by-step verification before final answers.',
                    fewshot: 'You are an exemplary few-shot prompting engineer. You establish airtight input/output contracts through curated demonstration pairs.'
                },
                derinlik: {
                    standart: 'Standard system prompt with defined persona and core constraints.',
                    zerohallucination: 'Strict anti-hallucination guardrails, negative constraints, and verification protocols.',
                    askeri: 'Mission-critical deterministic architecture with tool schema contracts and failure recovery loops.'
                },
                format: {
                    xml: 'Format using Claude-optimized semantic XML tag hierarchy.',
                    systemjson: 'Format using OpenAI Structured Outputs compliant JSON schema.',
                    template: 'Format as a parameterized modular Markdown prompt template.'
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
                goalTemplate: 'To construct a zero-hallucination, deterministic, production-grade system prompt and agent execution architecture for "{{KONU}}".',
                constraintsBase: [
                    'Leave zero room for ambiguous model interpretation.',
                    'Mandate explicit uncertainty refusal when facts are missing.',
                    'Enforce strict input/output contract validation.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before assembling the system prompt, stress-test prompt injection and hallucination vectors in <thinking> tags.'
            }
        }
    },
    cyber: {
        categories: {
            tr: {
                threat: 'Tehdit Modelleme',
                appsec: 'Uygulama Güvenliği',
                audit: 'Güvenlik Denetimi',
                pentest: 'Sızma Testi & Saldırı',
                compliance: 'Uyum & Standartlar'
            },
            en: {
                threat: 'Threat Modeling',
                appsec: 'Application Security',
                audit: 'Security Audit',
                pentest: 'Pentest & Attack Scenarios',
                compliance: 'Compliance & Standards'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    red: 'Sen ofansif güvenlik ve Red Team uzmanısın. Saldırgan zihniyetiyle mimarideki açıkları, yetki yükseltme yollarını ve istismar zincirlerini tespit edersin.',
                    blue: 'Sen defansif güvenlik ve Blue Team mimarısısın. Derinlemesine savunma (Defense-in-Depth), loglama, anomali tespiti ve sertleştirme protokolleri kurarsın.',
                    auditor: 'Sen siber güvenlik denetçisi ve uyum uzmanısın. OWASP, ISO 27001, SOC2 ve NIST standartları doğrultusunda sistemik riskleri raporlarsın.'
                },
                derinlik: {
                    yuzey: 'Genel saldırı yüzeyi ve en kritik 5 güvenlik açığını listele.',
                    standart: 'OWASP Top 10 ve STRIDE tehdit modellemesiyle standart denetim yap.',
                    derin: 'İstismar zincirleri, CVSS skorlaması ve kod seviyesinde iyileştirme kılavuzu içeren kapsamlı analiz sun.'
                },
                format: {
                    stridematris: 'STRIDE tehdit ve risk matrisi formatında sun.',
                    owaspenvanter: 'OWASP Top 10 zafiyet envanteri ve CVSS tablosu şeklinde yapılandır.',
                    pentestsenaryo: 'Sızma testi senaryosu ve iyileştirme (remediation) planı formatında hazırla.'
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
                goalTemplate: '"{{KONU}}" sisteminin siber güvenlik tehdit modellemesini, zafiyet analizini ve savunma stratejisini endüstri standartlarında hazırlamak.',
                constraintsBase: [
                    'Tüm güvenlik açıklarını CVSS etki derecelendirmesiyle ilişkilendir.',
                    'Yalnızca tespit değil, somut iyileştirme (remediation) adımı sun.',
                    'Zero Trust ve Least Privilege prensiplerini tavizsiz uygula.'
                ],
                monologueText: 'İÇ SES MODU: Tehdit analizini çıkarmadan önce (<thinking> tagleri içinde) saldırganın en az dirençli saldırı vektörünü modelle.'
            },
            en: {
                mod: {
                    red: 'You are an offensive security and Red Team specialist. You identify exploit chains, privilege escalation paths, and architectural vulnerabilities.',
                    blue: 'You are a defensive security and Blue Team architect. You engineer Defense-in-Depth, SIEM alerting, and system hardening baselines.',
                    auditor: 'You are a cyber compliance and security auditor. You assess controls against OWASP, ISO 27001, SOC2, and NIST cybersecurity frameworks.'
                },
                derinlik: {
                    yuzey: 'Map the external attack surface and top critical vulnerabilities.',
                    standart: 'Conduct standard audit using OWASP Top 10 and STRIDE threat modeling.',
                    derin: 'Deliver exhaustive exploit chain analysis, CVSS scoring, and code-level remediation blueprints.'
                },
                format: {
                    stridematris: 'Format as a comprehensive STRIDE threat and mitigation matrix.',
                    owaspenvanter: 'Structure as an OWASP Top 10 vulnerability inventory with CVSS vectors.',
                    pentestsenaryo: 'Format as an attack scenario walkthrough and remediation roadmap.'
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
                goalTemplate: 'To develop an industry-standard threat model, vulnerability audit, and defense remediation plan for "{{KONU}}".',
                constraintsBase: [
                    'Pair every identified risk with actionable remediation guidance.',
                    'Ground all severity claims in standard CVSS 3.1 metrics.',
                    'Enforce Zero Trust and Least Privilege by default.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before detailing vulnerabilities, simulate the path of least resistance for an adversary in <thinking> tags.'
            }
        }
    },
    blog: {
        categories: {
            tr: {
                triage: 'Kitle & Niyet',
                evidence: 'Kanıt & Argüman',
                dialectic: 'Diyalektik & Karşıt Görüş',
                structure: 'Akış & Yapı',
                'anti-patterns': 'Klişe & Düzeltme'
            },
            en: {
                triage: 'Audience & Intent',
                evidence: 'Evidence & Arguments',
                dialectic: 'Dialectics & Counter-Views',
                structure: 'Narrative & Structure',
                'anti-patterns': 'Anti-Patterns & Polish'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    polemik: 'Sen düşünce lideri ve polemik yazarısın. Statükoyu sarsan, cesur tezler öne süren ve güçlü karşıt argümanları çürüten bir üslup kullanırsın.',
                    aciklayici: 'Sen berrak bir teknik ve editoryal yazarsın. Karmaşık fikirleri net metaforlar, kanıtlar ve akıcı bir hikaye kurgusuyla aktarırsın.',
                    deneme: 'Sen derinlikli bir deneme ve kültür yazarısın. Olayların arka planındaki insani, felsefi ve tarihsel katmanları işlersin.'
                },
                derinlik: {
                    ampirik: 'İçeriği somut veriler, vaka çalışmaları ve istatistiklerle güçlendir.',
                    teorik: 'Kavramsal derinlik, düşünce modelleri ve kuramsal arka plan sun.',
                    hibrit: 'Hem ampirik verileri hem de güçlü anlatı kurgusunu kusursuz dengele.'
                },
                format: {
                    writingnotes: 'Editoryal taslak ve yayın notları formatında yapılandır.',
                    steelman: 'Steelman karşılaştırması ve tez-antitez formatında hazırla.',
                    triyaj: 'Kitle niyet analizi ve içerik mimarisi formatında sun.'
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
                goalTemplate: '"{{KONU}}" konusunda okuyucuyu derinden yakalayan, kanıt temelli, özgün ve yüksek editoryal kalitede bir içerik mimarisi kurgulamak.',
                constraintsBase: [
                    'Yapay zeka klişelerinden (AI fluff, dolgu cümleler) tamamen kaçın.',
                    'Her ana argümanı somut bir örnek veya kanıtla destekle.',
                    'Okuyucuya ilk 3 cümlede net bir değer ve kanca (hook) sun.'
                ],
                monologueText: 'İÇ SES MODU: İçerik iskeletini oluşturmadan önce (<thinking> tagleri içinde) en güçlü karşı argümanı ve ana tezin zayıf noktalarını test et.'
            },
            en: {
                mod: {
                    polemik: 'You are a thought leader and polemical essayist. You challenge the status quo with bold thesis statements and sharp counter-arguments.',
                    aciklayici: 'You are a master technical and editorial writer. You distill complex subjects into lucid prose, evidence, and compelling narrative arcs.',
                    deneme: 'You are an insightful long-form essayist. You uncover the cultural, human, and historical layers beneath modern developments.'
                },
                derinlik: {
                    ampirik: 'Ground every section with empirical data, case studies, and concrete benchmarks.',
                    teorik: 'Provide conceptual rigor, mental models, and deep theoretical context.',
                    hibrit: 'Balance rigorous empirical evidence with persuasive narrative momentum.'
                },
                format: {
                    writingnotes: 'Format as structured editorial draft with annotations and citations.',
                    steelman: 'Structure as a thesis-antithesis-synthesis steelmanning outline.',
                    triyaj: 'Format as an audience intent triage and content architecture blueprint.'
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
                goalTemplate: 'To architect an engaging, evidence-grounded, original, and highly editorial piece of content on "{{KONU}}".',
                constraintsBase: [
                    'Strictly eliminate AI clichés, filler phrasing, and generic platitudes.',
                    'Anchor every core claim in concrete examples or data points.',
                    'Hook the reader with undeniable value in the opening lines.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before outlining, steelman the opposing viewpoint and stress-test the core premise in <thinking> tags.'
            }
        }
    },
    image: {
        categories: {
            tr: {
                medium: 'Medya & Sanat Tarzı',
                composition: 'Kompozisyon & Kadraj',
                lighting: 'Işık & Renk',
                atmosphere: 'Atmosfer & Doku',
                parameters: 'Render & Parametreler'
            },
            en: {
                medium: 'Medium & Art Style',
                composition: 'Composition & Framing',
                lighting: 'Lighting & Color',
                atmosphere: 'Atmosphere & Texture',
                parameters: 'Render & Camera Parameters'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    fotogercekci: 'Sen usta bir fotoğrafçı ve görüntü yönetmenisin. Lens tipi, diyafram, sensör dokusu ve doğal ışık dinamikleriyle hiper-gerçekçi sahneler kurarsın.',
                    yagliboya: 'Sen klasik ve modern sanat ustasısın. Fırça darbeleri, impasto tekniği, renk paleti ve ışık-gölge (chiaroscuro) kompozisyonlarıyla görsel tasarlarsın.',
                    octane: 'Sen 3D konsept sanatçısı ve render uzmanısın. Octane, Unreal Engine 5, hacimsel ışıklandırma (volumetric lighting) ve fotogerçekçi materyallerle sahne oluşturursun.',
                    minimalist: 'Sen minimalist görsel tasarımcısın. Negatif alan, sade geometrik formlar, tipografik denge ve çarpıcı renk kontrastlarını yönetirsin.'
                },
                derinlik: {
                    temel: 'Temel özne, ana stil ve ışık yönünü içeren temiz prompt üret.',
                    orta: 'Kompozisyon kuralları, kamera açısı ve atmosferik detayları ekle.',
                    ultra: 'Lens milimetresi, film stoğu, mikro dokular, negatif promptlar ve motor parametreleriyle kusursuz profesyonel prompt inşa et.'
                },
                format: {
                    '16-9': '16:9 Sinematik geniş ekran en-boy oranında optimize et.',
                    '1-1': '1:1 Kare sosyal medya / portre formatında optimize et.',
                    '9-16': '9:16 Dikey mobil / hikaye formatında optimize et.'
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
                goalTemplate: '"{{KONU}}" görsel konsepti için kusursuz kompozisyon, ışık, stil ve render parametrelerine sahip yüksek çözünürlüklü prompt oluşturmak.',
                constraintsBase: [
                    'Görsel öğeleri ağırlık sırasına göre virgülle ayrılmış net terimlerle belirt.',
                    'İstenmeyen bozulmaları negatif prompt bloğunda açıkça listele.',
                    'Stil ve ışık kaynağını birbiriyle çelişmeyecek şekilde uyumla.'
                ],
                monologueText: 'İÇ SES MODU: Promptu oluşturmadan önce (<thinking> tagleri içinde) sahnenin odak noktasını, ışık yönünü ve renk uyumunu planla.'
            },
            en: {
                mod: {
                    fotogercekci: 'You are a master cinematographer and photographer. You engineer hyper-realistic prompts specifying lens focal lengths, f-stops, sensor noise, and natural lighting.',
                    yagliboya: 'You are a master fine artist. You design visual prompts with tangible brushwork, impasto textures, color palettes, and chiaroscuro depth.',
                    octane: 'You are an advanced 3D environment and concept artist. You utilize Octane/Unreal Engine 5 shaders, raytracing, and volumetric lighting.',
                    minimalist: 'You are a minimalist art director. You leverage negative space, disciplined geometry, and high-impact focal contrast.'
                },
                derinlik: {
                    temel: 'Generate a focused prompt covering subject, primary style, and ambient lighting.',
                    orta: 'Add precise compositional framing, camera distance, and atmospheric depth cues.',
                    ultra: 'Engineer a production-ready prompt with camera sensor, lens optics, micro-textures, and negative modifier weights.'
                },
                format: {
                    '16-9': 'Optimize for 16:9 cinematic widescreen aspect ratio.',
                    '1-1': 'Optimize for 1:1 square balanced composition.',
                    '9-16': 'Optimize for 9:16 vertical mobile framing.'
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
                goalTemplate: 'To engineer a high-precision prompt with master-level composition, lighting, style, and camera parameters for the concept "{{KONU}}".',
                constraintsBase: [
                    'Order prompt tokens strictly by semantic importance and visual weight.',
                    'Include dedicated negative prompt exclusions to prevent artifacting.',
                    'Ensure lighting physics and stylistic rendering engines do not conflict.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before prompt generation, map the key visual focal point, lighting direction, and chromatic balance in <thinking> tags.'
            }
        }
    },
    language: {
        categories: {
            tr: {
                localization: 'Kültürel Adaptasyon',
                register: 'Ton & Dil Düzeyi',
                fluency: 'Akıcılık & Deyimler',
                idioms: 'Deyim & Kalıplar',
                pedagogy: 'Dilbilgisi & Açıklama'
            },
            en: {
                localization: 'Cultural Localization',
                register: 'Tone & Register',
                fluency: 'Fluency & Idioms',
                idioms: 'Expressions & Phrasing',
                pedagogy: 'Grammar & Pedagogy'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    kurumsal: 'Sen profesyonel bir kurumsal çevirmen ve dil danışmanısın. İş dünyası jargonu, resmi ton ve diplomatik nezaket kurallarını kusursuz uygularsın.',
                    edebi: 'Sen edebi çevirmen ve metin yazarısın. Metnin ritmini, duygusunu, mecazlarını ve yazarın özgün sesini hedef dile aktarırsın.',
                    samimi: 'Sen modern yerelleştirme (localization) uzmanısın. Günlük konuşma dili, sokak argosu, mizah ve popüler kültür kodlarını doğal biçimde uyarlarsın.'
                },
                derinlik: {
                    dilbilgisi: 'Sadece dilbilgisi düzeltmesi ve doğrudan çeviri sun.',
                    parlatma: 'Akıcılık, ton kalibrasyonu ve alternatif ifadelerle metni parlat.',
                    kulturel: 'Kültürel adaptasyon, deyimsel eşleşmeler ve detaylı çeviri notlarıyla zenginleştir.'
                },
                format: {
                    yanyana: 'Kaynak ve hedef metni yan yana karşılaştırmalı formatta sun.',
                    aciklama: 'Çeviriyi, tercih edilen sözcüklerin açıklamalarıyla birlikte ver.',
                    rephrase: 'Farklı ton ve kayıtlar için 3 alternatif yeniden ifade formatında hazırla.'
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
                goalTemplate: '"{{KONU}}" metnini kültürel nüanslar, dilbilgisi hassasiyeti ve hedef kitle tonuna kusursuz uyum sağlayacak şekilde lokalize ve optimize etmek.',
                constraintsBase: [
                    'Birebir (kelime kelimesine) çeviri yapma; anlamsal ve kültürel eşdeğerliği sağla.',
                    'Deyimlerin ve mecazların hedef dildeki doğal karşılıklarını kullan.',
                    'Ton tutarlılığını (resmi/samimi) metin boyunca koru.'
                ],
                monologueText: 'İÇ SES MODU: Çeviriyi tamamlamadan önce (<thinking> tagleri içinde) sahte eşdeğerleri (false friends) ve kültürel anlam kaymalarını denetle.'
            },
            en: {
                mod: {
                    kurumsal: 'You are a corporate localization consultant. You enforce professional tone, executive register, and domain terminology.',
                    edebi: 'You are a literary translator. You preserve authorial voice, lyrical cadence, metaphorical resonance, and subtext.',
                    samimi: 'You are a contemporary localization specialist. You adapt idioms, colloquialisms, humor, and cultural references authentically.'
                },
                derinlik: {
                    dilbilgisi: 'Focus on precise grammatical correction and faithful translation.',
                    parlatma: 'Calibrate register, enhance sentence flow, and provide refined phrasings.',
                    kulturel: 'Provide comprehensive localization with cultural rationale and annotated translation notes.'
                },
                format: {
                    yanyana: 'Present as side-by-side source and target comparative layout.',
                    aciklama: 'Provide the translated text accompanied by lexical and stylistic footnotes.',
                    rephrase: 'Offer 3 distinct tonal rephrasing variants (formal, concise, expressive).'
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
                goalTemplate: 'To localize, refine, and optimize the text "{{KONU}}" with cultural nuances, grammatical precision, and tone calibration.',
                constraintsBase: [
                    'Never translate verbatim; prioritize semantic, stylistic, and cultural equivalence.',
                    'Map idioms and figures of speech to native target expressions.',
                    'Maintain uncompromising register consistency throughout.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before finalizing translation, audit false cognates and subtle tonal drift in <thinking> tags.'
            }
        }
    },
    edudesign: {
        categories: {
            tr: {
                taxonomy: 'Öğrenme Taksonomisi',
                curriculum: 'Müfredat & Modüller',
                assessment: 'Ölçme & Değerlendirme',
                engagement: 'Etkileşim & Pekiştirme',
                rubrics: 'Değerlendirme Kriterleri'
            },
            en: {
                taxonomy: 'Learning Taxonomy',
                curriculum: 'Curriculum & Modules',
                assessment: 'Assessment & Feedback',
                engagement: 'Engagement & Retention',
                rubrics: 'Rubrics & Criteria'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    bloom: 'Sen Bloom Taksonomisi ve müfredat tasarım uzmanısın. Hedefleri hatırlama düzeyinden yaratma ve değerlendirme basamaklarına yapılandırırsın.',
                    flipped: 'Sen Ters Yüz Öğrenme (Flipped Classroom) mimarısısın. Teorik bilgiyi bağımsız çalışmaya, sınıf içi zamanı ise aktif problem çözmeye odaklarsın.',
                    gamified: 'Sen oyunlaştırılmış eğitim ve motivasyon tasarımcısısın. İlerleme döngüleri, geri bildirim sistemleri ve mikro-kazanımlarla öğrenmeyi sürükleyici kılarsın.'
                },
                derinlik: {
                    atolye: 'Kısa süreli atölye veya mikro-öğrenme modülü formatında hazırla.',
                    modul: 'Haftalık kazanımları ve değerlendirme kriterlerini içeren tam modül tasarla.',
                    bootcamp: 'Kapsamlı, proje tabanlı ve uçtan uca yoğun eğitim programı oluştur.'
                },
                format: {
                    hafta: 'Hafta hafta ilerleyen müfredat planı formatında yapılandır.',
                    rubricmatris: 'Ölçme ve değerlendirme rubrik matrisi şeklinde hazırla.',
                    bloomsoru: 'Bloom basamaklarına göre kademeli soru ve görev seti formatında sun.'
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
                goalTemplate: '"{{KONU}}" için pedagojik olarak yapılandırılmış, ölçülebilir kazanımlara ve etkili değerlendirme mekanizmalarına sahip bir müfredat tasarlamak.',
                constraintsBase: [
                    'Her öğrenme hedefini ölçülebilir eylem fiilleriyle tanımla.',
                    'Teorik anlatım ile aktif uygulama arasındaki dengeyi koru.',
                    'Öğrencinin ilerlemesini doğrulayan somut değerlendirme kriterleri koy.'
                ],
                monologueText: 'İÇ SES MODU: Müfredatı oluşturmadan önce (<thinking> tagleri içinde) öğrencinin yaşayabileceği bilişsel aşırı yüklenme (cognitive overload) noktalarını belirle.'
            },
            en: {
                mod: {
                    bloom: 'You are an instructional designer specialized in Bloom\'s Taxonomy. You scaffold learning from foundational recall up to evaluation and synthesis.',
                    flipped: 'You are a flipped classroom architect. You delegate passive knowledge transfer to prep-work and reserve active time for collaborative problem solving.',
                    gamified: 'You are a gamification and educational engagement designer. You engineer progression loops, micro-achievements, and feedback loops.'
                },
                derinlik: {
                    atolye: 'Format as a focused workshop or micro-learning module.',
                    modul: 'Design a structured multi-week module with assessment rubrics.',
                    bootcamp: 'Build an intensive, project-driven, comprehensive bootcamp program.'
                },
                format: {
                    hafta: 'Structure as a week-by-week curriculum syllabus.',
                    rubricmatris: 'Format as an analytical assessment rubric matrix.',
                    bloomsoru: 'Present as a tiered question and task bank mapped to cognitive levels.'
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
                goalTemplate: 'To design a pedagogically sound, outcome-based, and highly engaging learning curriculum for "{{KONU}}".',
                constraintsBase: [
                    'Formulate every learning objective with measurable action verbs.',
                    'Balance conceptual exposition with active deliberate practice.',
                    'Define unambiguous rubric criteria for student evaluation.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before structuring the syllabus, audit potential cognitive overload bottlenecks in <thinking> tags.'
            }
        }
    },
    business: {
        categories: {
            tr: {
                validation: 'İş Modeli Doğrulama',
                market: 'Pazar & Rekabet',
                'unit-economics': 'Birim Ekonomi & Finans',
                pitch: 'Yatırımcı Sunumu',
                risk: 'Risk & Yönetişim'
            },
            en: {
                validation: 'Business Validation',
                market: 'Market & Competition',
                'unit-economics': 'Unit Economics & Finance',
                pitch: 'Investor Pitch',
                risk: 'Risk & Governance'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    vc: 'Sen tecrübeli bir Girişim Sermayesi (VC) yatırımcısısın. Pazar büyüklüğü (TAM/SAM), savunulabilirlik (moat), ölçeklenebilirlik ve çıkış stratejilerini sorgularsın.',
                    ops: 'Sen kıdemli bir Operasyon Direktörüsün (COO). Süreç verimliliği, birim maliyetler, tedarik zinciri ve yürütme (execution) risklerine odaklanırsın.',
                    growth: 'Sen veri odaklı bir Büyüme Liderisin (Head of Growth). Müşteri edinme maliyeti (CAC), yaşam boyu değer (LTV), virallik ve dönüşüm hunilerini optimize edersin.'
                },
                derinlik: {
                    temel: 'Temel iş modeli tuvali ve ana değer önerisini özetle.',
                    standart: 'Pazar analizi, birim ekonomi ve büyüme kanallarını detaylandır.',
                    derin: 'Yatırımcıya hazır finansal model, hassasiyet analizi, risk matrisi ve operasyonel yol haritası sun.'
                },
                format: {
                    pitchdeck: '10-Slayt Yatırımcı Sunumu (Pitch Deck) iskeleti formatında hazırla.',
                    swot: 'SWOT ve TOWS Strateji matrisi şeklinde sun.',
                    uniteconomics: 'Birim ekonomi ve finansal gösterge tablosu formatında yapılandır.'
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
                goalTemplate: '"{{KONU}}" iş fikri veya stratejisi için pazar doğrulaması, birim ekonomi ve yatırımcıya hazır büyüme planı oluşturmak.',
                constraintsBase: [
                    'Varsayımları değil, pazar gerçeklerini ve birim ekonomiyi temel al.',
                    'LTV/CAC ve geri ödeme (payback) sürelerini net hesapla.',
                    'Haksız rekabet avantajını (unfair advantage / moat) açıkça tanımla.'
                ],
                monologueText: 'İÇ SES MODU: Stratejiyi kurgulamadan önce (<thinking> tagleri içinde) şirketin batmasına yol açabilecek en büyük 3 nakit akışı ve pazar riskini modelle.'
            },
            en: {
                mod: {
                    vc: 'You are a seasoned Venture Capital partner. You interrogate TAM/SAM sizing, defensibility moats, unit economics scalability, and return multiples.',
                    ops: 'You are a veteran Chief Operating Officer. You focus on operational efficiency, unit cost containment, margin expansion, and execution bottlenecks.',
                    growth: 'You are a data-driven Growth Leader. You engineer acquisition funnels, viral coefficients, retention cohorts, and LTV/CAC ratios.'
                },
                derinlik: {
                    temel: 'Summarize the core business model canvas and value proposition.',
                    standart: 'Deliver market segmentation, unit economics analysis, and distribution strategy.',
                    derin: 'Provide an investor-ready financial model, sensitivity analysis, competitive moat audit, and operational roadmap.'
                },
                format: {
                    pitchdeck: 'Format as a standard 10-slide investor pitch deck framework.',
                    swot: 'Structure as an actionable SWOT and TOWS strategic matrix.',
                    uniteconomics: 'Present as a comprehensive unit economics and financial metrics dashboard.'
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
                goalTemplate: 'To construct a market-validated, unit-economics-backed, and investor-ready business and growth strategy for "{{KONU}}".',
                constraintsBase: [
                    'Anchor strategy in realistic unit economics rather than vanity metrics.',
                    'Quantify LTV/CAC dynamics and cash runway impact.',
                    'Clearly define sustainable competitive moats.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before finalizing strategy, simulate the 3 most lethal cash-flow and competitive risks in <thinking> tags.'
            }
        }
    },
    wellness: {
        categories: {
            tr: {
                workout: 'Antrenman & Hareket',
                circadian: 'Sirkadiyen & Uyku',
                nutrition: 'Beslenme & Biyokimya',
                adaptation: 'Stres & Adaptasyon',
                habits: 'Alışkanlık & Sürdürülebilirlik'
            },
            en: {
                workout: 'Movement & Training',
                circadian: 'Circadian & Sleep',
                nutrition: 'Nutrition & Biochemistry',
                adaptation: 'Stress & Adaptation',
                habits: 'Habit Systems'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    biohacker: 'Sen kanıta dayalı biyohacking ve fizyoloji koçusun. Sirkadiyen ritim, mitokondriyal sağlık, biyobelirteçler ve uyku optimizasyonunu birleştirirsin.',
                    fizyoterapist: 'Sen spor fizyoterapisti ve hareket uzmanısın. Postür düzeltme, sakatlık önleme, progressive overload ve mobilite protokolleri tasarlarsın.',
                    habit: 'Sen davranış bilimcisi ve alışkanlık mimarısısın. Mikro-adımlar, tetikleyici zincirleri ve sürdürülebilir yaşam tarzı dönüşümleri kurgularsın.'
                },
                derinlik: {
                    temel: 'Temel günlük rutin ve uygulanabilir 3 ana prensip sun.',
                    haftalik: 'Haftalık antrenman, beslenme ve toparlanma (recovery) planı oluştur.',
                    biohacking: 'Biyobelirteçler, takviye protokolleri, sirkadiyen ışık döngüleri ve ileri toparlanma yöntemleri içeren tam rehber hazırla.'
                },
                format: {
                    haftaliktablo: 'Haftalık program ve takip tablosu formatında yapılandır.',
                    sirkadiyencart: '24 Saatlik sirkadiyen zamanlama çizelgesi şeklinde sun.',
                    makrohesap: 'Beslenme ve makro/mikro besin hesaplama şeması formatında hazırla.'
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
                goalTemplate: '"{{KONU}}" hedefi doğrultusunda biyomekanik, sirkadiyen ritim ve beslenme ilkelerine dayalı sürdürülebilir bir sağlık protokolü geliştirmek.',
                constraintsBase: [
                    'Tüm önerileri insan fizyolojisi ve bilimsel literatüre dayandır.',
                    'Aşırı katı, sürdürülemez ve sakatlık riski taşıyan programlardan kaçın.',
                    'Toparlanma (uyku ve dinlenme) sürecini antrenman kadar önceliklendir.'
                ],
                monologueText: 'İÇ SES MODU: Protokolü yazmadan önce (<thinking> tagleri içinde) aşırı antrenman (overtraining) ve sakatlık risk faktörlerini denetle.'
            },
            en: {
                mod: {
                    biohacker: 'You are an evidence-based physiology and biohacking coach. You optimize circadian timing, mitochondrial health, and biomarker metrics.',
                    fizyoterapist: 'You are a sports physiotherapist and movement specialist. You design progressive overload, mobility, and injury prevention frameworks.',
                    habit: 'You are a behavioral scientist and habit architect. You design low-friction habit loops, environmental cues, and sustainable routines.'
                },
                derinlik: {
                    temel: 'Provide core daily routine and 3 actionable foundational principles.',
                    haftalik: 'Build a comprehensive 7-day movement, nutrition, and recovery schedule.',
                    biohacking: 'Deliver an advanced biomarker, supplementation, circadian photobiology, and recovery protocol.'
                },
                format: {
                    haftaliktablo: 'Format as a weekly routine and accountability matrix.',
                    sirkadiyencart: 'Structure as a 24-hour circadian timing protocol.',
                    makrohesap: 'Format as an analytical macro/micro-nutrient calculation breakdown.'
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
                goalTemplate: 'To engineer a science-backed, sustainable wellness and recovery protocol based on physiology and circadian biology for "{{KONU}}".',
                constraintsBase: [
                    'Ground all recommendations in peer-reviewed physiological science.',
                    'Avoid unsustainable extremes and high-risk biomechanical prescriptions.',
                    'Prioritize sleep and nervous system recovery on equal footing with exertion.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before detailing protocols, evaluate overtraining risks and metabolic fatigue factors in <thinking> tags.'
            }
        }
    },
    travel: {
        categories: {
            tr: {
                curation: 'Özgün Seçki & Filtre',
                route: 'Rota & Lojistik',
                culture: 'Kültür & Gastronomi',
                logistics: 'Ulaşım & Zamanlama',
                budget: 'Bütçe & Güvenlik'
            },
            en: {
                curation: 'Curation & Hidden Gems',
                route: 'Route & Logistics',
                culture: 'Culture & Gastronomy',
                logistics: 'Transport & Timing',
                budget: 'Budget & Safety'
            }
        },
        compilerTexts: {
            tr: {
                mod: {
                    gurme: 'Sen yerel kültür ve gastronomi rehberisin. Turist tuzaklarından uzak, otantik lezzet duraklarını ve gizli mahalle lokantalarını bilirsin.',
                    kulturtarih: 'Sen sanat tarihi ve kültürel miras uzmanısın. Şehirlerin mimari, tarihi ve sanatsal dokusunu derinlemesine hikayeleştirerek gezdirirsin.',
                    slow: 'Sen yavaş seyahat (Slow Travel) ve yerel yaşam danışmanısın. Şehri tüketmek yerine yaşayarak deneyimlemeyi, sürdürülebilir ve dingin rotaları benimsersin.'
                },
                derinlik: {
                    yavas: 'Günde en fazla 2-3 kaliteli deneyim içeren dingin rota planı.',
                    dengeli: 'Önemli simgeler ile gizli köşeleri dengeleyen standart seyahat planı.',
                    yogun: 'Ulaşım süreleri, rezervasyon saatleri ve bütçe optimizasyonu içeren dakik plan.'
                },
                format: {
                    saatlik: 'Saat saat yapılandırılmış detaylı günlük akış formatı kullan.',
                    bolge: 'Bölgelere ve mahallelere göre kümelenmiş keşif rehberi şeklinde sun.',
                    butcetablo: 'Harcama kalemleri ve bütçe tablosu formatında hazırla.'
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
                goalTemplate: '"{{KONU}}" seyahati için turistik klişelerden arındırılmış, yerel deneyim ve lojistik optimizasyon odaklı kusursuz bir rota tasarlamak.',
                constraintsBase: [
                    'Turist tuzaklarından ve aşırı kalabalık ticari noktalardan kaçın.',
                    'Lojistik geçiş sürelerini ve coğrafi yakınlıkları gerçekçi planla.',
                    'Yerel kültüre saygılı ve ekonomik olarak verimli öneriler sun.'
                ],
                monologueText: 'İÇ SES MODU: Rota çizmeden önce (<thinking> tagleri içinde) yürüme mesafelerini, transfer sürelerini ve yorgunluk faktörünü değerlendir.'
            },
            en: {
                mod: {
                    gurme: 'You are an authentic gastronomy and local culture guide. You steer clear of tourist traps, focusing on neighborhood culinary secrets and artisan producers.',
                    kulturtarih: 'You are an art historian and cultural heritage specialist. You narrate architectural, historical, and artistic depth throughout the journey.',
                    slow: 'You are a slow travel and immersive living consultant. You focus on deep place-attachment, mindful itineraries, and sustainable discovery.'
                },
                derinlik: {
                    yavas: 'A relaxed itinerary with maximum 2-3 quality experiences per day.',
                    dengeli: 'A balanced plan blending essential landmarks with hidden local gems.',
                    yogun: 'A precise, high-efficiency schedule with transit timing and reservation management.'
                },
                format: {
                    saatlik: 'Structure as an hour-by-hour sequential daily itinerary.',
                    bolge: 'Organize by geographic districts and neighborhood walking hubs.',
                    butcetablo: 'Present as a comprehensive expense breakdown and logistics budget matrix.'
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
                goalTemplate: 'To design an authentic, anti-tourist-trap, culturally rich, and logistically optimized travel itinerary for "{{KONU}}".',
                constraintsBase: [
                    'Filter out tourist traps and overhyped commercial venues.',
                    'Ensure realistic transit times and geographically coherent routing.',
                    'Promote respectful, culturally nuanced, and cost-effective recommendations.'
                ],
                monologueText: 'INTERNAL MONOLOGUE: Before plotting itinerary, calculate transit friction and walking fatigue curves in <thinking> tags.'
            }
        }
    }
};

const COMMON_UI_TITLES = {
    tr: {
        modulesTitle: 'Modüller (Module Blocks)',
        presetsTitle: 'Uzman Hazır Şablonları (System Presets)',
        paramsTitle: 'Parametreler'
    },
    en: {
        modulesTitle: 'Module Blocks',
        presetsTitle: 'System Presets',
        paramsTitle: 'Parameters'
    }
};

function cleanEmoji(text) {
    if (typeof text !== 'string') return text;
    return text
        .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1FFFF}]/gu, '')
        .replace(/^[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ(\[]+/u, '')
        .trim();
}

async function run() {
    const { DOMAINS } = await import('../src/domains/index.js');

    for (const [domainId, spec] of Object.entries(DOMAINS)) {
        const specFilePath = join(specsDir, `${domainId}Spec.js`);
        const domainData = DOMAIN_DATA[domainId];
        if (!domainData) {
            console.warn(`No metadata for domain: ${domainId}`);
            continue;
        }

        // 1. Update UI categories & titles
        spec.ui.tr.categories = domainData.categories.tr;
        spec.ui.en.categories = domainData.categories.en;
        spec.ui.tr.modulesTitle = COMMON_UI_TITLES.tr.modulesTitle;
        spec.ui.tr.presetsTitle = COMMON_UI_TITLES.tr.presetsTitle;
        spec.ui.tr.paramsTitle = COMMON_UI_TITLES.tr.paramsTitle;
        spec.ui.en.modulesTitle = COMMON_UI_TITLES.en.modulesTitle;
        spec.ui.en.presetsTitle = COMMON_UI_TITLES.en.presetsTitle;
        spec.ui.en.paramsTitle = COMMON_UI_TITLES.en.paramsTitle;

        // 2. Set CompilerTexts
        spec.compilerTexts = domainData.compilerTexts;

        // 3. Fix icon for philosophy
        if (domainId === 'philosophy') {
            spec.icon = 'building-2';
        }

        // 4. Clean presets: deduplicate forceModules, clean emoji in names, fix wellness circadian
        if (spec.presets) {
            for (const [presetKey, preset] of Object.entries(spec.presets)) {
                // Remove duplicates from forceModules
                if (Array.isArray(preset.forceModules)) {
                    preset.forceModules = Array.from(new Set(preset.forceModules));
                }

                // Clean emojis from name
                if (preset.name) {
                    if (typeof preset.name === 'object') {
                        if (preset.name.tr) preset.name.tr = cleanEmoji(preset.name.tr);
                        if (preset.name.en) preset.name.en = cleanEmoji(preset.name.en);
                    } else if (typeof preset.name === 'string') {
                        preset.name = cleanEmoji(preset.name);
                    }
                }

                // Specific fix for wellness circadian-reset
                if (domainId === 'wellness' && presetKey === 'circadian-reset') {
                    preset.forceModules = ['cir-morning-sunlight-anchor', 'cir-blue-light-melatonin-prep'];
                    preset.override = {
                        seviye: 'sirkadiyen',
                        mod: 'biohacker',
                        derinlik: 'biohacking',
                        format: 'sirkadiyencart'
                    };
                    preset.injectRules = [
                        'Align sleep-wake timing with photobiology and natural light exposure intervals.',
                        'Structure core body temperature and meal timing protocols.'
                    ];
                }
            }
        }

        // Write updated spec file
        const fileContent = `export const ${domainId}Spec = ${JSON.stringify(spec, null, 2)};\n`;
        writeFileSync(specFilePath, fileContent, 'utf8');
        console.log(`Updated ${domainId}Spec.js successfully.`);
    }

    console.log('All 15 domain specs updated and centralized!');
}

run();
