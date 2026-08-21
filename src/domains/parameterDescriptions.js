const entry = (tr, en) => ({ tr, en });

export const PARAMETER_DESCRIPTIONS = {
    learning: {
        levels: {
            otomatik: entry('Konu karmaşıklığına göre uygun anlatım seviyesini seçer.', 'Chooses the explanation level from the topic complexity.'),
            acemi: entry('Teknik önbilgisi olmayan okuyucuya sade benzetmelerle anlatır.', 'Explains for a beginner using simple analogies.'),
            orta: entry('Temel kavramlar ile yaygın uygulamalar arasında dengeli bir seviye kurar.', 'Balances core concepts with common practical applications.'),
            ileri: entry('Teknik ayrıntıları ve yapısal ilişkileri daha derin işler.', 'Adds deeper technical detail and structural relationships.'),
            uzman: entry('Sektörel ve akademik terminolojiyi tam kapsamıyla kullanır.', 'Uses advanced professional and academic terminology.')
        },
        modes: {
            karma: entry('Konuya göre farklı öğrenme yöntemlerini adaptif biçimde birleştirir.', 'Blends learning methods adaptively for the topic.'),
            feynman: entry('Karmaşık fikri çok basit, sezgisel ve öğretilebilir parçalara böler.', 'Breaks complex ideas into simple, teachable parts.'),
            sistem: entry('Bileşenleri, girdileri, çıktıları ve geri beslemeleri haritalar.', 'Maps components, inputs, outputs, and feedback loops.'),
            sokratik: entry('Doğrudan cevap yerine yönlendirici sorularla düşünmeyi ilerletir.', 'Advances thinking through guiding questions instead of direct answers.'),
            ilkeler: entry('Varsayımları sökerek konuyu kanıtlanmış temel ilkelere indirger.', 'Reduces the topic to proven fundamentals by challenging assumptions.')
        },
        depths: {
            temel: entry('Yalnızca temel kavramları ve genel resmi hızlıca verir.', 'Covers only the essential concepts and the big picture.'),
            orta: entry('Ana hatları, mekanizmaları ve yeterli örnekleri dengeler.', 'Balances main outlines, mechanisms, and useful examples.'),
            derin: entry('Alt bileşenleri, nedenleri ve ayrıntılı işleyişi inceler.', 'Examines subcomponents, causes, and detailed inner workings.'),
            kapsamli: entry('Sınırları, istisnaları, tarihçeyi ve uç durumları kapsar.', 'Covers limits, exceptions, history, and edge cases.')
        },
        formats: {
            markdown: entry('Başlıklar, listeler ve kod bloklarıyla okunabilir bir metin üretir.', 'Produces a readable hierarchy with headings, lists, and code blocks.'),
            tablo: entry('Karşılaştırmaları, verileri ve karar noktalarını tablolara taşır.', 'Puts comparisons, data, and decision points into tables.'),
            ders: entry('Konuyu adım adım ilerleyen ders notu düzeninde sunar.', 'Presents the topic as step-by-step lecture notes.'),
            quiz: entry('Anlatımı pekiştirmek için bölüm sonlarına soru ve cevaplar ekler.', 'Adds questions and answers at section ends for reinforcement.')
        }
    },
    code: {
        levels: {
            otomatik: entry('Kodun bağlamına göre prototip, üretim veya sertleştirilmiş hedefi seçer.', 'Chooses the target maturity from the code context.'),
            prototype: entry('Hızlı doğrulama ve kavram kanıtı için gereken minimum yapıyı hedefler.', 'Targets the minimum structure needed for a proof of concept.'),
            production: entry('Bakımı, test edilebilirliği ve üretime alınabilirliği önceliklendirir.', 'Prioritizes maintainability, testability, and production readiness.'),
            hardened: entry('Güvenlik, hata toleransı ve kötüye kullanım sınırlarını sıkılaştırır.', 'Hardens security, fault tolerance, and misuse boundaries.')
        },
        modes: {
            senior: entry('Sürdürülebilir çözüm ve mühendislik ödünleşimlerine odaklanır.', 'Focuses on sustainable solutions and engineering tradeoffs.'),
            reviewer: entry('Değişikliği doğruluk, tasarım ve okunabilirlik açısından eleştirir.', 'Reviews the change for correctness, design, and readability.'),
            architect: entry('Bileşen sınırlarını, veri akışını ve uzun vadeli mimariyi kurar.', 'Defines component boundaries, data flow, and long-term architecture.'),
            pair: entry('Alternatifleri birlikte tartışan ve adım adım ilerleyen eş programcı gibi davranır.', 'Works as a pair-programming partner who discusses alternatives.'),
            security: entry('Kodun saldırı yüzeyini ve istismar edilebilir zayıflıklarını önceliklendirir.', 'Prioritizes the attack surface and exploitable weaknesses.')
        },
        depths: {
            temel: entry('Yalnızca ana yaklaşımı, kritik adımları ve sonucu verir.', 'Gives only the core approach, critical steps, and result.'),
            orta: entry('Ana mantığı ve önemli tasarım kararlarını dengeli ayrıntıyla açıklar.', 'Explains main logic and design decisions at balanced depth.'),
            derin: entry('Edge case, alternatif ve gerekçeleri örneklerle inceler.', 'Examines edge cases, alternatives, and rationale with examples.'),
            kapsamli: entry('Riskleri, test stratejisini ve tüm uygulanabilir alternatifleri kapsar.', 'Covers risks, test strategy, and all relevant alternatives.')
        },
        formats: {
            explained: entry('Kod bloklarının yanında kararları ve önemli satırları açıklar.', 'Explains decisions and key lines alongside code blocks.'),
            full: entry('Eksiksiz, çalıştırılabilir dosya veya çözüm üretir.', 'Produces complete, runnable file or solution content.'),
            diff: entry('Değişiklikleri inceleme dostu unified diff biçiminde gösterir.', 'Shows changes in review-friendly unified diff format.'),
            stepwise: entry('Uygulamayı adımlara böler ve her adımın nedenini açıklar.', 'Breaks implementation into steps and explains why each matters.')
        }
    },
    decision: {
        levels: {
            tip2: entry('Geri alınabilir kararlar için hızlı ve düşük maliyetli değerlendirme yapar.', 'Evaluates reversible decisions quickly and at low cost.'),
            tip1: entry('Uzun vadeli ve zor geri alınan stratejik yatırımları inceler.', 'Examines strategic investments that are difficult to reverse.'),
            kriz: entry('Zaman baskısı altındaki kriz ve acil müdahale kararlarını yapılandırır.', 'Structures crisis and emergency decisions under time pressure.'),
            kariyer: entry('Kariyer ve yaşam kararlarını değerler, riskler ve seçeneklerle karşılaştırır.', 'Compares career and life decisions through values, risks, and options.')
        },
        modes: {
            premortem: entry('Kararın başarısız olduğunu varsayarak riskleri önceden görünür kılar.', 'Surfaces risks by assuming the decision has already failed.'),
            rasyonel: entry('Beklenen değer, olasılık ve kanıt üzerinden analitik karşılaştırma yapar.', 'Compares options analytically using probability, evidence, and expected value.'),
            ikincicil: entry('İlk kararın ikinci ve üçüncü derece sonuçlarını haritalar.', 'Maps second- and third-order consequences of the first decision.'),
            sokratik: entry('Varsayımları sorgulayan sorularla kararın kalitesini test eder.', 'Tests decision quality through assumption-challenging questions.')
        },
        depths: {
            temel: entry('Karar için gerekli birkaç kritik ölçütü ve sonucu özetler.', 'Summarizes the few critical criteria and the decision.'),
            orta: entry('Seçenekleri, kanıtları ve temel ödünleşimleri dengeler.', 'Balances options, evidence, and core tradeoffs.'),
            derin: entry('Bağımlılıkları, riskleri ve uzun vadeli etkileri ayrıntılandırır.', 'Details dependencies, risks, and long-term effects.'),
            kapsamli: entry('Uç durumları, geri dönüş planlarını ve felaket senaryolarını kapsar.', 'Covers edge cases, reversibility plans, and failure scenarios.')
        },
        formats: {
            matris2x2: entry('Seçenekleri etki ve belirsizlik eksenlerinde hızlıca karşılaştırır.', 'Compares options across impact and uncertainty axes.'),
            evtablo: entry('Olasılık ve sonuçları beklenen değer tablosuna dönüştürür.', 'Turns probabilities and outcomes into an expected-value table.'),
            tradeoffs: entry('Her seçeneğin artılarını, eksilerini ve vazgeçişlerini açıklar.', 'Explains pros, cons, and concessions for each option.'),
            agac: entry('Koşullu yolları ve olası sonuçları karar ağacıyla gösterir.', 'Shows conditional paths and outcomes as a decision tree.')
        }
    },
    academic: {
        levels: {
            tez: entry('Tez veya makale iskeleti için araştırma sorusu ve bölüm akışını kurar.', 'Builds the research question and section flow for a thesis or paper.'),
            hakem: entry('Hakem yanıtlarını ve revizyon gerekçelerini yapılandırır.', 'Structures reviewer responses and revision rationales.'),
            metodoloji: entry('Yöntem, örneklem ve ölçüm tasarımını denetler.', 'Audits method, sampling, and measurement design.'),
            tarama: entry('Literatür taramasını kavram, teori ve kanıt kümelerine ayırır.', 'Organizes literature review into concepts, theories, and evidence clusters.')
        },
        modes: {
            reviewer2: entry('Çalışmayı sert bir hakem gibi metodolojik zayıflıklar açısından sınar.', 'Stress-tests the work for methodological weaknesses like a strict reviewer.'),
            ampirik: entry('Ölçülebilir kanıt, veri kalitesi ve istatistiksel geçerliliğe odaklanır.', 'Focuses on measurable evidence, data quality, and statistical validity.'),
            teorisyen: entry('Farklı teorileri birleştirerek kavramsal bir çerçeve kurar.', 'Builds a conceptual frame by synthesizing competing theories.')
        },
        depths: {
            lisans: entry('Lisans ve yüksek lisans düzeyinde açık, izlenebilir akademik akış sağlar.', 'Provides a clear, traceable undergraduate or MSc-level flow.'),
            doktora: entry('Doktora düzeyinde yöntem, sınırlılık ve özgün katkıyı derinleştirir.', 'Deepens method, limitations, and original contribution at PhD level.'),
            journal: entry('Q1 hakemli dergi standardında rigor ve yayın uygunluğu arar.', 'Targets Q1 peer-reviewed journal rigor and publication fit.')
        },
        formats: {
            apa: entry('APA/IEEE uyumlu akademik metin ve atıf iskeleti üretir.', 'Produces an APA/IEEE-aligned academic structure and citation frame.'),
            hakemmatris: entry('Hakem yorumlarını yanıt, kanıt ve değişiklik matrisiyle eşler.', 'Maps reviewer comments to responses, evidence, and changes.'),
            kunye: entry('DOI, kaynak ve künye bilgilerini düzenli bir iskelete yerleştirir.', 'Places DOI, source, and citation metadata into a structured frame.')
        }
    },
    philosophy: {
        levels: {
            iklem: entry('Etik ikilemi farklı değerler ve sonuçlar üzerinden çözümler.', 'Analyzes an ethical dilemma through values and consequences.'),
            epistemik: entry('Bilginin kaynağını, sınırlarını ve gerekçelendirmesini sorgular.', 'Questions the source, limits, and justification of knowledge.'),
            deney: entry('Düşünce deneyini varsayımları görünür kılacak şekilde kurar.', 'Builds a thought experiment that exposes assumptions.'),
            mantik: entry('Argümandaki safsataları ve çıkarım hatalarını tespit eder.', 'Detects fallacies and inference errors in an argument.')
        },
        modes: {
            sokratik: entry('Kavramsal netliği yönlendirici sorularla ilerletir.', 'Advances conceptual clarity through guiding questions.'),
            stoaci: entry('Kontrol alanı, erdem ve ölçülülük üzerinden düşünür.', 'Reasons through control, virtue, and moderation.'),
            pozitivist: entry('İddiaları gözlem, kanıt ve doğrulanabilirlik açısından sınar.', 'Tests claims for observation, evidence, and verifiability.'),
            varoluscu: entry('Özgürlük, anlam, sorumluluk ve seçim gerilimlerini inceler.', 'Examines tensions among freedom, meaning, responsibility, and choice.')
        },
        depths: {
            temel: entry('Fikri günlük dil ve temel örneklerle anlaşılır kılar.', 'Makes the idea accessible through plain language and examples.'),
            orta: entry('Argümanları, karşı görüşleri ve kavramsal ayrımları dengeler.', 'Balances arguments, counterviews, and conceptual distinctions.'),
            derin: entry('Birincil metinleri, tarihsel bağlamı ve yorum farklarını işler.', 'Works through primary texts, historical context, and interpretive differences.')
        },
        formats: {
            diyalog: entry('Felsefi sorgulamayı soru-cevap ve karşılıklı diyalog halinde sunar.', 'Presents philosophical inquiry as a question-and-answer dialogue.'),
            oncul: entry('Öncülleri ve sonuçları formal, izlenebilir bir argüman yapısına koyar.', 'Places premises and conclusions into a traceable argument structure.'),
            matris: entry('Teorileri değer, varsayım ve sonuç eksenlerinde karşılaştırır.', 'Compares theories across values, assumptions, and consequences.')
        }
    },
    problemsolving: {
        levels: {
            triz: entry('Çelişki ve kaynakları TRIZ prensipleriyle analiz eder.', 'Analyzes contradictions and resources with TRIZ principles.'),
            scamper: entry('Mevcut çözümü SCAMPER dönüşümleriyle yeni fikirlere açar.', 'Expands an existing solution through SCAMPER transformations.'),
            hats: entry('Problemi altı düşünme şapkası perspektifiyle dengeler.', 'Balances the problem through the six thinking hats.'),
            whys5: entry('Belirtiyi beş neden zinciriyle kök nedene kadar izler.', 'Traces a symptom to root cause through five whys.')
        },
        modes: {
            radikal: entry('Varsayımları kırarak yüksek etkili yeni çözüm alanları arar.', 'Breaks assumptions to find high-impact solution spaces.'),
            mimar: entry('Problemi sistem, bileşen ve kısıtlar olarak yapılandırır.', 'Structures the problem as a system of components and constraints.'),
            yanal: entry('Doğrusal olmayan bağlantılar ve beklenmedik benzetmeler kurar.', 'Creates non-linear connections and unexpected analogies.'),
            yikici: entry('Mevcut pazar veya çözüm paradigmasını bilinçli şekilde zorlar.', 'Deliberately challenges the existing solution paradigm.')
        },
        depths: {
            temel: entry('Sorunu ve ilk birkaç çözüm yönünü hızlıca çerçeveler.', 'Frames the problem and first solution directions quickly.'),
            orta: entry('Ana çözüm yollarını ve uygulanabilirlik ölçütlerini karşılaştırır.', 'Compares main solution paths and feasibility criteria.'),
            derin: entry('Kısıtları, yan etkileri ve başarısızlık noktalarını inceler.', 'Examines constraints, side effects, and failure points.'),
            kapsamli: entry('Sistemik etkileri, uygulama planını ve alternatif senaryoları kapsar.', 'Covers systemic effects, implementation plan, and alternatives.')
        },
        formats: {
            scampertablo: entry('SCAMPER operatörlerini fikir üretim tablosu halinde sunar.', 'Presents SCAMPER operators as an ideation table.'),
            trizmatris: entry('Çelişkiyi TRIZ ilke ve parametreleriyle eşleştirir.', 'Maps the contradiction to TRIZ principles and parameters.'),
            hatscikti: entry('Altı şapka perspektiflerinden birleşik karar raporu üretir.', 'Produces a unified decision report from six hat perspectives.'),
            balikkilcigi: entry('Nedenleri balık kılçığı diyagramı hiyerarşisinde toplar.', 'Groups causes into a fishbone diagram hierarchy.')
        }
    },
    agentarch: {
        levels: {
            system: entry('Genel amaçlı system prompt ve davranış talimatı kurar.', 'Builds a general system prompt and behavior contract.'),
            customgpt: entry('Custom GPT benzeri persona, kapsam ve talimat paketini tanımlar.', 'Defines a Custom GPT-style persona, scope, and instruction pack.'),
            agentcot: entry('Agent CoT pipeline için adım, kontrol ve yönlendirme sözleşmesi kurar.', 'Defines step, control, and routing contracts for an agent CoT pipeline.')
        },
        modes: {
            guardrail: entry('Kısıtları, güvenlik sınırlarını ve reddetme koşullarını öne çıkarır.', 'Prioritizes constraints, safety boundaries, and refusal conditions.'),
            cot: entry('Ara adımları, planlamayı ve doğrulama geçişlerini düzenler.', 'Structures intermediate steps, planning, and verification passes.'),
            fewshot: entry('Örnekler üzerinden beklenen girdi-çıktı davranışını öğretir.', 'Teaches expected input-output behavior through examples.')
        },
        depths: {
            standart: entry('Dengeli bir system prompt sözleşmesi oluşturur.', 'Creates a balanced system prompt contract.'),
            zerohallucination: entry('Kaynak, belirsizlik ve doğrulama kurallarını maksimum sıkılıkta uygular.', 'Applies strict source, uncertainty, and verification rules.'),
            askeri: entry('Talimat hiyerarşisini ve sapma toleransını katı biçimde sınırlar.', 'Strictly limits instruction hierarchy and deviation tolerance.')
        },
        formats: {
            xml: entry('Talimatları okunabilir XML benzeri bloklarla yapılandırır.', 'Structures instructions in readable XML-like blocks.'),
            systemjson: entry('System prompt alanlarını makine tarafından okunabilir JSON’a koyar.', 'Places system prompt fields into machine-readable JSON.'),
            template: entry('Değişkenleri sonradan enjekte edilebilen bir şablon üretir.', 'Produces a template with injectable variables.')
        }
    },
    cyber: {
        levels: {
            stride: entry('Sistemi STRIDE tehdit kategorileriyle modellemeye odaklanır.', 'Models the system through STRIDE threat categories.'),
            owasp: entry('OWASP Top 10 risklerini ve uygulama güvenliği açıklarını tarar.', 'Audits OWASP Top 10 risks and application weaknesses.'),
            redteam: entry('Saldırgan bakışıyla istismar yollarını ve saldırı zincirini araştırır.', 'Investigates exploit paths and attack chains from an attacker view.'),
            zerotrust: entry('Güven sınırlarını ve her erişimin doğrulanmasını tasarlar.', 'Designs trust boundaries and verification for every access.')
        },
        modes: {
            red: entry('Saldırı yüzeyini ve uygulanabilir istismar senaryolarını arar.', 'Looks for attack surface and practical exploit scenarios.'),
            blue: entry('Savunma, izleme, tespit ve dayanıklılık kontrollerini kurar.', 'Builds defense, monitoring, detection, and resilience controls.'),
            auditor: entry('Uyum, kanıt ve denetim izi üzerinden güvenlik açığını değerlendirir.', 'Assesses security through compliance, evidence, and audit trails.')
        },
        depths: {
            yuzey: entry('Hızlı yüzey taramasıyla yüksek seviyeli riskleri çıkarır.', 'Extracts high-level risks through a quick surface scan.'),
            standart: entry('Riskleri, kontrolleri ve uygulanabilir düzeltmeleri dengeler.', 'Balances risks, controls, and actionable remediation.'),
            derin: entry('PoC, istismar zinciri ve teknik kök neden seviyesine iner.', 'Goes down to PoC, exploit chain, and technical root cause.')
        },
        formats: {
            stridematris: entry('Tehditleri STRIDE kategorileri ve varlıklarla matrise koyar.', 'Maps threats to a matrix of STRIDE categories and assets.'),
            owaspenvanter: entry('Zafiyetleri OWASP bulgusu, etki ve düzeltme kaydıyla sunar.', 'Presents findings with OWASP category, impact, and remediation.'),
            pentestsenaryo: entry('Saldırı adımlarını, önkoşulları ve savunma sinyallerini senaryolaştırır.', 'Scenarios attack steps, prerequisites, and defensive signals.')
        }
    },
    blog: {
        levels: {
            kisa: entry('Kısa, hızlı tüketilen ve tek bir mesajı öne çıkaran yazı üretir.', 'Produces a short article focused on one message.'),
            editoryal: entry('Daha geniş bağlam, argüman ve editoryal akış kurar.', 'Builds broader context, argument, and editorial flow.'),
            arastirma: entry('Derin araştırma ve güçlü kanıt zinciri gerektiren yazıyı hedefler.', 'Targets writing that needs deep research and strong evidence.')
        },
        modes: {
            polemik: entry('Karşı görüşleri sert ama adil biçimde sınayan eleştirel ses kullanır.', 'Uses a critical voice that tests opposing views fairly.'),
            aciklayici: entry('Kavramları açık, erişilebilir ve öğretici bir editoryal tonda anlatır.', 'Explains concepts in a clear, accessible editorial tone.'),
            deneme: entry('Fikirleri kişisel, düşünsel ve daha serbest bir deneme sesiyle işler.', 'Works through ideas in a reflective essay voice.')
        },
        depths: {
            ampirik: entry('Meta-analiz, veri ve DOI gibi ölçülebilir kanıtlara dayanır.', 'Relies on measurable evidence such as data and DOI sources.'),
            teorik: entry('Birincil metinleri, teorileri ve kavramsal argümanları öne çıkarır.', 'Prioritizes primary texts, theories, and conceptual arguments.'),
            hibrit: entry('Ampirik kanıtı teorik çerçeveyle birleştirir.', 'Combines empirical evidence with theoretical framing.')
        },
        formats: {
            writingnotes: entry('Yazara yönelik yapı, kanıt ve editoryal karar notları üretir.', 'Produces structure, evidence, and editorial decision notes.'),
            steelman: entry('Karşı tarafın en güçlü tezini kurup adil biçimde karşılaştırır.', 'Builds the strongest opposing case for fair comparison.'),
            triyaj: entry('Kaynakları güvenilirlik, önem ve kullanılabilirlik açısından sınıflandırır.', 'Classifies sources by credibility, importance, and usability.')
        }
    },
    image: {
        levels: {
            midjourney: entry('Midjourney v6 sözdizimi ve stil ağırlıklarıyla görsel tarifler.', 'Targets Midjourney v6 syntax and style weighting.'),
            flux: entry('Flux.1 Dev için ayrıntılı konu, ışık ve kompozisyon girdisi kurar.', 'Builds detailed subject, lighting, and composition input for Flux.1 Dev.'),
            dalle3: entry('DALL-E 3 için doğal dilde sahne ve niyet tarifini optimize eder.', 'Optimizes natural-language scene and intent descriptions for DALL-E 3.'),
            sdxl: entry('Stable Diffusion XL için prompt ve üretim parametrelerini yapılandırır.', 'Structures prompt and generation parameters for Stable Diffusion XL.')
        },
        modes: {
            fotogercekci: entry('Kamera, lens, ışık ve materyal diliyle gerçekçi görünüm kurar.', 'Builds realism through camera, lens, light, and material language.'),
            yagliboya: entry('Fırça, doku, renk ve sanat tarihi referanslarıyla resimsel stil kurar.', 'Builds a painterly style through brush, texture, color, and art references.'),
            octane: entry('3D render, materyal, kamera ve fiziksel ışık parametrelerini öne çıkarır.', 'Prioritizes 3D render, material, camera, and physical light parameters.'),
            minimalist: entry('Az öğe, net geometri ve kontrollü renk paletiyle sadeleştirir.', 'Simplifies through few elements, clear geometry, and controlled palette.')
        },
        depths: {
            temel: entry('Ana özne, kompozisyon ve temel görsel dili belirler.', 'Defines subject, composition, and core visual language.'),
            orta: entry('Işık, doku ve çevre atmosferini dengeli ayrıntıyla ekler.', 'Adds lighting, texture, and environment at balanced detail.'),
            ultra: entry('İnce materyal, mikro doku ve yüksek çözünürlük ayrıntılarını zorlar.', 'Pushes fine material, micro-texture, and high-resolution detail.')
        },
        formats: {
            '16-9': entry('Geniş ekran, yatay kompozisyon ve sinematik kadraj için uygundur.', 'Fits widescreen, horizontal composition, and cinematic framing.'),
            '1-1': entry('Kare sosyal medya ve katalog kompozisyonları için düzenler.', 'Arranges a square composition for social and catalog use.'),
            '9-16': entry('Dikey mobil ekran, story ve poster kadrajını hedefler.', 'Targets vertical mobile, story, and poster framing.')
        }
    },
    language: {
        levels: {
            lokalizasyon: entry('Metni hedef kültür, bölge ve kullanım bağlamına uyarlar.', 'Adapts text to target culture, region, and context.'),
            cefrc2: entry('Metni B2’den C2’ye daha doğal, güçlü ve incelikli bir üsluba taşır.', 'Elevates text from B2 to a more nuanced C2 style.'),
            sokratikdil: entry('Dil öğrenimini soru, geri bildirim ve aktif üretimle destekler.', 'Supports language learning through questions, feedback, and active production.')
        },
        modes: {
            kurumsal: entry('Resmi, net ve kurum içi/kurumlar arası iletişime uygun ton kullanır.', 'Uses a formal tone for internal and external business communication.'),
            edebi: entry('Metafor, ritim ve anlatım zenginliği olan edebi bir ses kurar.', 'Builds a literary voice with metaphor, rhythm, and expressive richness.'),
            samimi: entry('Günlük, doğal ve ana dil konuşuruna yakın ifade kullanır.', 'Uses a casual, natural, native-like expression.')
        },
        depths: {
            dilbilgisi: entry('Öncelikle dilbilgisi, yazım ve temel cümle doğruluğunu düzeltir.', 'Prioritizes grammar, spelling, and basic sentence correctness.'),
            parlatma: entry('Doğru metni daha akıcı, tutarlı ve etkili hale getirir.', 'Makes correct text more fluent, coherent, and effective.'),
            kulturel: entry('İma, nezaket, deyim ve kültürel nüansları hedef dile uyarlar.', 'Adapts implication, politeness, idioms, and cultural nuance.')
        },
        formats: {
            yanyana: entry('Kaynak ve hedef metni yan yana karşılaştırmalı verir.', 'Shows source and target text side by side.'),
            aciklama: entry('Hataları, nedenlerini ve düzeltmelerini açıklama tablosunda sunar.', 'Presents errors, reasons, and corrections in an explanation table.'),
            rephrase: entry('Aynı niyet için farklı ton ve ifade alternatifleri üretir.', 'Produces alternative phrasings and tones for the same intent.')
        }
    },
    edudesign: {
        levels: {
            mufredat: entry('Ders hedeflerini, kazanımları ve haftalık müfredat akışını kurar.', 'Builds learning goals, outcomes, and curriculum flow.'),
            rubric: entry('Öğrenme çıktıları için ölçülebilir puanlama kriterleri tanımlar.', 'Defines measurable scoring criteria for learning outcomes.'),
            active: entry('Hatırlama ve tekrar yoluyla aktif öğrenme soruları oluşturur.', 'Creates active-recall and retrieval practice questions.'),
            ders: entry('Tek bir dersin süre, etkinlik ve değerlendirme akışını planlar.', 'Plans the timing, activities, and assessment of one lesson.')
        },
        modes: {
            bloom: entry('Hedefleri Bloom bilişsel basamaklarıyla hizalar.', 'Aligns objectives with Bloom cognitive levels.'),
            flipped: entry('Ders öncesi hazırlık ve sınıf içi uygulamayı ayırır.', 'Separates pre-class preparation from in-class practice.'),
            gamified: entry('Puan, rozet, seviye ve senaryo ile motivasyonu artırır.', 'Uses points, badges, levels, and scenarios to increase motivation.')
        },
        depths: {
            atolye: entry('Tek oturumda uygulanabilecek yoğun ve pratik bir etkinlik tasarlar.', 'Designs an intensive activity for a single session.'),
            modul: entry('Bir haftalık öğrenme modülünü hedef, etkinlik ve ölçmeyle kurar.', 'Builds a one-week module with goals, activities, and assessment.'),
            bootcamp: entry('Birden fazla haftayı kapsayan tam öğrenme programı oluşturur.', 'Creates a full multi-week learning program.')
        },
        formats: {
            hafta: entry('Haftalık hedefleri, dersleri ve teslimleri tablo halinde planlar.', 'Plans weekly goals, lessons, and deliverables in a table.'),
            rubricmatris: entry('Performans kriterlerini seviyeler ve puanlarla matrise koyar.', 'Maps performance criteria to levels and scores.'),
            bloomsoru: entry('Bloom basamaklarına hizalı soru ve cevap seti üretir.', 'Produces question and answer sets aligned to Bloom levels.')
        }
    },
    business: {
        levels: {
            validation: entry('Problem, müşteri ve çözüm uyumunu test eden erken aşama çalışması yapar.', 'Tests problem, customer, and solution fit at an early stage.'),
            scale: entry('Büyüme kanalları, operasyon ve ölçeklenebilirlik üzerine odaklanır.', 'Focuses on growth channels, operations, and scalability.'),
            kriz: entry('Kriz, pivot ve dönüşüm seçeneklerini riskleriyle birlikte inceler.', 'Examines crisis, pivot, and transformation options with risks.'),
            pitch: entry('Yatırımcıya anlatılabilir tez, metrik ve sunum akışı kurar.', 'Builds an investor-ready thesis, metrics, and pitch flow.')
        },
        modes: {
            vc: entry('Pazar büyüklüğü, risk ve yatırım geri dönüşü perspektifi kullanır.', 'Uses a market, risk, and investment-return perspective.'),
            ops: entry('Süreç, kapasite, maliyet ve operasyonel uygulanabilirliği tasarlar.', 'Designs process, capacity, cost, and operational feasibility.'),
            growth: entry('Kullanıcı edinimi, aktivasyon ve büyüme deneylerini önceliklendirir.', 'Prioritizes acquisition, activation, and growth experiments.')
        },
        depths: {
            temel: entry('İş fikrini ve kritik varsayımları hızlı bir özetle çerçeveler.', 'Frames the business idea and key assumptions in a quick summary.'),
            standart: entry('Pazar, müşteri ve rekabeti dengeli bir strateji analiziyle inceler.', 'Analyzes market, customer, and competition at balanced depth.'),
            derin: entry('Unit economics, pre-mortem ve riskleri ayrıntılı biçimde hesaplar.', 'Details unit economics, pre-mortem, and business risks.')
        },
        formats: {
            pitchdeck: entry('Yatırımcı sunumu için slayt başlıkları ve anlatı akışı kurar.', 'Builds slide titles and narrative flow for an investor pitch.'),
            swot: entry('İç ve dış faktörleri SWOT/PESTEL karar matrisiyle karşılaştırır.', 'Compares internal and external factors through SWOT/PESTEL.'),
            uniteconomics: entry('Gelir, maliyet, CAC, LTV ve marj ilişkilerini hesaplar.', 'Calculates revenue, cost, CAC, LTV, and margin relationships.')
        }
    },
    wellness: {
        levels: {
            antrenman: entry('Antrenman hedefi, hareket seçimi ve ilerleme iskeleti kurar.', 'Builds workout goals, exercise selection, and progression.'),
            sirkadiyen: entry('Uyku, ışık, kafein ve ritim düzenini optimize eder.', 'Optimizes sleep, light, caffeine, and circadian rhythm.'),
            beslenme: entry('Makro, öğün ve beslenme stratejisini hedefe uyarlar.', 'Adapts macro, meal, and nutrition strategy to the goal.'),
            sakatlik: entry('Kısıtları ve sakatlık risklerini dikkate alan güvenli plan kurar.', 'Builds a safe plan around constraints and injury risk.')
        },
        modes: {
            biohacker: entry('Ölçüm, deney ve performans optimizasyonu odaklı koçluk yapar.', 'Coaches through measurement, experiments, and performance optimization.'),
            fizyoterapist: entry('Hareket kalitesi, yük yönetimi ve güvenli adaptasyonu öne çıkarır.', 'Prioritizes movement quality, load management, and safe adaptation.'),
            habit: entry('Küçük davranışlar, tetikleyiciler ve sürdürülebilir rutinler tasarlar.', 'Designs small behaviors, triggers, and sustainable routines.')
        },
        depths: {
            temel: entry('Uygulanabilir birkaç alışkanlık ve temel rutin önerir.', 'Suggests a few practical habits and a basic routine.'),
            haftalik: entry('Haftalık planı yük, toparlanma ve yaşam kısıtlarıyla dengeler.', 'Balances a weekly plan with load, recovery, and life constraints.'),
            biohacking: entry('İleri ölçüm, deney tasarımı ve kişisel optimizasyonu kapsar.', 'Covers advanced measurement, experiments, and personal optimization.')
        },
        formats: {
            haftaliktablo: entry('Günlük antrenman, öğün ve alışkanlıkları haftalık tabloda düzenler.', 'Organizes daily workouts, meals, and habits in a weekly table.'),
            sirkadiyencart: entry('Işık, uyku, kafein ve öğün zamanlarını gün çizelgesine koyar.', 'Places light, sleep, caffeine, and meal timing on a daily timeline.'),
            makrohesap: entry('Makro hedeflerini öğün ve kalori dağılımıyla gösterir.', 'Shows macro targets with meal and calorie distribution.')
        }
    },
    travel: {
        levels: {
            yerel: entry('Turistik ana akıştan uzak, yerel deneyimleri ve gizli noktaları seçer.', 'Selects local experiences away from the tourist mainstream.'),
            lojistik: entry('Ulaşım, aktarma, bavul ve zaman maliyetini optimize eder.', 'Optimizes transit, transfers, luggage, and time cost.'),
            gorgu: entry('Yerel kültür, görgü, güvenlik ve davranış kurallarını açıklar.', 'Explains local culture, etiquette, safety, and behavior.'),
            butce: entry('Konaklama, ulaşım, yemek ve etkinlik bütçesini dengeler.', 'Balances lodging, transit, food, and activity budget.')
        },
        modes: {
            gurme: entry('Yerel mutfak, pazar ve özgün yemek deneyimlerini öne çıkarır.', 'Prioritizes local cuisine, markets, and authentic food experiences.'),
            kulturtarih: entry('Tarih, sanat, mimari ve yerel hikâyeler etrafında rota kurar.', 'Builds routes around history, art, architecture, and local stories.'),
            slow: entry('Daha az durak, daha uzun konaklama ve sakin tempo seçer.', 'Chooses fewer stops, longer stays, and a slower pace.')
        },
        depths: {
            yavas: entry('Dinlenmeye ve az sayıda anlamlı deneyime alan açar.', 'Leaves room for rest and a few meaningful experiences.'),
            dengeli: entry('Günlük keşif, dinlenme ve ulaşımı dengeli bir tempoda planlar.', 'Balances discovery, rest, and transit at a steady pace.'),
            yogun: entry('Her günü çok sayıda durak ve etkinlikle yoğun biçimde doldurur.', 'Fills each day with many stops and activities.')
        },
        formats: {
            saatlik: entry('Günü saat saat rota, süre ve ulaşım adımlarıyla planlar.', 'Plans the day hour by hour with duration and transit steps.'),
            bolge: entry('Şehri bölgelere ayırarak aynı çevredeki durakları kümeler.', 'Groups stops by district to reduce unnecessary movement.'),
            butcetablo: entry('Ulaşım ve harcamaları kalem kalem bütçe tablosunda gösterir.', 'Shows transit and spending line by line in a budget table.')
        }
    }
};

const PARAMETER_FALLBACKS = {
    tr: {
        levels: 'Bu seçenek domainin hedef veya işlem seviyesini belirler.',
        modes: 'Bu seçenek domainin çalışma yaklaşımını belirler.',
        depths: 'Bu seçenek çıktının kapsam ve ayrıntı düzeyini belirler.',
        formats: 'Bu seçenek çıktının sunum biçimini belirler.'
    },
    en: {
        levels: 'This option sets the domain target or operating level.',
        modes: 'This option sets the domain working approach.',
        depths: 'This option sets the scope and detail level of the output.',
        formats: 'This option sets the presentation format of the output.'
    }
};

export function getParameterDescription(domainId, lang, field, optionId, fallback = '') {
    const description = PARAMETER_DESCRIPTIONS[domainId]?.[field]?.[optionId];
    return description?.[lang] || description?.tr || fallback || PARAMETER_FALLBACKS[lang]?.[field] || PARAMETER_FALLBACKS.tr[field];
}
