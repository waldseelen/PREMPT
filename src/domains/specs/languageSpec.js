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
      }
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
      }
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
      "topicHeader": "KAYNAK METİN",
      "levelHeader": "İŞLEM TİPİ",
      "modeHeader": "TONE & REGISTER",
      "depthHeader": "NÜANS SEVİYESİ",
      "formatHeader": "ÇEVİRİ FORMATI"
    },
    "en": {
      "topicHeader": "SOURCE TEXT",
      "levelHeader": "TASK TYPE",
      "modeHeader": "TONE & REGISTER",
      "depthHeader": "NUANCE DEPTH",
      "formatHeader": "OUTPUT FORMAT"
    }
  },
  "presets": {
    "cefr-c2-polish": {
      "id": "cefr-c2-polish",
      "group": "fluency",
      "name": {
        "tr": "💎 CEFR C2 Üslup Yükseltme",
        "en": "💎 CEFR C2 Executive Polish"
      },
      "desc": {
        "tr": "Metni doğal C2 seviyesine yükseltir.",
        "en": "Elevates text to native executive C2 register."
      },
      "forceModules": [
        "loc-cultural-adaptation",
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
        "tr": "🌍 Kültürel Lokalizasyon",
        "en": "🌍 Cultural Localization"
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
        "tr": "🗣️ Sokratik Dil Koçu",
        "en": "🗣️ Socratic Language Tutor"
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
        "tr": "🎭 Deyim & Mecaz Dönüştürücü",
        "en": "🎭 Idiom & Metaphor Adapter"
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
        "tr": "💼 Resmi Kurumsal E-Posta",
        "en": "💼 Formal Corporate Email"
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
        "tr": "📖 Edebi Düzyazı & Ton",
        "en": "📖 Literary Prose & Tone"
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
        "tr": "📚 Akademik Makale Çevirisi",
        "en": "📚 Academic Paper Translation"
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
        "tr": "💬 Günlük Yerel Konuşma Dili",
        "en": "💬 Casual Native Slang"
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
        "tr": "🎙️ Sunum & Konuşma Metni",
        "en": "🎙️ Presentation Speech Polish"
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
        "tr": "✏️ Dil Bilgisi & İmla Düzeltme",
        "en": "✏️ Grammar & Punctuation Fixer"
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
        "tr": "🎬 Altyazı & Dublaj Uyumlaması",
        "en": "🎬 Subtitle & Dubbing Sync"
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
        "tr": "🔀 Yan Yana Çift Dilli Metin",
        "en": "🔀 Side-by-Side Dual Language"
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
