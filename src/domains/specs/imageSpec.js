export const imageSpec = {
  "id": "image",
  "route": "image",
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
      }
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
        "style": "Sanat Tarzı & Estetik",
        "tech": "Kamera & Işık",
        "model": "Parametre & Detay"
      }
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
      "topicHeader": "GÖRSEL SAHNE",
      "levelHeader": "HEDEF MODEL",
      "modeHeader": "ESTETİK SANAT TARZI",
      "depthHeader": "DETAY SEVİYESİ",
      "formatHeader": "EN-BOY ORANI"
    },
    "en": {
      "topicHeader": "SCENE DESCRIPTION",
      "levelHeader": "TARGET MODEL",
      "modeHeader": "AESTHETIC STYLE",
      "depthHeader": "DETAIL LEVEL",
      "formatHeader": "ASPECT RATIO"
    }
  },
  "presets": {
    "cinematic-35mm": {
      "id": "cinematic-35mm",
      "group": "tech",
      "name": {
        "tr": "🎬 Sinematik 35mm Fotogerçekçi",
        "en": "🎬 Cinematic 35mm Realism"
      },
      "desc": {
        "tr": "35mm film dokusu ve doğal ışıklama kurar.",
        "en": "Sets 35mm film grain and natural light."
      },
      "forceModules": [
        "medium-oil-painting",
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
        "tr": "💎 Octane 3D İzometrik Render",
        "en": "💎 Octane 3D Isometric Render"
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
        "tr": "🌃 Cyberpunk Neon Estetiği",
        "en": "🌃 Cyberpunk Neon Aesthetic"
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
        "tr": "🎨 Minimalist Vektör İllüstrasyon",
        "en": "🎨 Minimalist Vector Art"
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
        "tr": "🖼️ Sürrealist Yağlıboya Tablo",
        "en": "🖼️ Surrealist Oil Painting"
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
        "tr": "🔍 Makro Doğa Fotogerçekçilik",
        "en": "🔍 Macro Nature Photography"
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
        "tr": "🗡️ Shonen Anime & Manga Tarzı",
        "en": "🗡️ Shonen Anime & Manga"
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
        "tr": "🏛️ Mimari Render & İç Mekan",
        "en": "🏛️ Architectural Render"
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
        "tr": "🐉 Dark Fantasy Dijital İllüstrasyon",
        "en": "🐉 Dark Fantasy Digital Art"
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
        "tr": "🎞️ 1970 Vintage Film Karesi",
        "en": "🎞️ 1970s Vintage Film Frame"
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
        "tr": "📦 Stüdyo Ürün Fotoğrafçılığı",
        "en": "📦 Studio Product Shot"
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
        "tr": "📱 UI Glassmorphism Mockup",
        "en": "📱 Glassmorphism UI Mockup"
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
