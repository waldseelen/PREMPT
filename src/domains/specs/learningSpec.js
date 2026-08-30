export const learningSpec = {
  "id": "learning",
  "route": "learning",
  "defaultConfig": {
    "seviye": "otomatik",
    "mod": "karma",
    "derinlik": "orta",
    "format": "markdown"
  },
  "icon": "graduation-cap",
  "category": "mind",
  "layers": [
    "foundation",
    "mechanism",
    "context",
    "boundaries",
    "application"
  ],
  "ui": {
    "tr": {
      "title": "Parametrik Öğrenme Mühendisi",
      "subtitle": "Herhangi bir konuyu sistematik olarak parçala, analiz et, öğren.",
      "topicLabel": "Öğrenilecek Konu",
      "topicPlaceholder": "Transformer Mimarisi, Otonom Sinir Sistemi...",
      "domainLabel": "Hakim Olduğunuz Alan",
      "domainPlaceholder": "Yazılım Mühendisliği, Elektrik Devreleri...",
      "levelLabel": "Bilgi Seviyesi",
      "modeLabel": "Öğrenme Modu",
      "depthLabel": "Analiz Derinliği",
      "formatLabel": "Çıktı Formatı",
      "presetGroups": {
        "understand": "Anla",
        "analyze": "Analiz Et",
        "apply": "Uygula"
      },
      "categories": {
        "foundation": "Temel Kavramlar",
        "mechanism": "Çalışma Mekanizması",
        "context": "Bağlam ve İlişkiler",
        "boundaries": "Sınırlar ve Kısıtlar",
        "application": "Pratik Uygulama"
      },
      "modulesTitle": "Modüller (Module Blocks)",
      "presetsTitle": "Uzman Hazır Şablonları (System Presets)",
      "paramsTitle": "Parametreler"
    },
    "en": {
      "title": "Parametric Learning Engineer",
      "subtitle": "Systematically deconstruct, analyze, and learn any topic.",
      "topicLabel": "Topic to Learn",
      "topicPlaceholder": "Transformer Architecture, Autonomic Nervous System...",
      "domainLabel": "Your Domain Expertise",
      "domainPlaceholder": "Software Engineering, Electrical Circuits...",
      "levelLabel": "Knowledge Level",
      "modeLabel": "Learning Mode",
      "depthLabel": "Analysis Depth",
      "formatLabel": "Output Format",
      "presetGroups": {
        "understand": "Understand",
        "analyze": "Analyze",
        "apply": "Apply"
      },
      "categories": {
        "foundation": "Foundations",
        "mechanism": "Mechanism",
        "context": "Context & Relations",
        "boundaries": "Boundaries & Constraints",
        "application": "Practical Application"
      },
      "modulesTitle": "Module Blocks",
      "presetsTitle": "System Presets",
      "paramsTitle": "Parameters"
    }
  },
  "optionSets": {
    "levels": {
      "otomatik": {
        "tr": "Otomatik (AI)",
        "en": "Auto (AI)"
      },
      "acemi": {
        "tr": "Acemi (5 Yaş)",
        "en": "Novice (ELI5)"
      },
      "orta": {
        "tr": "Orta",
        "en": "Intermediate"
      },
      "ileri": {
        "tr": "İleri",
        "en": "Advanced"
      },
      "uzman": {
        "tr": "Uzman",
        "en": "Expert"
      }
    },
    "modes": {
      "karma": {
        "tr": "Karma (Adaptif)",
        "en": "Mixed (Adaptive)"
      },
      "feynman": {
        "tr": "Feynman",
        "en": "Feynman"
      },
      "sistem": {
        "tr": "Sistem Analizi",
        "en": "System Analysis"
      },
      "sokratik": {
        "tr": "Sokratik",
        "en": "Socratic"
      },
      "ilkeler": {
        "tr": "Birinci İlkeler",
        "en": "First Principles"
      }
    },
    "depths": {
      "temel": {
        "tr": "Temel Özet",
        "en": "Basic Summary"
      },
      "orta": {
        "tr": "Orta",
        "en": "Moderate"
      },
      "derin": {
        "tr": "Derinlemesine",
        "en": "Deep"
      },
      "kapsamli": {
        "tr": "Kapsamlı (Exhaustive)",
        "en": "Comprehensive"
      }
    },
    "formats": {
      "markdown": {
        "tr": "Markdown",
        "en": "Markdown"
      },
      "tablo": {
        "tr": "Tablo Ağırlıklı",
        "en": "Table Heavy"
      },
      "ders": {
        "tr": "Ders Notu",
        "en": "Lecture Notes"
      },
      "quiz": {
        "tr": "Quiz Destekli",
        "en": "With Quizzes"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "mod": {
        "karma": "Sen öğretmen, sistem analisti, birinci ilkeler düşünürü ve bilgi mimarının birleşimisin.",
        "feynman": "Sen dünyanın en iyi öğretmenisin. Karmaşık konuları 10 yaşındaki birine anlatır gibi basitleştirirsin.",
        "sistem": "Sen bir sistem analisti ve bilgi mimarısısın. Karmaşık konseptleri yapısal olarak çözümler, bileşenler arası ilişkileri haritalarsın.",
        "sokratik": "Sen Sokratik yöntemi kullanan bir düşünce koçusun. Doğrudan cevap vermek yerine beni kendi kendime cevaba ulaştırırsın.",
        "ilkeler": "Sen bir birinci ilkeler düşünürüsün. Her varsayımı sorgular, kavramları temel bileşenlerine indirger ve oradan inşa edersin."
      },
      "derinlik": {
        "temel": "Açıklamaları kısa ve öz tut. Her bölüm birkaç cümlede özetlenebilmeli.",
        "orta": "Makul düzeyde detay ver. Önemli nüansları atlama ama gereksiz tekrara girme.",
        "derin": "Kapsamlı ve detaylı analiz yap. Her noktayı örneklerle destekle.",
        "kapsamli": "Mümkün olan en derin ve kapsamlı analizi yap. Hiçbir detayı atlama."
      },
      "format": {
        "markdown": "Hiyerarşik Markdown formatı kullan. Başlıklar, alt başlıklar ve madde işaretleri ile yapılandır.",
        "tablo": "Mümkün olduğunca tablo formatı kullan. Karşılaştırmaları tablolarda göster.",
        "ders": "Ders notu formatında yaz. Öğrenci dostu ve tekrar edilebilir bir yapıda.",
        "quiz": "Her bölümün sonunda mini quiz soruları ekle. Öğrenmeyi pekiştirici formatta yaz."
      },
      "labels": {
        "role": "[ROLE]",
        "goal": "[GOAL]",
        "context": "[CONTEXT]",
        "modules": "[ACTIVE MODULES]",
        "instructions": "[INSTRUCTIONS]",
        "format": "[OUTPUT FORMAT]",
        "constraints": "[CONSTRAINTS / SAFETY]"
      },
      "contextLabels": {
        "domain": "Alan:",
        "level": "Seviye:",
        "depthRequirement": "Derinlik Gereksinimi:"
      },
      "goalTemplate": "\"{{KONU}}\" konusunu yüzeysel değil, mekanik ve nedensel seviyede kavramak.",
      "constraintsBase": [
        "Doğrudan konuya gir, gereksiz giriş cümlesi yazma.",
        "Teknik terim kullanırsan hemen sade dille açıkla.",
        "Belirsiz yer varsa bunu açıkça belirt."
      ],
      "monologueText": "İÇ SES MODU: Her adımı yanıtlamadan önce konunun sınır koşullarını (<thinking> tagleri içerisinde) en az 3 farklı açıdan değerlendir. Ancak nihai kullanıcı çıktısına bu iç sesi yansıtma."
    },
    "en": {
      "mod": {
        "karma": "You are a combination of a teacher, systems analyst, first-principles thinker, and information architect.",
        "feynman": "You are the best teacher in the world. You simplify complex topics as if explaining to a 10-year-old.",
        "sistem": "You are a systems analyst. You structurally deconstruct complex concepts and map relationships.",
        "sokratik": "You are a Socratic thought coach. Instead of giving direct answers, you ask the right questions to lead me there.",
        "ilkeler": "You are a first-principles thinker. You question every assumption and reduce concepts to fundamentals."
      },
      "derinlik": {
        "temel": "Keep explanations brief and concise. Summarize each section in a few sentences.",
        "orta": "Provide a moderate level of detail. Explain important nuances without repetition.",
        "derin": "Perform a comprehensive and detailed analysis. Support every point with examples.",
        "kapsamli": "Perform the most exhaustive analysis possible. Leave no detail untouched."
      },
      "format": {
        "markdown": "Use hierarchical Markdown formatting. Structure with headings and bullet points.",
        "tablo": "Use tables wherever possible. Display comparisons in tabular formats.",
        "ders": "Write in a lecture-note format. Student-friendly and easy to review.",
        "quiz": "Add mini-quiz questions at the end of each section to reinforce learning."
      },
      "labels": {
        "role": "[ROLE]",
        "goal": "[GOAL]",
        "context": "[CONTEXT]",
        "modules": "[ACTIVE MODULES]",
        "instructions": "[INSTRUCTIONS]",
        "format": "[OUTPUT FORMAT]",
        "constraints": "[CONSTRAINTS / SAFETY]"
      },
      "contextLabels": {
        "domain": "Domain:",
        "level": "Level:",
        "depthRequirement": "Depth Requirement:"
      },
      "goalTemplate": "To understand the topic \"{{KONU}}\" not superficially, but at a mechanical and causal level.",
      "constraintsBase": [
        "Get straight to the point, no unnecessary introductions.",
        "Explain technical jargon simply.",
        "Explicitly state any uncertainties."
      ],
      "monologueText": "INTERNAL MONOLOGUE: Before answering each step, evaluate boundary conditions using your internal monologue (<thinking> tags) from at least 3 perspectives. Do not show this internal monologue in the final output."
    }
  },
  "presets": {
    "hizli": {
      "id": "hizli",
      "group": "understand",
      "name": {
        "tr": "Hızlı Özet",
        "en": "Fast Summary"
      },
      "desc": {
        "tr": "Konunun özünü hızlıca, gereksiz detaya girmeden özetler.",
        "en": "Summarizes key essence quickly."
      },
      "forceModules": [
        "eli5"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for hizli."
      ]
    },
    "temeller": {
      "id": "temeller",
      "group": "understand",
      "name": {
        "tr": "Temeller",
        "en": "Foundations"
      },
      "desc": {
        "tr": "Birinci ilkelerden sağlam bir temel kurar.",
        "en": "Establishes core foundations from first principles."
      },
      "forceModules": [
        "kalibrasyon",
        "sirasi"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for temeller."
      ]
    },
    "pratik": {
      "id": "pratik",
      "group": "understand",
      "name": {
        "tr": "Pratik Uygulama",
        "en": "Practical Application"
      },
      "desc": {
        "tr": "80/20 kuralıyla gerçek dünya benzetmelerine odaklanır.",
        "en": "Applies 80/20 rule to practical real-world scenarios."
      },
      "forceModules": [
        "onkosul",
        "nedensellik"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for pratik."
      ]
    },
    "yaratici": {
      "id": "yaratici",
      "group": "understand",
      "name": {
        "tr": "Yaratıcı Sentez",
        "en": "Creative Synthesis"
      },
      "desc": {
        "tr": "Disiplinler arası zihinsel modelleri birleştirir.",
        "en": "Combines cross-disciplinary mental models."
      },
      "forceModules": [
        "sirasi",
        "diagram"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for yaratici."
      ]
    },
    "derin": {
      "id": "derin",
      "group": "analyze",
      "name": {
        "tr": "Derin Analiz",
        "en": "Deep Analysis"
      },
      "desc": {
        "tr": "Konuyu temel ilkelerine kadar söker ve karşıt görüşleri işler.",
        "en": "Deconstructs topic down to first principles and trade-offs."
      },
      "forceModules": [
        "pareto",
        "simulasyon"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for derin."
      ]
    },
    "arastirmaci": {
      "id": "arastirmaci",
      "group": "analyze",
      "name": {
        "tr": "Araştırmacı",
        "en": "Researcher"
      },
      "desc": {
        "tr": "Tarihsel bağlam ve akademik teorilerle sunar.",
        "en": "Presents historical context and scholarly frameworks."
      },
      "forceModules": [
        "ontoloji",
        "kontrast"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for arastirmaci."
      ]
    },
    "hata": {
      "id": "hata",
      "group": "analyze",
      "name": {
        "tr": "Hata Ayıklama",
        "en": "Debug & Edge Cases"
      },
      "desc": {
        "tr": "Tek nokta arızalarını ve nerede çöktüğünü inceler.",
        "en": "Audits single points of failure and edge cases."
      },
      "forceModules": [
        "nedensellik",
        "esleme"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for hata."
      ]
    },
    "karsilastir": {
      "id": "karsilastir",
      "group": "analyze",
      "name": {
        "tr": "Karşılaştır & Karar Ver",
        "en": "Compare & Decide"
      },
      "desc": {
        "tr": "Alternatifleri yapılandırılmış şekilde karşılaştırır.",
        "en": "Compares alternatives systematically with recommendation."
      },
      "forceModules": [
        "mental",
        "yanilgilar"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for karsilastir."
      ]
    },
    "sinav": {
      "id": "sinav",
      "group": "apply",
      "name": {
        "tr": "Sınav Hazırlık",
        "en": "Exam Prep"
      },
      "desc": {
        "tr": "Hatırlama odaklı sorularla sınava hazırlar.",
        "en": "Prepares for exams via active recall questions."
      },
      "forceModules": [
        "mekanizma",
        "kirilma"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for sinav."
      ]
    },
    "muhendis": {
      "id": "muhendis",
      "group": "apply",
      "name": {
        "tr": "Mühendis Yaklaşımı",
        "en": "Engineer Stance"
      },
      "desc": {
        "tr": "Sıfırdan nasıl inşa edileceğini ve mimari kararları anlatır.",
        "en": "Explains architecture decisions and engineering trade-offs."
      },
      "forceModules": [
        "diagram",
        "celiski"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for muhendis."
      ]
    },
    "tam": {
      "id": "tam",
      "group": "apply",
      "name": {
        "tr": "Tam Paket",
        "en": "Full Package"
      },
      "desc": {
        "tr": "Konuyu en kapsamlı şekilde ele alır.",
        "en": "Cover the topic in an exhaustive, all-inclusive manner."
      },
      "forceModules": [
        "insa",
        "uzman"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for tam."
      ]
    },
    "mulakat": {
      "id": "mulakat",
      "group": "apply",
      "name": {
        "tr": "Mülakat Hazırlığı",
        "en": "Interview Drill"
      },
      "desc": {
        "tr": "Sesli anlatabilme becerisi ve mülakat sorularına odaklanır.",
        "en": "Drills technical interview questions and verbal explanations."
      },
      "forceModules": [
        "tersine",
        "meta"
      ],
      "override": {
        "derinlik": "orta",
        "format": "markdown",
        "mod": "karma"
      },
      "injectRules": [
        "Apply learning domain rule for mulakat."
      ]
    }
  }
};
