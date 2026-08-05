export const wellnessSpec = {
  "id": "wellness",
  "route": "wellness",
  "defaultConfig": {
    "seviye": "antrenman",
    "mod": "koc",
    "derinlik": "orta",
    "format": "program"
  },
  "icon": "heart",
  "category": "life",
  "layers": [
    "workout",
    "circadian",
    "nutrition",
    "adaptation",
    "habits"
  ],
  "ui": {
    "tr": {
      "title": "Sağlık, Form & Sirkadiyen Ops",
      "subtitle": "Kişiselleştirilmiş antrenman ve sirkadiyen ritim optimizasyonu.",
      "topicLabel": "Kişisel Form / Sağlık Hedefi",
      "topicPlaceholder": "Kas kütlesi artırma ve uyku kalitesini yükseltme...",
      "domainLabel": "Yaşam Tarzı & Kısıtlar",
      "domainPlaceholder": "Masa başı iş, 3 gün 45dk spor imkanı, bel fıtığı...",
      "levelLabel": "Odak Alanı",
      "modeLabel": "Wellness Personası",
      "depthLabel": "Rutin Derinliği",
      "formatLabel": "Wellness Formatı",
      "presetGroups": {
        "workout": "Spor & Performans",
        "sleep": "Uyku & Sirkadiyen",
        "habits": "Alışkanlık & Beslenme"
      }
    },
    "en": {
      "title": "Wellness, Fitness & Circadian Ops",
      "subtitle": "Personalized workout blueprints and circadian rhythm optimization.",
      "topicLabel": "Fitness / Wellness Goal",
      "topicPlaceholder": "Hypertrophy and sleep quality optimization...",
      "domainLabel": "Lifestyle & Constraints",
      "domainPlaceholder": "Desk job, 3 days 45min gym access, lower back pain...",
      "levelLabel": "Focus Area",
      "modeLabel": "Wellness Persona",
      "depthLabel": "Routine Depth",
      "formatLabel": "Wellness Syntax",
      "presetGroups": {
        "workout": "Fitness & Performance",
        "sleep": "Sleep & Circadian",
        "habits": "Habits & Nutrition"
      }
    }
  },
  "optionSets": {
    "levels": {
      "antrenman": {
        "tr": "Antrenman İskeleti",
        "en": "Workout Blueprint"
      },
      "sirkadiyen": {
        "tr": "Sirkadiyen Ritim & Uyku",
        "en": "Circadian Sleep Reset"
      },
      "beslenme": {
        "tr": "Makro & Beslenme",
        "en": "Nutrition & Macro Strategy"
      },
      "sakatlik": {
        "tr": "Sakatlık Adaptasyonu",
        "en": "Injury Adaptation"
      }
    },
    "modes": {
      "biohacker": {
        "tr": "Biyohacker Koç",
        "en": "Biohacker Coach"
      },
      "fizyoterapist": {
        "tr": "Fizyoterapist",
        "en": "Physical Therapist"
      },
      "habit": {
        "tr": "Alışkanlık Mimarı",
        "en": "Habit Architect"
      }
    },
    "depths": {
      "temel": {
        "tr": "Temel Rutin",
        "en": "Basic Routine"
      },
      "haftalik": {
        "tr": "Standart Haftalık Plan",
        "en": "Standard Weekly Plan"
      },
      "biohacking": {
        "tr": "Derin Biyohacking",
        "en": "Deep Biohacking Spec"
      }
    },
    "formats": {
      "haftaliktablo": {
        "tr": "Haftalık Program Tablosu",
        "en": "Weekly Program Table"
      },
      "sirkadiyencart": {
        "tr": "Sirkadiyen Zaman Çizelgesi",
        "en": "Circadian Timeline"
      },
      "makrohesap": {
        "tr": "Makro Dağılım Hesabı",
        "en": "Macro Distribution Spec"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "topicHeader": "SAĞLIK HEDEFİ",
      "levelHeader": "ODAK ALANI",
      "modeHeader": "WELLNESS PERSONASI",
      "depthHeader": "RUTİN DERİNLİĞİ",
      "formatHeader": "WELLNESS FORMATI"
    },
    "en": {
      "topicHeader": "WELLNESS GOAL",
      "levelHeader": "FOCUS AREA",
      "modeHeader": "WELLNESS PERSONA",
      "depthHeader": "ROUTINE DEPTH",
      "formatHeader": "WELLNESS SYNTAX"
    }
  },
  "presets": {
    "circadian-reset": {
      "id": "circadian-reset",
      "group": "sleep",
      "name": {
        "tr": "🌅 Sirkadiyen Ritim & Uyku Sıfırlama",
        "en": "🌅 Circadian Sleep Reset"
      },
      "desc": {
        "tr": "Işık maruziyeti ve melatonin zamanlamasını optimize eder.",
        "en": "Optimizes light exposure and sleep timing."
      },
      "forceModules": [
        "wrk-progressive-overload-plan",
        "wrk-progressive-overload-plan"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for circadian-reset."
      ]
    },
    "hypertrophy-plan": {
      "id": "hypertrophy-plan",
      "group": "workout",
      "name": {
        "tr": "🏋️ Antrenman & Hipertrofi Programı",
        "en": "🏋️ Workout & Hypertrophy Plan"
      },
      "desc": {
        "tr": "Kas kütlesi artırıcı haftalık antrenman.",
        "en": "Structures weekly progressive overload routines."
      },
      "forceModules": [
        "wrk-rpe-rir-intensity-guide",
        "wrk-zone2-cardio-protocol"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for hypertrophy-plan."
      ]
    },
    "sustainable-habit": {
      "id": "sustainable-habit",
      "group": "habits",
      "name": {
        "tr": "🧘 Sürdürülebilir Alışkanlık Mimarı",
        "en": "🧘 Sustainable Habit Stack"
      },
      "desc": {
        "tr": "Tükenmişlik riski olmayan mikro-alışkanlıklar.",
        "en": "Builds low-friction daily habits."
      },
      "forceModules": [
        "wrk-hypertrophy-split-design",
        "cir-morning-sunlight-anchor"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for sustainable-habit."
      ]
    },
    "macro-nutrition": {
      "id": "macro-nutrition",
      "group": "habits",
      "name": {
        "tr": "🥗 Makro & Beslenme Stratejisi",
        "en": "🥗 Macro Nutrition Strategy"
      },
      "desc": {
        "tr": "Protein, karbonhidrat ve kalori dengesi.",
        "en": "Calculates macro split tailored to activity."
      },
      "forceModules": [
        "wrk-zone2-cardio-protocol",
        "cir-caffeine-half-life-cutoff"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for macro-nutrition."
      ]
    },
    "injury-prevention": {
      "id": "injury-prevention",
      "group": "workout",
      "name": {
        "tr": "🩺 Sakatlık Önleme & Mobilite",
        "en": "🩺 Injury Prevention & Mobility"
      },
      "desc": {
        "tr": "Eklem sağlığı ve esneklik egzersizleri.",
        "en": "Improves joint mobility and fixes muscle imbalances."
      },
      "forceModules": [
        "wrk-mobility-joint-prep",
        "nut-macro-distribution-calculator"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for injury-prevention."
      ]
    },
    "dopamine-detox": {
      "id": "dopamine-detox",
      "group": "habits",
      "name": {
        "tr": "🧠 Dopamin Detoksu & Odaklanma",
        "en": "🧠 Dopamine Detox Protocol"
      },
      "desc": {
        "tr": "Dijital ekran bağımlılığını azaltma adımları.",
        "en": "Resets reward pathways from screen overstimulation."
      },
      "forceModules": [
        "wrk-hiit-tabata-structure",
        "nut-gut-microbiome-fiber-mix"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for dopamine-detox."
      ]
    },
    "stress-cortisol": {
      "id": "stress-cortisol",
      "group": "sleep",
      "name": {
        "tr": "🌿 Stres & Kortizol Yönetimi",
        "en": "🌿 Stress & Cortisol Balance"
      },
      "desc": {
        "tr": "Nefes egzersizleri ve sinir sistemi regülasyonu.",
        "en": "Regulates autonomic nervous system through breathwork."
      },
      "forceModules": [
        "cir-morning-sunlight-anchor",
        "adp-injury-deload-protocol"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for stress-cortisol."
      ]
    },
    "posture-ergonomics": {
      "id": "posture-ergonomics",
      "group": "workout",
      "name": {
        "tr": "🪑 Postür & Masa Başı Ergonomi",
        "en": "🪑 Desk Posture & Ergonomics"
      },
      "desc": {
        "tr": "Boyun ve bel ağrılarını önleyici rutin.",
        "en": "Fixes forward head posture and lower back pain."
      },
      "forceModules": [
        "cir-blue-light-melatonin-prep",
        "adp-active-recovery-session"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for posture-ergonomics."
      ]
    },
    "fasting-protocol": {
      "id": "fasting-protocol",
      "group": "habits",
      "name": {
        "tr": "⏱️ Aralıklı Oruç (Fasting) Protokolü",
        "en": "⏱️ Intermittent Fasting Protocol"
      },
      "desc": {
        "tr": "Otofaji ve insülin duyarlılığı planı.",
        "en": "Schedules 16:8 fasting windows safely."
      },
      "forceModules": [
        "cir-temperature-sleep-cooling",
        "hab-habit-stacking-atomic"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for fasting-protocol."
      ]
    },
    "mindful-meditation": {
      "id": "mindful-meditation",
      "group": "sleep",
      "name": {
        "tr": "🕊️ Zihinsel Dayanıklılık & Nefes",
        "en": "🕊️ Mindful Resilience Drill"
      },
      "desc": {
        "tr": "Zihinsel berraklık ve kaygı düşürme.",
        "en": "Reduces anxiety via box breathing routines."
      },
      "forceModules": [
        "cir-caffeine-half-life-cutoff",
        "hab-relapse-prevention-plan"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for mindful-meditation."
      ]
    },
    "cardio-vo2max": {
      "id": "cardio-vo2max",
      "group": "workout",
      "name": {
        "tr": "🏃 VO2 Max & Kondisyon Planı",
        "en": "🏃 VO2 Max Conditioning"
      },
      "desc": {
        "tr": "Kalp-damar sağlığı için Zone 2 kardiyo.",
        "en": "Builds Zone-2 aerobic base and VO2 max."
      },
      "forceModules": [
        "cir-circadian-meal-timing",
        "wrk-progressive-overload-plan"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for cardio-vo2max."
      ]
    },
    "evening-wind-down": {
      "id": "evening-wind-down",
      "group": "sleep",
      "name": {
        "tr": "🌙 Akşam Uykuya Geçiş Rutini",
        "en": "🌙 Evening Wind-Down Routine"
      },
      "desc": {
        "tr": "Derin REM uykusuna hazırlık rehberi.",
        "en": "Prepares brain for deep restorative REM sleep."
      },
      "forceModules": [
        "cir-jet-lag-shift-resync",
        "wrk-zone2-cardio-protocol"
      ],
      "override": {
        "derinlik": "orta",
        "format": "haftaliktablo",
        "mod": "biohacker"
      },
      "injectRules": [
        "Apply wellness domain rule for evening-wind-down."
      ]
    }
  }
};
