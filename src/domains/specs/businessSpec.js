export const businessSpec = {
  "id": "business",
  "route": "business",
  "defaultConfig": {
    "seviye": "validation",
    "mod": "vc",
    "derinlik": "orta",
    "format": "pitch-deck"
  },
  "icon": "briefcase",
  "category": "life",
  "layers": [
    "validation",
    "market",
    "unit-economics",
    "pitch",
    "risk"
  ],
  "ui": {
    "tr": {
      "title": "İş, Girişimcilik & Strateji",
      "subtitle": "İş fikirlerini doğrula, unit economics hesabı yap ve kriz yönet.",
      "topicLabel": "İş Fikri / Ürün / Stratejik Hamle",
      "topicPlaceholder": "B2B SaaS için yapay zeka müşteri temsilcisi...",
      "domainLabel": "Hedef Pazar & Müşteri Segmenti",
      "domainPlaceholder": "ABD E-Ticaret Şirketleri...",
      "levelLabel": "Strateji Aşaması",
      "modeLabel": "Stratejist Personası",
      "depthLabel": "Analiz Derinliği",
      "formatLabel": "Strateji Çıktısı",
      "presetGroups": {
        "strategy": "Strateji & Büyüme",
        "finance": "Finans & Birim Maliyet",
        "pitch": "Yatırım & Sunum"
      }
    },
    "en": {
      "title": "Business, Startup & Strategy Engine",
      "subtitle": "Validate business ideas, audit unit economics, and navigate crisis.",
      "topicLabel": "Business Idea / Strategy Move",
      "topicPlaceholder": "AI customer support agent for B2B SaaS...",
      "domainLabel": "Target Market & Customer",
      "domainPlaceholder": "US E-Commerce Companies...",
      "levelLabel": "Strategy Stage",
      "modeLabel": "Strategist Persona",
      "depthLabel": "Analysis Depth",
      "formatLabel": "Strategy Output",
      "presetGroups": {
        "strategy": "Strategy & Growth",
        "finance": "Finance & Unit Economics",
        "pitch": "Pitch & Investment"
      }
    }
  },
  "optionSets": {
    "levels": {
      "validation": {
        "tr": "Fikir Doğrulama (Validation)",
        "en": "Idea Validation"
      },
      "scale": {
        "tr": "Büyüme & Ölçeklenme",
        "en": "Growth & Scale"
      },
      "kriz": {
        "tr": "Kriz & Dönüşüm",
        "en": "Crisis & Pivot"
      },
      "pitch": {
        "tr": "Yatırımcı Sunumu",
        "en": "Investor Pitching"
      }
    },
    "modes": {
      "vc": {
        "tr": "Risk Sermayedar (VC)",
        "en": "Venture Capitalist (VC)"
      },
      "ops": {
        "tr": "Operasyonel Mimar",
        "en": "Operations Architect"
      },
      "growth": {
        "tr": "Büyüme (Growth) Mühendisi",
        "en": "Growth Engineer"
      }
    },
    "depths": {
      "temel": {
        "tr": "Hızlı Özet",
        "en": "Quick Summary"
      },
      "standart": {
        "tr": "Standart Pazar Analizi",
        "en": "Standard Market Analysis"
      },
      "derin": {
        "tr": "Derin Unit Economics & Pre-Mortem",
        "en": "Deep Unit Economics & Pre-Mortem"
      }
    },
    "formats": {
      "pitchdeck": {
        "tr": "Pitch Deck İskeleti",
        "en": "Pitch Deck Framework"
      },
      "swot": {
        "tr": "SWOT & PESTEL Matrisi",
        "en": "SWOT & PESTEL Matrix"
      },
      "uniteconomics": {
        "tr": "Unit Economics Hesabı",
        "en": "Unit Economics Spec"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "topicHeader": "İŞ FİKRİ / GİRİŞİM",
      "levelHeader": "STRATEJİ AŞAMASI",
      "modeHeader": "STRATEJİST PERSONASI",
      "depthHeader": "ANALİZ DERİNLİĞİ",
      "formatHeader": "STRATEJİ ÇIKTISI"
    },
    "en": {
      "topicHeader": "BUSINESS IDEA",
      "levelHeader": "STRATEGY STAGE",
      "modeHeader": "STRATEGIST PERSONA",
      "depthHeader": "ANALYSIS DEPTH",
      "formatHeader": "STRATEGY OUTPUT"
    }
  },
  "presets": {
    "premortem-business": {
      "id": "premortem-business",
      "group": "strategy",
      "name": {
        "tr": "📊 İş Modeli Pre-Mortem Audit",
        "en": "📊 Business Model Pre-Mortem"
      },
      "desc": {
        "tr": "Girişimin batma risklerini önden tespit eder.",
        "en": "Identifies core startup failure risks in advance."
      },
      "forceModules": [
        "val-problem-solution-fit",
        "val-problem-solution-fit"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for premortem-business."
      ]
    },
    "unit-econ-calc": {
      "id": "unit-econ-calc",
      "group": "finance",
      "name": {
        "tr": "💰 Unit Economics Hesaplayıcı",
        "en": "💰 Unit Economics Calculator"
      },
      "desc": {
        "tr": "CAC, LTV ve brüt kâr marjı dengesini denetler.",
        "en": "Audits CAC, LTV, and payback period balance."
      },
      "forceModules": [
        "val-customer-interview-script",
        "val-value-prop-canvas"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for unit-econ-calc."
      ]
    },
    "pitch-deck-builder": {
      "id": "pitch-deck-builder",
      "group": "pitch",
      "name": {
        "tr": "🚀 Investor Pitch Deck İskeleti",
        "en": "🚀 Investor Pitch Deck Outline"
      },
      "desc": {
        "tr": "10 slaytlık VC sunum kurgusu.",
        "en": "Structures 10-slide VC pitch narrative."
      },
      "forceModules": [
        "val-smoke-test-landing-page",
        "mkt-tam-sam-som-calc"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for pitch-deck-builder."
      ]
    },
    "swot-pestel": {
      "id": "swot-pestel",
      "group": "strategy",
      "name": {
        "tr": "🧭 SWOT & PESTEL Strateji Matrisi",
        "en": "🧭 SWOT & PESTEL Matrix"
      },
      "desc": {
        "tr": "İç ve dış ortam risklerini gruplar.",
        "en": "Maps internal strengths and macro external threats."
      },
      "forceModules": [
        "val-value-prop-canvas",
        "mkt-competitor-matrix-positioning"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for swot-pestel."
      ]
    },
    "go-to-market": {
      "id": "go-to-market",
      "group": "strategy",
      "name": {
        "tr": "🎯 Go-To-Market (GTM) Planı",
        "en": "🎯 Go-To-Market (GTM) Plan"
      },
      "desc": {
        "tr": "İlk 1000 müşteriye ulaşma stratejisi.",
        "en": "Outlines acquisition channels for initial traction."
      },
      "forceModules": [
        "val-jobs-to-be-done-jtbd",
        "eco-cac-ltv-ratio-check"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for go-to-market."
      ]
    },
    "pricing-tiers": {
      "id": "pricing-tiers",
      "group": "finance",
      "name": {
        "tr": "🏷️ Fiyatlandırma & Paket Modeli",
        "en": "🏷️ Pricing Tiers & Value Metric"
      },
      "desc": {
        "tr": "Freemium, Pro ve Enterprise fiyat yapısı.",
        "en": "Designs value-metric based subscription tiers."
      },
      "forceModules": [
        "val-pivot-or-persevere-audit",
        "eco-gross-margin-breakdown"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for pricing-tiers."
      ]
    },
    "competitor-moat": {
      "id": "competitor-moat",
      "group": "strategy",
      "name": {
        "tr": "🏰 Rekabet & Hendek (Moat) Analizi",
        "en": "🏰 Competitor Moat Audit"
      },
      "desc": {
        "tr": "Sürdürülebilir rekabet avantajlarını tespit eder.",
        "en": "Identifies network effects and switching costs."
      },
      "forceModules": [
        "mkt-tam-sam-som-calc",
        "pit-10-slide-pitch-deck"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for competitor-moat."
      ]
    },
    "customer-persona": {
      "id": "customer-persona",
      "group": "pitch",
      "name": {
        "tr": "👤 Müşteri Segment Persona Haritası",
        "en": "👤 Customer Persona Profile"
      },
      "desc": {
        "tr": "İdeal müşteri profilinin acı noktalarını çizer.",
        "en": "Maps ideal customer profile pain points."
      },
      "forceModules": [
        "mkt-porters-five-forces",
        "pit-traction-milestone-roadmap"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for customer-persona."
      ]
    },
    "churn-retention": {
      "id": "churn-retention",
      "group": "finance",
      "name": {
        "tr": "🔄 Churn & Retention Playbook",
        "en": "🔄 Churn & Retention Playbook"
      },
      "desc": {
        "tr": "Müşteri terk oranını düşürme önlemleri.",
        "en": "Establishes triggers to prevent customer churn."
      },
      "forceModules": [
        "mkt-pestel-macro-analysis",
        "rsk-business-pre-mortem"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for churn-retention."
      ]
    },
    "mvp-scoping": {
      "id": "mvp-scoping",
      "group": "strategy",
      "name": {
        "tr": "⚡ MVP Özellik Önceliklendirme",
        "en": "⚡ MVP Feature Scoping"
      },
      "desc": {
        "tr": "İlk versiyonda olması şart temel özellikleri seçer.",
        "en": "Scopes absolute minimum viable product features."
      },
      "forceModules": [
        "mkt-competitor-matrix-positioning",
        "rsk-single-point-failure"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for mvp-scoping."
      ]
    },
    "crisis-pr": {
      "id": "crisis-pr",
      "group": "pitch",
      "name": {
        "tr": "🚨 Kriz İletişim & PR Stratejisi",
        "en": "🚨 Crisis PR Protocol"
      },
      "desc": {
        "tr": "Ürün hatası anında müşteri bilgilendirmesi.",
        "en": "Drafts transparent response for public outages."
      },
      "forceModules": [
        "mkt-blue-ocean-strategy",
        "val-problem-solution-fit"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for crisis-pr."
      ]
    },
    "okr-kpi-framework": {
      "id": "okr-kpi-framework",
      "group": "strategy",
      "name": {
        "tr": "🎯 OKR & KPI Hedef Hiyerarşisi",
        "en": "🎯 OKR & KPI Target Spec"
      },
      "desc": {
        "tr": "Çeyreklik hedefleri ölçülebilir KPI'lara bağlar.",
        "en": "Translates quarterly vision into key results."
      },
      "forceModules": [
        "mkt-icp-persona-definition",
        "val-value-prop-canvas"
      ],
      "override": {
        "derinlik": "orta",
        "format": "pitchdeck",
        "mod": "vc"
      },
      "injectRules": [
        "Apply business domain rule for okr-kpi-framework."
      ]
    }
  }
};
