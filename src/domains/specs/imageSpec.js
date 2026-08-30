export const imageSpec = {
  "id": "image",
  "route": "image",
  "defaultConfig": {
    "seviye": "midjourney",
    "mod": "fotografik",
    "derinlik": "orta",
    "format": "midjourney-v6"
  },
  "icon": "palette",
  "category": "creation",
  "layers": [
    "medium",
    "composition",
    "lighting",
    "atmosphere",
    "parameters"
  ],
  "ui": {
    "tr": {
      "title": "Görsel & Sanat Mühendisi",
      "subtitle": "Midjourney, Flux ve DALL-E için yüksek kaliteli görsel promptları derle.",
      "topicLabel": "Çizilecek Sahne / Karakter Tanımı",
      "topicPlaceholder": "Neon ışıklı siberpunk sokakta yağmurda yürüyen samuray...",
      "domainLabel": "Sanat Tarzı / Medyum",
      "domainPlaceholder": "Fotogerçekçi 35mm, Cyberpunk, Octane Render...",
      "levelLabel": "Hedef Model",
      "modeLabel": "Estetik / Tarz",
      "depthLabel": "Detay Seviyesi",
      "formatLabel": "En-Boy Oranı (Aspect Ratio)",
      "presetGroups": {
        "style": "Sanat Tarzı & Estetik",
        "tech": "Kamera & Işık",
        "model": "Parametre & Detay"
      },
      "categories": {
        "medium": "Medya & Sanat Tarzı",
        "composition": "Kompozisyon & Kadraj",
        "lighting": "Işık & Renk",
        "atmosphere": "Atmosfer & Doku",
        "parameters": "Render & Parametreler"
      },
      "modulesTitle": "Modüller (Module Blocks)",
      "presetsTitle": "Uzman Hazır Şablonları (System Presets)",
      "paramsTitle": "Parametreler"
    },
    "en": {
      "title": "Visual & Art Prompt Engineer",
      "subtitle": "Compile production-grade image prompts for Midjourney, Flux, and DALL-E.",
      "topicLabel": "Scene / Character Description",
      "topicPlaceholder": "Cyberpunk samurai walking in rain down a neon-lit street...",
      "domainLabel": "Art Style / Medium",
      "domainPlaceholder": "Photorealistic 35mm, Cyberpunk, Octane Render...",
      "levelLabel": "Target Model",
      "modeLabel": "Aesthetic Style",
      "depthLabel": "Detail Level",
      "formatLabel": "Aspect Ratio",
      "presetGroups": {
        "style": "Art Style & Aesthetic",
        "tech": "Camera & Lighting",
        "model": "Parameters & Detail"
      },
      "categories": {
        "medium": "Medium & Art Style",
        "composition": "Composition & Framing",
        "lighting": "Lighting & Color",
        "atmosphere": "Atmosphere & Texture",
        "parameters": "Render & Camera Parameters"
      },
      "modulesTitle": "Module Blocks",
      "presetsTitle": "System Presets",
      "paramsTitle": "Parameters"
    }
  },
  "optionSets": {
    "levels": {
      "midjourney": {
        "tr": "Midjourney v6",
        "en": "Midjourney v6"
      },
      "flux": {
        "tr": "Flux.1 Dev",
        "en": "Flux.1 Dev"
      },
      "dalle3": {
        "tr": "DALL-E 3",
        "en": "DALL-E 3"
      },
      "sdxl": {
        "tr": "Stable Diffusion XL",
        "en": "Stable Diffusion XL"
      }
    },
    "modes": {
      "fotogercekci": {
        "tr": "Fotogerçekçi (35mm)",
        "en": "Photorealistic (35mm)"
      },
      "yagliboya": {
        "tr": "Surrealist Yağlıboya",
        "en": "Surrealist Oil Painting"
      },
      "octane": {
        "tr": "Octane 3D Render",
        "en": "Octane 3D Render"
      },
      "minimalist": {
        "tr": "Minimalist Vector",
        "en": "Minimalist Vector"
      }
    },
    "depths": {
      "temel": {
        "tr": "Temel Kompozisyon",
        "en": "Basic Composition"
      },
      "orta": {
        "tr": "Yüksek Işık & Doku",
        "en": "High Lighting & Texture"
      },
      "ultra": {
        "tr": "Ultra-Detailed 8K",
        "en": "Ultra-Detailed 8K"
      }
    },
    "formats": {
      "16-9": {
        "tr": "16:9 (Yatay Widescreen)",
        "en": "16:9 (Widescreen)"
      },
      "1-1": {
        "tr": "1:1 (Kare)",
        "en": "1:1 (Square)"
      },
      "9-16": {
        "tr": "9:16 (Dikey Story)",
        "en": "9:16 (Vertical)"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "mod": {
        "fotogercekci": "Sen usta bir fotoğrafçı ve görüntü yönetmenisin. Lens tipi, diyafram, sensör dokusu ve doğal ışık dinamikleriyle hiper-gerçekçi sahneler kurarsın.",
        "yagliboya": "Sen klasik ve modern sanat ustasısın. Fırça darbeleri, impasto tekniği, renk paleti ve ışık-gölge (chiaroscuro) kompozisyonlarıyla görsel tasarlarsın.",
        "octane": "Sen 3D konsept sanatçısı ve render uzmanısın. Octane, Unreal Engine 5, hacimsel ışıklandırma (volumetric lighting) ve fotogerçekçi materyallerle sahne oluşturursun.",
        "minimalist": "Sen minimalist görsel tasarımcısın. Negatif alan, sade geometrik formlar, tipografik denge ve çarpıcı renk kontrastlarını yönetirsin."
      },
      "derinlik": {
        "temel": "Temel özne, ana stil ve ışık yönünü içeren temiz prompt üret.",
        "orta": "Kompozisyon kuralları, kamera açısı ve atmosferik detayları ekle.",
        "ultra": "Lens milimetresi, film stoğu, mikro dokular, negatif promptlar ve motor parametreleriyle kusursuz profesyonel prompt inşa et."
      },
      "format": {
        "16-9": "16:9 Sinematik geniş ekran en-boy oranında optimize et.",
        "1-1": "1:1 Kare sosyal medya / portre formatında optimize et.",
        "9-16": "9:16 Dikey mobil / hikaye formatında optimize et."
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
      "goalTemplate": "\"{{KONU}}\" görsel konsepti için kusursuz kompozisyon, ışık, stil ve render parametrelerine sahip yüksek çözünürlüklü prompt oluşturmak.",
      "constraintsBase": [
        "Görsel öğeleri ağırlık sırasına göre virgülle ayrılmış net terimlerle belirt.",
        "İstenmeyen bozulmaları negatif prompt bloğunda açıkça listele.",
        "Stil ve ışık kaynağını birbiriyle çelişmeyecek şekilde uyumla."
      ],
      "monologueText": "İÇ SES MODU: Promptu oluşturmadan önce (<thinking> tagleri içinde) sahnenin odak noktasını, ışık yönünü ve renk uyumunu planla."
    },
    "en": {
      "mod": {
        "fotogercekci": "You are a master cinematographer and photographer. You engineer hyper-realistic prompts specifying lens focal lengths, f-stops, sensor noise, and natural lighting.",
        "yagliboya": "You are a master fine artist. You design visual prompts with tangible brushwork, impasto textures, color palettes, and chiaroscuro depth.",
        "octane": "You are an advanced 3D environment and concept artist. You utilize Octane/Unreal Engine 5 shaders, raytracing, and volumetric lighting.",
        "minimalist": "You are a minimalist art director. You leverage negative space, disciplined geometry, and high-impact focal contrast."
      },
      "derinlik": {
        "temel": "Generate a focused prompt covering subject, primary style, and ambient lighting.",
        "orta": "Add precise compositional framing, camera distance, and atmospheric depth cues.",
        "ultra": "Engineer a production-ready prompt with camera sensor, lens optics, micro-textures, and negative modifier weights."
      },
      "format": {
        "16-9": "Optimize for 16:9 cinematic widescreen aspect ratio.",
        "1-1": "Optimize for 1:1 square balanced composition.",
        "9-16": "Optimize for 9:16 vertical mobile framing."
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
      "goalTemplate": "To engineer a high-precision prompt with master-level composition, lighting, style, and camera parameters for the concept \"{{KONU}}\".",
      "constraintsBase": [
        "Order prompt tokens strictly by semantic importance and visual weight.",
        "Include dedicated negative prompt exclusions to prevent artifacting.",
        "Ensure lighting physics and stylistic rendering engines do not conflict."
      ],
      "monologueText": "INTERNAL MONOLOGUE: Before prompt generation, map the key visual focal point, lighting direction, and chromatic balance in <thinking> tags."
    }
  },
  "presets": {
    "cinematic-35mm": {
      "id": "cinematic-35mm",
      "group": "tech",
      "name": {
        "tr": "Sinematik 35mm Fotogerçekçi",
        "en": "Cinematic 35mm Realism"
      },
      "desc": {
        "tr": "35mm film dokusu ve doğal ışıklama kurar.",
        "en": "Sets 35mm film grain and natural light."
      },
      "forceModules": [
        "medium-oil-painting"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for cinematic-35mm."
      ]
    },
    "octane-render": {
      "id": "octane-render",
      "group": "style",
      "name": {
        "tr": "Octane 3D İzometrik Render",
        "en": "Octane 3D Isometric Render"
      },
      "desc": {
        "tr": "3D izometrik cam/metal materyaller.",
        "en": "Generates 3D isometric materials."
      },
      "forceModules": [
        "medium-3d-octane",
        "medium-cyberpunk-vector"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for octane-render."
      ]
    },
    "cyberpunk-neon": {
      "id": "cyberpunk-neon",
      "group": "style",
      "name": {
        "tr": "Cyberpunk Neon Estetiği",
        "en": "Cyberpunk Neon Aesthetic"
      },
      "desc": {
        "tr": "Gece çekimi ve neon ışıklama.",
        "en": "Night shot and neon reflections."
      },
      "forceModules": [
        "medium-cinematic-film",
        "composition-rule-of-thirds"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for cyberpunk-neon."
      ]
    },
    "minimalist-vector": {
      "id": "minimalist-vector",
      "group": "style",
      "name": {
        "tr": "Minimalist Vektör İllüstrasyon",
        "en": "Minimalist Vector Art"
      },
      "desc": {
        "tr": "Düz renk blokları ve temiz çizgiler.",
        "en": "Flat color blocks and clean line art."
      },
      "forceModules": [
        "medium-cyberpunk-vector",
        "composition-isometric-grid"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for minimalist-vector."
      ]
    },
    "surrealist-oil": {
      "id": "surrealist-oil",
      "group": "style",
      "name": {
        "tr": "Sürrealist Yağlıboya Tablo",
        "en": "Surrealist Oil Painting"
      },
      "desc": {
        "tr": "Dali & Magritte tarzı zengin dokulu tablo.",
        "en": "Rich oil paint textures in surrealist style."
      },
      "forceModules": [
        "medium-watercolor-wash",
        "lighting-volumetric-rays"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for surrealist-oil."
      ]
    },
    "macro-nature": {
      "id": "macro-nature",
      "group": "tech",
      "name": {
        "tr": "Makro Doğa Fotogerçekçilik",
        "en": "Macro Nature Photography"
      },
      "desc": {
        "tr": "Böcek, su damlası ve detaylı Dof çekimi.",
        "en": "Extremely detailed macro lens photography."
      },
      "forceModules": [
        "medium-hyperreal-macro",
        "lighting-neon-cyber-glow"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for macro-nature."
      ]
    },
    "anime-shonen": {
      "id": "anime-shonen",
      "group": "style",
      "name": {
        "tr": "Shonen Anime & Manga Tarzı",
        "en": "Shonen Anime & Manga"
      },
      "desc": {
        "tr": "Dinamik aksiyon çizgileri ve anime renklendirme.",
        "en": "Dynamic action lines and anime cell shading."
      },
      "forceModules": [
        "composition-rule-of-thirds",
        "atmosphere-fog-mist"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for anime-shonen."
      ]
    },
    "arch-blueprint": {
      "id": "arch-blueprint",
      "group": "model",
      "name": {
        "tr": "Mimari Render & İç Mekan",
        "en": "Architectural Render"
      },
      "desc": {
        "tr": "İskandinav minimalist iç mekan ve ışık.",
        "en": "Scandinavian interior architectural render."
      },
      "forceModules": [
        "composition-golden-ratio",
        "atmosphere-ethereal-fantasy"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for arch-blueprint."
      ]
    },
    "dark-fantasy": {
      "id": "dark-fantasy",
      "group": "style",
      "name": {
        "tr": "Dark Fantasy Dijital İllüstrasyon",
        "en": "Dark Fantasy Digital Art"
      },
      "desc": {
        "tr": "Eldritch yaratıklar ve kasvetli atmosfer.",
        "en": "Atmospheric dark fantasy concept art."
      },
      "forceModules": [
        "composition-low-angle",
        "parameters-midjourney-v6"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for dark-fantasy."
      ]
    },
    "vintage-film": {
      "id": "vintage-film",
      "group": "tech",
      "name": {
        "tr": "1970 Vintage Film Karesi",
        "en": "1970s Vintage Film Frame"
      },
      "desc": {
        "tr": "Soluk renkler ve retro Kodachrome estetiği.",
        "en": "Kodachrome color palette with vintage aesthetic."
      },
      "forceModules": [
        "composition-isometric-grid",
        "parameters-chaos-stylize"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for vintage-film."
      ]
    },
    "studio-product": {
      "id": "studio-product",
      "group": "model",
      "name": {
        "tr": "Stüdyo Ürün Fotoğrafçılığı",
        "en": "Studio Product Shot"
      },
      "desc": {
        "tr": "Softbox ışık ve nötr stüdyo fonu.",
        "en": "Clean softbox studio product photography."
      },
      "forceModules": [
        "composition-leading-lines",
        "medium-oil-painting"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for studio-product."
      ]
    },
    "glassmorphism-ui": {
      "id": "glassmorphism-ui",
      "group": "model",
      "name": {
        "tr": "UI Glassmorphism Mockup",
        "en": "Glassmorphism UI Mockup"
      },
      "desc": {
        "tr": "Bulanık cam paneller ve modern mobil UI.",
        "en": "Modern mobile UI with blurred glass panels."
      },
      "forceModules": [
        "composition-symmetry-balance",
        "medium-cyberpunk-vector"
      ],
      "override": {
        "derinlik": "orta",
        "format": "16-9",
        "mod": "fotogercekci"
      },
      "injectRules": [
        "Apply image domain rule for glassmorphism-ui."
      ]
    }
  }
};
