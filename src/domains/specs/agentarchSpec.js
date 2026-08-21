export const agentarchSpec = {
  "id": "agentarch",
  "route": "agentarch",
  "defaultConfig": {
    "seviye": "system",
    "mod": "persona",
    "derinlik": "standart",
    "format": "system-prompt"
  },
  "icon": "bot",
  "category": "tech",
  "layers": [
    "persona",
    "cot",
    "guardrails",
    "fewshot",
    "orchestration"
  ],
  "ui": {
    "tr": {
      "title": "Meta-Prompt & AI Agent Mimarisi",
      "subtitle": "Custom GPT, Claude Project ve System Prompt talimatları tasarla.",
      "topicLabel": "AI Agent / System Prompt Görevi",
      "topicPlaceholder": "Müşteri Şikayetlerini Analiz Eden Agent...",
      "domainLabel": "Girdi & Çıktı Şeması",
      "domainPlaceholder": "JSON Girdi -> JSON Risk Skoru...",
      "levelLabel": "Prompt Tipi",
      "modeLabel": "Mimarlık Tarzı",
      "depthLabel": "Güvenilirlik",
      "formatLabel": "Prompt Yapısı",
      "presetGroups": {
        "system": "System Prompts",
        "guardrails": "Güvenlik & Sınırlar",
        "orchestration": "Orkestrasyon & Bellek"
      }
    },
    "en": {
      "title": "Meta-Prompt & AI Agent Architect",
      "subtitle": "Engineer System Prompts, Custom GPTs, and Agent instructions.",
      "topicLabel": "AI Agent Task / System Purpose",
      "topicPlaceholder": "Customer Complaint Analysis Agent...",
      "domainLabel": "Input & Output Schema",
      "domainPlaceholder": "Raw JSON -> JSON Risk Score...",
      "levelLabel": "Prompt Type",
      "modeLabel": "Architectural Style",
      "depthLabel": "Reliability",
      "formatLabel": "Prompt Structure",
      "presetGroups": {
        "system": "System Prompts",
        "guardrails": "Safety & Boundaries",
        "orchestration": "Orchestration & Memory"
      }
    }
  },
  "optionSets": {
    "levels": {
      "system": {
        "tr": "System Prompt",
        "en": "System Prompt"
      },
      "customgpt": {
        "tr": "Custom GPT Talimatı",
        "en": "Custom GPT Instruction"
      },
      "agentcot": {
        "tr": "Agent CoT Pipeline",
        "en": "Agent CoT Pipeline"
      }
    },
    "modes": {
      "guardrail": {
        "tr": "Sıkı Kısıtlayıcı (Guardrail)",
        "en": "Strict Guardrail"
      },
      "cot": {
        "tr": "Chain-of-Thought (CoT)",
        "en": "Chain-of-Thought (CoT)"
      },
      "fewshot": {
        "tr": "Few-Shot Eğitimci",
        "en": "Few-Shot Exemplar"
      }
    },
    "depths": {
      "standart": {
        "tr": "Standart",
        "en": "Standard"
      },
      "zerohallucination": {
        "tr": "Zero-Hallucination Guard",
        "en": "Zero-Hallucination Guard"
      },
      "askeri": {
        "tr": "Askeri Disiplin Kilitli",
        "en": "Strict Lockout"
      }
    },
    "formats": {
      "xml": {
        "tr": "Markdown XML (<instructions>)",
        "en": "Markdown XML (<instructions>)"
      },
      "systemjson": {
        "tr": "Pure System JSON",
        "en": "Pure System JSON"
      },
      "template": {
        "tr": "Variable Injected Template",
        "en": "Variable Injected Template"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "topicHeader": "AGENT GÖREVİ",
      "levelHeader": "PROMPT TİPİ",
      "modeHeader": "MİMARLIK TARZI",
      "depthHeader": "GÜVENİLİRLİK",
      "formatHeader": "PROMPT YAPISI"
    },
    "en": {
      "topicHeader": "AGENT TASK",
      "levelHeader": "PROMPT TYPE",
      "modeHeader": "ARCHITECTURAL STYLE",
      "depthHeader": "RELIABILITY",
      "formatHeader": "PROMPT STRUCTURE"
    }
  },
  "presets": {
    "zero-hallucination": {
      "id": "zero-hallucination",
      "group": "guardrails",
      "name": {
        "tr": "Zero-Hallucination Guardrail",
        "en": "Zero-Hallucination Guardrail"
      },
      "desc": {
        "tr": "Sıkı kısıtlayıcılar ile halüsinasyonu %0 seviyesine kilitler.",
        "en": "Enforces strict facts-only guardrails."
      },
      "forceModules": [
        "persona-role-definition",
        "persona-role-definition"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for zero-hallucination."
      ]
    },
    "agent-cot": {
      "id": "agent-cot",
      "group": "orchestration",
      "name": {
        "tr": "CoT Agent Pipeline",
        "en": "CoT Agent Pipeline"
      },
      "desc": {
        "tr": "Karmaşık görevleri adım adım düşünen agent zinciri.",
        "en": "Constructs step-by-step reasoning pipelines."
      },
      "forceModules": [
        "epistemic-stance-setting",
        "domain-expert-profile"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for agent-cot."
      ]
    },
    "custom-gpt-spec": {
      "id": "custom-gpt-spec",
      "group": "system",
      "name": {
        "tr": "Custom GPT Instruction Spec",
        "en": "Custom GPT Instruction Spec"
      },
      "desc": {
        "tr": "OpenAI/Claude için tam sistem talimatı.",
        "en": "Builds production Custom GPT system instructions."
      },
      "forceModules": [
        "tone-register-locking",
        "cot-step-by-step"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for custom-gpt-spec."
      ]
    },
    "fewshot-exemplar": {
      "id": "fewshot-exemplar",
      "group": "system",
      "name": {
        "tr": "Few-Shot Örnekli Prompt",
        "en": "Few-Shot Exemplar Spec"
      },
      "desc": {
        "tr": "AI'ı doğru çıktıya zorlayan girdi/çıktı örnekleri.",
        "en": "Injects input/output exemplars for strict format."
      },
      "forceModules": [
        "domain-expert-profile",
        "verification-step-injection"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for fewshot-exemplar."
      ]
    },
    "json-schema-enforcer": {
      "id": "json-schema-enforcer",
      "group": "guardrails",
      "name": {
        "tr": "Strict JSON Schema Enforcer",
        "en": "Strict JSON Schema Enforcer"
      },
      "desc": {
        "tr": "Çıktıyı tamamen geçerli JSON şemasına zorlar.",
        "en": "Forces model output into validated JSON schemas."
      },
      "forceModules": [
        "cognitive-bias-override",
        "hallucination-guardrail"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for json-schema-enforcer."
      ]
    },
    "role-persona-anchor": {
      "id": "role-persona-anchor",
      "group": "system",
      "name": {
        "tr": "Persona & Ton Çapası",
        "en": "Persona & Tone Anchor"
      },
      "desc": {
        "tr": "AI'ın karakterini ve uzmanlık rolünü kilitler.",
        "en": "Anchors AI expert identity and tone boundaries."
      },
      "forceModules": [
        "adaptive-persona-shift",
        "claim-source-attribution"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for role-persona-anchor."
      ]
    },
    "tool-calling-agent": {
      "id": "tool-calling-agent",
      "group": "orchestration",
      "name": {
        "tr": "Tool & Function Calling Agent",
        "en": "Tool Calling Agent Spec"
      },
      "desc": {
        "tr": "Dış API ve araçları çağıran agent mantığı.",
        "en": "Defines schema and criteria for function calls."
      },
      "forceModules": [
        "cot-step-by-step",
        "few-shot-exemplar-design"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for tool-calling-agent."
      ]
    },
    "prompt-routing": {
      "id": "prompt-routing",
      "group": "orchestration",
      "name": {
        "tr": "Multi-Agent Router Spec",
        "en": "Multi-Agent Router Spec"
      },
      "desc": {
        "tr": "Girdiyi uzman sub-agent'lara yönlendirir.",
        "en": "Routes user queries to specialized sub-agents."
      },
      "forceModules": [
        "tree-of-thought-prompt",
        "dynamic-context-exemplar"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for prompt-routing."
      ]
    },
    "memory-context": {
      "id": "memory-context",
      "group": "orchestration",
      "name": {
        "tr": "Uzun Süreli Hafıza Kapsamı",
        "en": "Long-Context Memory Spec"
      },
      "desc": {
        "tr": "Geçmiş konuşma özetleme ve hafıza protokolü.",
        "en": "Manages context window truncation and memory."
      },
      "forceModules": [
        "self-reflection-loop",
        "variable-ingestion-schema"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for memory-context."
      ]
    },
    "error-recovery": {
      "id": "error-recovery",
      "group": "guardrails",
      "name": {
        "tr": "Agent Hata Toleransı & Fallback",
        "en": "Error Recovery Fallback"
      },
      "desc": {
        "tr": "Hatalı çıktıda otomatik düzeltme döngüsü.",
        "en": "Triggers self-reflection loop upon failed check."
      },
      "forceModules": [
        "verification-step-injection",
        "state-persistence-prompt"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for error-recovery."
      ]
    },
    "token-optimizer": {
      "id": "token-optimizer",
      "group": "system",
      "name": {
        "tr": "Token & Bağlam Bütçeleme",
        "en": "Token Budget Optimizer"
      },
      "desc": {
        "tr": "Gereksiz kelimeleri budayarak maliyeti düşürür.",
        "en": "Trims fluff to maximize context density."
      },
      "forceModules": [
        "path-divergence-evaluation",
        "persona-role-definition"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for token-optimizer."
      ]
    },
    "jailbreak-guard": {
      "id": "jailbreak-guard",
      "group": "guardrails",
      "name": {
        "tr": "Prompt Injection Kalkanı",
        "en": "Prompt Injection Shield"
      },
      "desc": {
        "tr": "Zararlı kullanıcı girdilerini nötralize eder.",
        "en": "Filters adversarial prompt injection attacks."
      },
      "forceModules": [
        "reasoning-depth-governor",
        "domain-expert-profile"
      ],
      "override": {
        "derinlik": "standart",
        "format": "xml",
        "mod": "guardrail"
      },
      "injectRules": [
        "Apply agentarch domain rule for jailbreak-guard."
      ]
    }
  }
};
