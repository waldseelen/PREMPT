export const decisionSpec = {
  "id": "decision",
  "route": "decision",
  "defaultConfig": {
    "seviye": "tip2",
    "mod": "premortem",
    "derinlik": "orta",
    "format": "matris2x2"
  },
  "icon": "brain",
  "category": "mind",
  "layers": [
    "foundation",
    "analysis",
    "tradeoff",
    "biases",
    "execution"
  ],
  "ui": {
    "tr": {
      "title": "Karar Alma & Risk Mühendisi",
      "subtitle": "Zorlu kararları ve riskleri rasyonel zihinsel modellerle analiz et.",
      "topicLabel": "Analiz Edilecek Karar / Problem",
      "topicPlaceholder": "İşten ayrılıp kendi startup'ımı kurmalı mıyım?",
      "domainLabel": "Kısıtlar & Bütçe/Zaman",
      "domainPlaceholder": "6 aylık birikim var, aile sorumluluğu var...",
      "levelLabel": "Karar Tipi",
      "modeLabel": "Zihinsel Perspektif",
      "depthLabel": "Analiz Derinliği",
      "formatLabel": "Karar Formatı",
      "presetGroups": {
        "framework": "Zihinsel Çerçeve",
        "risk": "Risk & Analiz",
        "execution": "Uygulama & Öncelik"
      },
      "categories": {
        "foundation": "Karar Çerçevesi",
        "analysis": "Seçenek Analizi",
        "tradeoff": "Ödünleşim & Risk",
        "biases": "Bilişsel Yanlılıklar",
        "execution": "Uygulama & Takip"
      },
      "modulesTitle": "Modüller (Module Blocks)",
      "presetsTitle": "Uzman Hazır Şablonları (System Presets)",
      "paramsTitle": "Parametreler"
    },
    "en": {
      "title": "Decision Engine & Risk Architect",
      "subtitle": "Deconstruct complex decisions using rational mental models.",
      "topicLabel": "Decision Problem to Analyze",
      "topicPlaceholder": "Should I quit my job to start a startup?",
      "domainLabel": "Constraints & Budget/Time",
      "domainPlaceholder": "6 months runway, family responsibilities...",
      "levelLabel": "Decision Type",
      "modeLabel": "Mental Framework",
      "depthLabel": "Analysis Depth",
      "formatLabel": "Decision Format",
      "presetGroups": {
        "framework": "Mental Frameworks",
        "risk": "Risk & Tradeoffs",
        "execution": "Execution & Priority"
      },
      "categories": {
        "foundation": "Decision Framing",
        "analysis": "Option Analysis",
        "tradeoff": "Tradeoffs & Risks",
        "biases": "Cognitive Biases",
        "execution": "Execution & Tracking"
      },
      "modulesTitle": "Module Blocks",
      "presetsTitle": "System Presets",
      "paramsTitle": "Parameters"
    }
  },
  "optionSets": {
    "levels": {
      "tip2": {
        "tr": "Geri Döndürülebilir (Tip 2)",
        "en": "Reversible (Type 2)"
      },
      "tip1": {
        "tr": "Stratejik Yatırım (Tip 1)",
        "en": "Strategic Irreversible (Type 1)"
      },
      "kriz": {
        "tr": "Kriz & Acil Müdahale",
        "en": "Crisis & Urgent Response"
      },
      "kariyer": {
        "tr": "Kariyer & Yaşam",
        "en": "Career & Life"
      }
    },
    "modes": {
      "premortem": {
        "tr": "Risk Avcısı (Pre-Mortem)",
        "en": "Risk Auditor (Pre-Mortem)"
      },
      "rasyonel": {
        "tr": "Rasyonel Analist (EV)",
        "en": "Rational Analyst (EV)"
      },
      "ikincicil": {
        "tr": "İkinci Derece Etkiler",
        "en": "Second-Order Thinking"
      },
      "sokratik": {
        "tr": "Şüpheci Sokratik",
        "en": "Socratic Skeptic"
      }
    },
    "depths": {
      "temel": {
        "tr": "Hızlı Sezgi",
        "en": "Quick Intuition"
      },
      "orta": {
        "tr": "Standart Rasyonel",
        "en": "Standard Rational"
      },
      "derin": {
        "tr": "Derin Stratejik",
        "en": "Deep Strategic"
      },
      "kapsamli": {
        "tr": "Uç Durum & Felaket Senaryosu",
        "en": "Exhaustive Disaster Audit"
      }
    },
    "formats": {
      "matris2x2": {
        "tr": "2x2 Karar Matrisi",
        "en": "2x2 Decision Matrix"
      },
      "evtablo": {
        "tr": "Beklenen Değer (EV) Tablosu",
        "en": "Expected Value (EV) Table"
      },
      "tradeoffs": {
        "tr": "Pros-Cons & Tradeoffs",
        "en": "Pros-Cons & Tradeoffs"
      },
      "agac": {
        "tr": "Ağaç Karar Şeması",
        "en": "Decision Tree Spec"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "mod": {
        "premortem": "Sen bir risk ve premortem analistisin. Kararın gelecekte neden başarısız olabileceğini baştan simüle eder ve zayıf noktaları ortaya çıkarırsın.",
        "rasyonel": "Sen rasyonel karar kuramcısı ve stratejik danışmansın. Seçenekleri objektif kriterler, ağırlıklar ve beklenen değerler üzerinden puanlarsın.",
        "ikincicil": "Sen ikinci ve üçüncü derece sonuçları düşünen bir sistem analistisin. Bir kararın yalnızca anlık değil, dolaylı ve uzun vadeli zincirleme etkilerini modelllersin.",
        "sokratik": "Sen kritik düşünme koçusun. Karar vericinin kör noktalarını, gizli varsayımlarını ve duygusal yanlılıklarını yönlendirici sorularla açığa çıkarırsın."
      },
      "derinlik": {
        "temel": "Temel karar matrisini ve ana riskleri özetle.",
        "orta": "Kriterleri puanla, ödünleşimleri ve 2. derece sonuçları dengeli açıkla.",
        "derin": "Kapsamlı senaryo analizi, hassasiyet testleri ve bilişsel yanlılık denetimi yap.",
        "kapsamli": "Uç riskler, geri döndürülebilirlik katsayıları ve detaylı uygulama yol haritası dahil tam analizi sun."
      },
      "format": {
        "matris2x2": "2x2 Karar matrisi ve ağırlıklı puanlama tablosu formatında yapılandır.",
        "evtablo": "Beklenen değer ve olasılık tablosu formatında hazırla.",
        "tradeoffs": "Ödünleşimler ve artı/eksi dengesini maddeler halinde sun.",
        "agac": "Karar ağacı ve dallanan senaryolar formatında yapılandır."
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
      "goalTemplate": "\"{{KONU}}\" kararını tüm boyutları, riskleri, alternatifleri ve ödünleşimleriyle rasyonel olarak değerlendirip net bir aksiyona varmak.",
      "constraintsBase": [
        "Tüm seçeneklerin artı ve eksilerini net ve dürüstçe ortaya koy.",
        "Kararın geri döndürülebilir (Tip 1 vs Tip 2) olup olmadığını mutlaka belirt.",
        "Bilişsel yanlılıklardan arınmış, somut bir eylem önerisiyle sonlandır."
      ],
      "monologueText": "İÇ SES MODU: Karar önerisi oluşturmadan önce (<thinking> tagleri içinde) en olumsuz 3 senaryoyu ve en az 2 alternatif seçeneği simüle et."
    },
    "en": {
      "mod": {
        "premortem": "You are a premortem and risk analyst. You simulate why a decision might fail in the future and expose fatal flaws proactively.",
        "rasyonel": "You are a rational decision theorist and strategic advisor. You score options against objective criteria, weights, and expected values.",
        "ikincicil": "You are a systems thinker focused on second and third-order consequences. You model long-term systemic ripples.",
        "sokratik": "You are a critical thinking coach. You expose blind spots, hidden assumptions, and emotional biases through structured questions."
      },
      "derinlik": {
        "temel": "Summarize the core decision matrix and primary risks.",
        "orta": "Score criteria with balanced explanations of tradeoffs and second-order effects.",
        "derin": "Perform comprehensive scenario analysis, sensitivity checks, and cognitive bias audits.",
        "kapsamli": "Provide an exhaustive evaluation including tail risks, reversibility ratings, and step-by-step execution triggers."
      },
      "format": {
        "matris2x2": "Structure as a 2x2 decision matrix and weighted scoring table.",
        "evtablo": "Format as expected value and probability tables.",
        "tradeoffs": "Present explicit pros/cons tradeoffs and non-negotiables.",
        "agac": "Structure as a decision tree with branching decision nodes."
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
      "goalTemplate": "To rigorously evaluate the decision \"{{KONU}}\" across all dimensions, risks, alternatives, and tradeoffs to arrive at a clear, defensible action.",
      "constraintsBase": [
        "State all pros and cons transparently and objectively.",
        "Explicitly categorize decision reversibility (Type 1 vs Type 2).",
        "Conclude with a clear, bias-resistant recommendation."
      ],
      "monologueText": "INTERNAL MONOLOGUE: Before formulating advice, simulate 3 catastrophic failure modes and at least 2 counter-alternatives in <thinking> tags."
    }
  },
  "presets": {
    "premortem-audit": {
      "id": "premortem-audit",
      "group": "risk",
      "name": {
        "tr": "Pre-Mortem Risk Auditi",
        "en": "Pre-Mortem Audit"
      },
      "desc": {
        "tr": "Kararın gelecekte başarısız olma senaryolarını önden simüle eder.",
        "en": "Simulates failure modes before executing decision."
      },
      "forceModules": [
        "decision-framing"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for premortem-audit."
      ]
    },
    "ev-rational": {
      "id": "ev-rational",
      "group": "framework",
      "name": {
        "tr": "EV (Beklenen Değer) Analizi",
        "en": "EV Rational Analysis"
      },
      "desc": {
        "tr": "Olasılıklar ve finansal riskleri sayısal kıyaslar.",
        "en": "Weighs probabilities and expected payoff value."
      },
      "forceModules": [
        "core-objectives",
        "stakeholder-mapping"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for ev-rational."
      ]
    },
    "second-order": {
      "id": "second-order",
      "group": "risk",
      "name": {
        "tr": "2. Derece Domino Analizi",
        "en": "2nd-Order Domino Effects"
      },
      "desc": {
        "tr": "Kararın 6 ay ve 2 yıl sonraki dolaylı etkilerini haritalandırır.",
        "en": "Traces 2nd and 3rd order downstream consequences."
      },
      "forceModules": [
        "boundary-conditions",
        "second-order-thinking"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for second-order."
      ]
    },
    "triage-fast": {
      "id": "triage-fast",
      "group": "framework",
      "name": {
        "tr": "Hızlı Karar Triyajı",
        "en": "Fast Decision Triage"
      },
      "desc": {
        "tr": "Tip 1 (Geri Dönülemez) vs Tip 2 (Geri Dönülebilir) karar ayırımı.",
        "en": "Separates reversible Type-2 from irreversible Type-1 decisions."
      },
      "forceModules": [
        "stakeholder-mapping",
        "causal-loop-mapping"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for triage-fast."
      ]
    },
    "tradeoff-matrix": {
      "id": "tradeoff-matrix",
      "group": "framework",
      "name": {
        "tr": "Ödünleşim & Pros-Cons Matrisi",
        "en": "Trade-off & Pros-Cons"
      },
      "desc": {
        "tr": "Fırsat maliyetlerini ve alternatif kazanımları tartarcasına dengeler.",
        "en": "Balances opportunity costs and trade-offs."
      },
      "forceModules": [
        "information-audit",
        "opportunity-cost-audit"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for tradeoff-matrix."
      ]
    },
    "bias-hunter": {
      "id": "bias-hunter",
      "group": "risk",
      "name": {
        "tr": "Bilişsel Yanılgı Avcısı",
        "en": "Cognitive Bias Audit"
      },
      "desc": {
        "tr": "Onaylama ve batık maliyet yanılgılarını temizler.",
        "en": "Purges confirmation bias and sunk cost fallacy."
      },
      "forceModules": [
        "reversibility-check",
        "skin-in-the-game"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for bias-hunter."
      ]
    },
    "scenario-planning": {
      "id": "scenario-planning",
      "group": "risk",
      "name": {
        "tr": "Senaryo Planlama (En İyi/Kötü)",
        "en": "Best/Worst Case Scenarios"
      },
      "desc": {
        "tr": "İyimser, kötümser ve nötr senaryoları simüle eder.",
        "en": "Simulates optimistic, realistic, and worst-case outcomes."
      },
      "forceModules": [
        "second-order-thinking",
        "confirmation-bias-strip"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for scenario-planning."
      ]
    },
    "opportunity-cost": {
      "id": "opportunity-cost",
      "group": "framework",
      "name": {
        "tr": "Fırsat Maliyeti Hesabı",
        "en": "Opportunity Cost Spec"
      },
      "desc": {
        "tr": "Seçilmeyen yolun getireceği kayıpları hesaplar.",
        "en": "Calculates foregone value of unchosen alternatives."
      },
      "forceModules": [
        "inversion-method",
        "survivorship-bias-shield"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for opportunity-cost."
      ]
    },
    "reversibility-check": {
      "id": "reversibility-check",
      "group": "framework",
      "name": {
        "tr": "Geri Dönülebilirlik Testi",
        "en": "Reversibility Test"
      },
      "desc": {
        "tr": "Karardan geri adım atmanın kaçış kapılarını kurgular.",
        "en": "Designs escape hatches and exit criteria."
      },
      "forceModules": [
        "matrix-2x2",
        "pre-mortem-analysis"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for reversibility-check."
      ]
    },
    "stakeholder-map": {
      "id": "stakeholder-map",
      "group": "execution",
      "name": {
        "tr": "Paydaş Etki Haritası",
        "en": "Stakeholder Impact Map"
      },
      "desc": {
        "tr": "Kararın etkileyeceği tüm grupları analiz eder.",
        "en": "Maps impact across internal and external stakeholders."
      },
      "forceModules": [
        "causal-loop-mapping",
        "feedback-loop-design"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for stakeholder-map."
      ]
    },
    "crisis-protocol": {
      "id": "crisis-protocol",
      "group": "execution",
      "name": {
        "tr": "Kriz Karar Protokolü",
        "en": "Crisis Decision Protocol"
      },
      "desc": {
        "tr": "Baskı altında hızlı ve rasyonel hamle planı.",
        "en": "Establishes rapid response protocol under uncertainty."
      },
      "forceModules": [
        "scenario-planning",
        "decision-framing"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for crisis-protocol."
      ]
    },
    "pareto-priority": {
      "id": "pareto-priority",
      "group": "execution",
      "name": {
        "tr": "80/20 Pareto Önceliklendirme",
        "en": "80/20 Pareto Prioritization"
      },
      "desc": {
        "tr": "%80 etki yaratacak %20 kritik hamleyi bulur.",
        "en": "Identifies top 20% actions yielding 80% outcome."
      },
      "forceModules": [
        "expected-value-calc",
        "stakeholder-mapping"
      ],
      "override": {
        "derinlik": "orta",
        "format": "matris2x2",
        "mod": "premortem"
      },
      "injectRules": [
        "Apply decision domain rule for pareto-priority."
      ]
    }
  }
};
