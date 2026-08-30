export const languageSpec = {
  "id": "language",
  "route": "language",
  "defaultConfig": {
    "seviye": "lokalizasyon",
    "mod": "native",
    "derinlik": "parlatma",
    "format": "metin"
  },
  "icon": "globe",
  "category": "creation",
  "layers": [
    "localization",
    "register",
    "fluency",
    "idioms",
    "pedagogy"
  ],
  "ui": {
    "tr": {
      "title": "Dil, Çeviri & Nüans Koçu",
      "subtitle": "Kültürel lokalizasyon ve CEFR C2 seviyesinde üslup yükseltme.",
      "topicLabel": "Çevrilecek / Düzenlenecek Metin",
      "topicPlaceholder": "İş teklifi e-postası veya makale paragrafı...",
      "domainLabel": "Hedef Dil & Kültür/Sektör",
      "domainPlaceholder": "İngilizce (ABD), Kurumsal Finans Sektörü...",
      "levelLabel": "İşlem Tipi",
      "modeLabel": "Tone & Register",
      "depthLabel": "Nüans Seviyesi",
      "formatLabel": "Çeviri Formatı",
      "presetGroups": {
        "fluency": "Akıcılık & Ton",
        "localization": "Lokalizasyon & Kültür",
        "pedagogy": "Eğitim & Düzeltme"
      },
      "categories": {
        "localization": "Kültürel Adaptasyon",
        "register": "Ton & Dil Düzeyi",
        "fluency": "Akıcılık & Deyimler",
        "idioms": "Deyim & Kalıplar",
        "pedagogy": "Dilbilgisi & Açıklama"
      },
      "modulesTitle": "Modüller (Module Blocks)",
      "presetsTitle": "Uzman Hazır Şablonları (System Presets)",
      "paramsTitle": "Parametreler"
    },
    "en": {
      "title": "Language, Translation & Nuance Coach",
      "subtitle": "Cultural localization and CEFR C2 tone elevation.",
      "topicLabel": "Text to Translate / Refine",
      "topicPlaceholder": "Business proposal email or essay paragraph...",
      "domainLabel": "Target Language & Context",
      "domainPlaceholder": "English (US), Corporate Finance...",
      "levelLabel": "Task Type",
      "modeLabel": "Tone & Register",
      "depthLabel": "Nuance Depth",
      "formatLabel": "Output Format",
      "presetGroups": {
        "fluency": "Fluency & Tone",
        "localization": "Localization & Culture",
        "pedagogy": "Pedagogy & Correction"
      },
      "categories": {
        "localization": "Cultural Localization",
        "register": "Tone & Register",
        "fluency": "Fluency & Idioms",
        "idioms": "Expressions & Phrasing",
        "pedagogy": "Grammar & Pedagogy"
      },
      "modulesTitle": "Module Blocks",
      "presetsTitle": "System Presets",
      "paramsTitle": "Parameters"
    }
  },
  "optionSets": {
    "levels": {
      "lokalizasyon": {
        "tr": "Kültürel Lokalizasyon",
        "en": "Cultural Localization"
      },
      "cefrc2": {
        "tr": "CEFR B2->C2 Üslup Yükseltme",
        "en": "CEFR B2->C2 Elevation"
      },
      "sokratikdil": {
        "tr": "Sokratik Dil Koçu",
        "en": "Socratic Language Coach"
      }
    },
    "modes": {
      "kurumsal": {
        "tr": "Resmi Kurumsal",
        "en": "Formal Corporate"
      },
      "edebi": {
        "tr": "Edebi & Şiirsel",
        "en": "Literary & Poetic"
      },
      "samimi": {
        "tr": "Samimi & Günlük",
        "en": "Casual & Native"
      }
    },
    "depths": {
      "dilbilgisi": {
        "tr": "Dil Bilgisi Düzeltme",
        "en": "Grammar Correction"
      },
      "parlatma": {
        "tr": "Üslup Parlatma",
        "en": "Stylistic Polish"
      },
      "kulturel": {
        "tr": "Nüans & Kültürel Adaptasyon",
        "en": "Full Nuance & Cultural"
      }
    },
    "formats": {
      "yanyana": {
        "tr": "Yan Yana Çeviri",
        "en": "Side-by-Side Comparison"
      },
      "aciklama": {
        "tr": "Hata & Açıklama Tablosu",
        "en": "Error & Explanation Table"
      },
      "rephrase": {
        "tr": "Rephrase Seçenekleri",
        "en": "Rephrase Alternatives"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "mod": {
        "kurumsal": "Sen profesyonel bir kurumsal çevirmen ve dil danışmanısın. İş dünyası jargonu, resmi ton ve diplomatik nezaket kurallarını kusursuz uygularsın.",
        "edebi": "Sen edebi çevirmen ve metin yazarısın. Metnin ritmini, duygusunu, mecazlarını ve yazarın özgün sesini hedef dile aktarırsın.",
        "samimi": "Sen modern yerelleştirme (localization) uzmanısın. Günlük konuşma dili, sokak argosu, mizah ve popüler kültür kodlarını doğal biçimde uyarlarsın."
      },
      "derinlik": {
        "dilbilgisi": "Sadece dilbilgisi düzeltmesi ve doğrudan çeviri sun.",
        "parlatma": "Akıcılık, ton kalibrasyonu ve alternatif ifadelerle metni parlat.",
        "kulturel": "Kültürel adaptasyon, deyimsel eşleşmeler ve detaylı çeviri notlarıyla zenginleştir."
      },
      "format": {
        "yanyana": "Kaynak ve hedef metni yan yana karşılaştırmalı formatta sun.",
        "aciklama": "Çeviriyi, tercih edilen sözcüklerin açıklamalarıyla birlikte ver.",
        "rephrase": "Farklı ton ve kayıtlar için 3 alternatif yeniden ifade formatında hazırla."
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
      "goalTemplate": "\"{{KONU}}\" metnini kültürel nüanslar, dilbilgisi hassasiyeti ve hedef kitle tonuna kusursuz uyum sağlayacak şekilde lokalize ve optimize etmek.",
      "constraintsBase": [
        "Birebir (kelime kelimesine) çeviri yapma; anlamsal ve kültürel eşdeğerliği sağla.",
        "Deyimlerin ve mecazların hedef dildeki doğal karşılıklarını kullan.",
        "Ton tutarlılığını (resmi/samimi) metin boyunca koru."
      ],
      "monologueText": "İÇ SES MODU: Çeviriyi tamamlamadan önce (<thinking> tagleri içinde) sahte eşdeğerleri (false friends) ve kültürel anlam kaymalarını denetle."
    },
    "en": {
      "mod": {
        "kurumsal": "You are a corporate localization consultant. You enforce professional tone, executive register, and domain terminology.",
        "edebi": "You are a literary translator. You preserve authorial voice, lyrical cadence, metaphorical resonance, and subtext.",
        "samimi": "You are a contemporary localization specialist. You adapt idioms, colloquialisms, humor, and cultural references authentically."
      },
      "derinlik": {
        "dilbilgisi": "Focus on precise grammatical correction and faithful translation.",
        "parlatma": "Calibrate register, enhance sentence flow, and provide refined phrasings.",
        "kulturel": "Provide comprehensive localization with cultural rationale and annotated translation notes."
      },
      "format": {
        "yanyana": "Present as side-by-side source and target comparative layout.",
        "aciklama": "Provide the translated text accompanied by lexical and stylistic footnotes.",
        "rephrase": "Offer 3 distinct tonal rephrasing variants (formal, concise, expressive)."
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
      "goalTemplate": "To localize, refine, and optimize the text \"{{KONU}}\" with cultural nuances, grammatical precision, and tone calibration.",
      "constraintsBase": [
        "Never translate verbatim; prioritize semantic, stylistic, and cultural equivalence.",
        "Map idioms and figures of speech to native target expressions.",
        "Maintain uncompromising register consistency throughout."
      ],
      "monologueText": "INTERNAL MONOLOGUE: Before finalizing translation, audit false cognates and subtle tonal drift in <thinking> tags."
    }
  },
  "presets": {
    "cefr-c2-polish": {
      "id": "cefr-c2-polish",
      "group": "fluency",
      "name": {
        "tr": "CEFR C2 Üslup Yükseltme",
        "en": "CEFR C2 Executive Polish"
      },
      "desc": {
        "tr": "Metni doğal C2 seviyesine yükseltir.",
        "en": "Elevates text to native executive C2 register."
      },
      "forceModules": [
        "loc-cultural-adaptation"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for cefr-c2-polish."
      ]
    },
    "cultural-loc": {
      "id": "cultural-loc",
      "group": "localization",
      "name": {
        "tr": "Kültürel Lokalizasyon",
        "en": "Cultural Localization"
      },
      "desc": {
        "tr": "Deyimleri hedef kültürün diline adapte eder.",
        "en": "Adapts idioms naturally for target culture."
      },
      "forceModules": [
        "loc-idiomatic-transcreation",
        "loc-brand-voice-translation"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for cultural-loc."
      ]
    },
    "socratic-tutor": {
      "id": "socratic-tutor",
      "group": "pedagogy",
      "name": {
        "tr": "Sokratik Dil Koçu",
        "en": "Socratic Language Tutor"
      },
      "desc": {
        "tr": "Hataları soru sorarak kendinizin düzeltmesini sağlar.",
        "en": "Guides language learning through questions."
      },
      "forceModules": [
        "loc-dialect-regional-register",
        "reg-academic-c2-elevation"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for socratic-tutor."
      ]
    },
    "idiom-translator": {
      "id": "idiom-translator",
      "group": "localization",
      "name": {
        "tr": "Deyim & Mecaz Dönüştürücü",
        "en": "Idiom & Metaphor Adapter"
      },
      "desc": {
        "tr": "Birebir çeviri yerine yerel deyim karşılığını bulur.",
        "en": "Replaces literal translation with native idioms."
      },
      "forceModules": [
        "loc-brand-voice-translation",
        "reg-executive-brevity-style"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for idiom-translator."
      ]
    },
    "formal-email": {
      "id": "formal-email",
      "group": "fluency",
      "name": {
        "tr": "Resmi Kurumsal E-Posta",
        "en": "Formal Corporate Email"
      },
      "desc": {
        "tr": "İş dünyasına uygun saygılı ve net e-posta tonu.",
        "en": "Drafts professional business correspondence."
      },
      "forceModules": [
        "loc-taboo-etiquette-check",
        "flu-rhythm-cadence-refiner"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for formal-email."
      ]
    },
    "literary-prose": {
      "id": "literary-prose",
      "group": "fluency",
      "name": {
        "tr": "Edebi Düzyazı & Ton",
        "en": "Literary Prose & Tone"
      },
      "desc": {
        "tr": "Zengin kelime dağarcığı ve şiirsel akış.",
        "en": "Refines narrative prose with poetic cadence."
      },
      "forceModules": [
        "loc-slang-colloquial-fit",
        "flu-transitional-cohesion"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for literary-prose."
      ]
    },
    "academic-translator": {
      "id": "academic-translator",
      "group": "fluency",
      "name": {
        "tr": "Akademik Makale Çevirisi",
        "en": "Academic Paper Translation"
      },
      "desc": {
        "tr": "Dergi standartlarında bilimsel terminoloji.",
        "en": "Translates text into formal academic jargon."
      },
      "forceModules": [
        "reg-academic-c2-elevation",
        "idm-phrasal-verb-harmonizer"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for academic-translator."
      ]
    },
    "slang-native": {
      "id": "slang-native",
      "group": "localization",
      "name": {
        "tr": "Günlük Yerel Konuşma Dili",
        "en": "Casual Native Slang"
      },
      "desc": {
        "tr": "Sokakta konuşulan doğal günlük ifade kalıpları.",
        "en": "Converts formal phrasing into natural street talk."
      },
      "forceModules": [
        "reg-diplomatic-courtesy-tone",
        "idm-proverbial-equivalents"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for slang-native."
      ]
    },
    "pitch-speech": {
      "id": "pitch-speech",
      "group": "fluency",
      "name": {
        "tr": "Sunum & Konuşma Metni",
        "en": "Presentation Speech Polish"
      },
      "desc": {
        "tr": "Vurgulu ve akılda kalıcı konuşma üslubu.",
        "en": "Polishes spoken delivery for keynote speeches."
      },
      "forceModules": [
        "reg-casual-conversational-flow",
        "ped-socratic-tutor-mode"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for pitch-speech."
      ]
    },
    "grammar-fixer": {
      "id": "grammar-fixer",
      "group": "pedagogy",
      "name": {
        "tr": "Dil Bilgisi & İmla Düzeltme",
        "en": "Grammar & Punctuation Fixer"
      },
      "desc": {
        "tr": "Anlamı değiştirmeden imla hatalarını giderir.",
        "en": "Fixes grammatical mistakes silently."
      },
      "forceModules": [
        "reg-executive-brevity-style",
        "ped-contextual-cloze-creator"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for grammar-fixer."
      ]
    },
    "dubbing-sync": {
      "id": "dubbing-sync",
      "group": "localization",
      "name": {
        "tr": "Altyazı & Dublaj Uyumlaması",
        "en": "Subtitle & Dubbing Sync"
      },
      "desc": {
        "tr": "Ekran süresine ve dudak payına uygun metin.",
        "en": "Adapts text length to fit video timestamp bounds."
      },
      "forceModules": [
        "reg-archaic-literary-voice",
        "loc-cultural-adaptation"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for dubbing-sync."
      ]
    },
    "bilingual-side": {
      "id": "bilingual-side",
      "group": "pedagogy",
      "name": {
        "tr": "Yan Yana Çift Dilli Metin",
        "en": "Side-by-Side Dual Language"
      },
      "desc": {
        "tr": "Orijinal ve çeviriyi paralel sütunlarda sunar.",
        "en": "Presents source and target text in parallel."
      },
      "forceModules": [
        "reg-jargon-simplifier",
        "loc-brand-voice-translation"
      ],
      "override": {
        "derinlik": "parlatma",
        "format": "yanyana",
        "mod": "kurumsal"
      },
      "injectRules": [
        "Apply language domain rule for bilingual-side."
      ]
    }
  }
};
