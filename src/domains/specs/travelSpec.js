export const travelSpec = {
  "id": "travel",
  "route": "travel",
  "defaultConfig": {
    "seviye": "yerel",
    "mod": "gurme",
    "derinlik": "dengeli",
    "format": "saatlik"
  },
  "icon": "plane",
  "category": "life",
  "layers": [
    "curation",
    "route",
    "culture",
    "logistics",
    "budget"
  ],
  "ui": {
    "tr": {
      "title": "Seyahat & Deneyim Tasarımı",
      "subtitle": "Anti-turist yerel rotalar ve lojistik optimizasyonu.",
      "topicLabel": "Gidilecek Şehir / Ülke & Süre",
      "topicPlaceholder": "Tokyo, 7 Gün...",
      "domainLabel": "Seyahat Tarzı & Bütçe",
      "domainPlaceholder": "Gurme & Kültür odaklı, Orta Bütçe, Yürüyüş sever...",
      "levelLabel": "Planlama Modu",
      "modeLabel": "Gezgin Personası",
      "depthLabel": "Tempo",
      "formatLabel": "Rota Formatı",
      "presetGroups": {
        "curation": "Rota & Keşif",
        "logistics": "Ulaşım & Lojistik",
        "culture": "Kültür & Bütçe"
      },
      "categories": {
        "curation": "Özgün Seçki & Filtre",
        "route": "Rota & Lojistik",
        "culture": "Kültür & Gastronomi",
        "logistics": "Ulaşım & Zamanlama",
        "budget": "Bütçe & Güvenlik"
      },
      "modulesTitle": "Modüller (Module Blocks)",
      "presetsTitle": "Uzman Hazır Şablonları (System Presets)",
      "paramsTitle": "Parametreler"
    },
    "en": {
      "title": "Travel & Experience Architect",
      "subtitle": "Curate anti-tourist local routes and logistics optimization.",
      "topicLabel": "Destination & Duration",
      "topicPlaceholder": "Tokyo, 7 Days...",
      "domainLabel": "Travel Style & Budget",
      "domainPlaceholder": "Foodie & Culture focused, Moderate budget, Walking lover...",
      "levelLabel": "Planning Mode",
      "modeLabel": "Traveler Persona",
      "depthLabel": "Pacing",
      "formatLabel": "Itinerary Format",
      "presetGroups": {
        "curation": "Itinerary & Discovery",
        "logistics": "Transport & Logistics",
        "culture": "Culture & Budget"
      },
      "categories": {
        "curation": "Curation & Hidden Gems",
        "route": "Route & Logistics",
        "culture": "Culture & Gastronomy",
        "logistics": "Transport & Timing",
        "budget": "Budget & Safety"
      },
      "modulesTitle": "Module Blocks",
      "presetsTitle": "System Presets",
      "paramsTitle": "Parameters"
    }
  },
  "optionSets": {
    "levels": {
      "yerel": {
        "tr": "Anti-Turist (Yerel Rota)",
        "en": "Anti-Tourist (Local Gems)"
      },
      "lojistik": {
        "tr": "Lojistik & Ulaşım",
        "en": "Logistics & Transit"
      },
      "gorgu": {
        "tr": "Kültürel Görgü Kuralları",
        "en": "Cultural Etiquette"
      },
      "butce": {
        "tr": "Bütçe & Harcama",
        "en": "Budget & Cost Hack"
      }
    },
    "modes": {
      "gurme": {
        "tr": "Yerel Gurme",
        "en": "Local Foodie"
      },
      "kulturtarih": {
        "tr": "Kültür & Tarih Avcısı",
        "en": "Culture & History Hunter"
      },
      "slow": {
        "tr": "Yavaş Gezgin (Slow)",
        "en": "Slow Traveler"
      }
    },
    "depths": {
      "yavas": {
        "tr": "Yavaş & Dinlendirici",
        "en": "Relaxed & Slow"
      },
      "dengeli": {
        "tr": "Dengeli Tempo",
        "en": "Balanced Tempo"
      },
      "yogun": {
        "tr": "Yoğun (Her Anı Dolu)",
        "en": "Packed Itinerary"
      }
    },
    "formats": {
      "saatlik": {
        "tr": "Saatlik Rota Şeması",
        "en": "Hourly Itinerary Table"
      },
      "bolge": {
        "tr": "Bölge Harita Listesi",
        "en": "District Map List"
      },
      "butcetablo": {
        "tr": "Bütçe & Ulaşım Tablosu",
        "en": "Budget & Transit Table"
      }
    }
  },
  "compilerTexts": {
    "tr": {
      "mod": {
        "gurme": "Sen yerel kültür ve gastronomi rehberisin. Turist tuzaklarından uzak, otantik lezzet duraklarını ve gizli mahalle lokantalarını bilirsin.",
        "kulturtarih": "Sen sanat tarihi ve kültürel miras uzmanısın. Şehirlerin mimari, tarihi ve sanatsal dokusunu derinlemesine hikayeleştirerek gezdirirsin.",
        "slow": "Sen yavaş seyahat (Slow Travel) ve yerel yaşam danışmanısın. Şehri tüketmek yerine yaşayarak deneyimlemeyi, sürdürülebilir ve dingin rotaları benimsersin."
      },
      "derinlik": {
        "yavas": "Günde en fazla 2-3 kaliteli deneyim içeren dingin rota planı.",
        "dengeli": "Önemli simgeler ile gizli köşeleri dengeleyen standart seyahat planı.",
        "yogun": "Ulaşım süreleri, rezervasyon saatleri ve bütçe optimizasyonu içeren dakik plan."
      },
      "format": {
        "saatlik": "Saat saat yapılandırılmış detaylı günlük akış formatı kullan.",
        "bolge": "Bölgelere ve mahallelere göre kümelenmiş keşif rehberi şeklinde sun.",
        "butcetablo": "Harcama kalemleri ve bütçe tablosu formatında hazırla."
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
      "goalTemplate": "\"{{KONU}}\" seyahati için turistik klişelerden arındırılmış, yerel deneyim ve lojistik optimizasyon odaklı kusursuz bir rota tasarlamak.",
      "constraintsBase": [
        "Turist tuzaklarından ve aşırı kalabalık ticari noktalardan kaçın.",
        "Lojistik geçiş sürelerini ve coğrafi yakınlıkları gerçekçi planla.",
        "Yerel kültüre saygılı ve ekonomik olarak verimli öneriler sun."
      ],
      "monologueText": "İÇ SES MODU: Rota çizmeden önce (<thinking> tagleri içinde) yürüme mesafelerini, transfer sürelerini ve yorgunluk faktörünü değerlendir."
    },
    "en": {
      "mod": {
        "gurme": "You are an authentic gastronomy and local culture guide. You steer clear of tourist traps, focusing on neighborhood culinary secrets and artisan producers.",
        "kulturtarih": "You are an art historian and cultural heritage specialist. You narrate architectural, historical, and artistic depth throughout the journey.",
        "slow": "You are a slow travel and immersive living consultant. You focus on deep place-attachment, mindful itineraries, and sustainable discovery."
      },
      "derinlik": {
        "yavas": "A relaxed itinerary with maximum 2-3 quality experiences per day.",
        "dengeli": "A balanced plan blending essential landmarks with hidden local gems.",
        "yogun": "A precise, high-efficiency schedule with transit timing and reservation management."
      },
      "format": {
        "saatlik": "Structure as an hour-by-hour sequential daily itinerary.",
        "bolge": "Organize by geographic districts and neighborhood walking hubs.",
        "butcetablo": "Present as a comprehensive expense breakdown and logistics budget matrix."
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
      "goalTemplate": "To design an authentic, anti-tourist-trap, culturally rich, and logistically optimized travel itinerary for \"{{KONU}}\".",
      "constraintsBase": [
        "Filter out tourist traps and overhyped commercial venues.",
        "Ensure realistic transit times and geographically coherent routing.",
        "Promote respectful, culturally nuanced, and cost-effective recommendations."
      ],
      "monologueText": "INTERNAL MONOLOGUE: Before plotting itinerary, calculate transit friction and walking fatigue curves in <thinking> tags."
    }
  },
  "presets": {
    "anti-tourist-route": {
      "id": "anti-tourist-route",
      "group": "curation",
      "name": {
        "tr": "Anti-Turist Yerel Gizli Rota",
        "en": "Anti-Tourist Local Gem Route"
      },
      "desc": {
        "tr": "Turist tuzaklarından uzak yerel mekanlar.",
        "en": "Bypasses tourist traps to reveal authentic local spots."
      },
      "forceModules": [
        "cur-anti-tourist-trap-filter"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for anti-tourist-route."
      ]
    },
    "transit-logistics": {
      "id": "transit-logistics",
      "group": "logistics",
      "name": {
        "tr": "Ulaşım & Lojistik Planı",
        "en": "Transit & Logistics Plan"
      },
      "desc": {
        "tr": "Pas kartlar, trenler ve bavul lojistiği.",
        "en": "Maps city passes, train lines, and luggage options."
      },
      "forceModules": [
        "cur-local-hidden-gem-route",
        "cur-niche-interest-customizer"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for transit-logistics."
      ]
    },
    "cultural-etiquette": {
      "id": "cultural-etiquette",
      "group": "culture",
      "name": {
        "tr": "Kültürel Görgü & Bahşiş Rehberi",
        "en": "Cultural Etiquette Guide"
      },
      "desc": {
        "tr": "Yazısız yerel görgü kuralları ve gelenekler.",
        "en": "Teaches unwritten social norms and tipping rules."
      },
      "forceModules": [
        "cur-culinary-foodie-itinerary",
        "rte-walking-distance-transit-opt"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for cultural-etiquette."
      ]
    },
    "budget-hacks": {
      "id": "budget-hacks",
      "group": "culture",
      "name": {
        "tr": "Bütçe & Harcama Optimize Rehberi",
        "en": "Travel Budget Hacks"
      },
      "desc": {
        "tr": "Ucuz bilet ve tasarruflu konaklama.",
        "en": "Saves money on transit, meals, and booking."
      },
      "forceModules": [
        "cur-niche-interest-customizer",
        "rte-day-trip-hub-spoke-model"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for budget-hacks."
      ]
    },
    "foodie-trail": {
      "id": "foodie-trail",
      "group": "curation",
      "name": {
        "tr": "Yerel Gurme & Lezzet Rotası",
        "en": "Local Foodie & Culinary Trail"
      },
      "desc": {
        "tr": "Sokak lezzetleri ve otantik restoranlar.",
        "en": "Curates authentic local street food joints."
      },
      "forceModules": [
        "cur-slow-travel-immersion",
        "cul-local-etiquette-taboos"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for foodie-trail."
      ]
    },
    "slow-travel": {
      "id": "slow-travel",
      "group": "curation",
      "name": {
        "tr": "Yavaş & Dinlendirici Şehir Gezisi",
        "en": "Slow & Relaxed City Exploration"
      },
      "desc": {
        "tr": "Koşturmacasız, kafe ve park odaklı gezi.",
        "en": "Relaxed cafe-hopping and neighborhood walks."
      },
      "forceModules": [
        "cur-family-accessible-curation",
        "cul-festival-seasonal-event-align"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for slow-travel."
      ]
    },
    "history-trail": {
      "id": "history-trail",
      "group": "curation",
      "name": {
        "tr": "Tarih & Müze Keşif Rotası",
        "en": "History & Museum Trail"
      },
      "desc": {
        "tr": "Tarihi yapılar ve sanatsal rotalar.",
        "en": "Explores historical landmarks and art galleries."
      },
      "forceModules": [
        "rte-walking-distance-transit-opt",
        "log-packing-capsule-wardrobe"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for history-trail."
      ]
    },
    "packing-checklist": {
      "id": "packing-checklist",
      "group": "logistics",
      "name": {
        "tr": "Bavul & Ekipman Hazırlık Listesi",
        "en": "Packing & Gear Checklist"
      },
      "desc": {
        "tr": "İklime uygun eksiksiz bavul envanteri.",
        "en": "Climate-tailored minimalist packing list."
      },
      "forceModules": [
        "rte-day-by-day-geographical-clustering",
        "log-travel-insurance-health-prep"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for packing-checklist."
      ]
    },
    "safety-scam-shield": {
      "id": "safety-scam-shield",
      "group": "culture",
      "name": {
        "tr": "Güvenlik & Dolandırıcılık Kalkanı",
        "en": "Tourist Safety & Scam Shield"
      },
      "desc": {
        "tr": "Yaygın dolandırıcılık yöntemlerine dikkat.",
        "en": "Alerts traveler to local scams and safe zones."
      },
      "forceModules": [
        "rte-scenic-roadtrip-pitstops",
        "bdg-daily-expense-categorizer"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for safety-scam-shield."
      ]
    },
    "photo-viewpoints": {
      "id": "photo-viewpoints",
      "group": "curation",
      "name": {
        "tr": "Fotoğraf & Manzara Noktaları",
        "en": "Scenic Photo Viewpoints"
      },
      "desc": {
        "tr": "En iyi manzara ve gün batımı noktaları.",
        "en": "Pinpoints golden-hour photography spots."
      },
      "forceModules": [
        "rte-day-trip-hub-spoke-model",
        "bdg-city-pass-attraction-roi"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for photo-viewpoints."
      ]
    },
    "family-friendly": {
      "id": "family-friendly",
      "group": "logistics",
      "name": {
        "tr": "Çocuklu Aile Seyahat Planı",
        "en": "Family & Kid-Friendly Plan"
      },
      "desc": {
        "tr": "Çocuklar için dinlenme molalı rota.",
        "en": "Paced itinerary with playground breaks for kids."
      },
      "forceModules": [
        "rte-pace-fatigue-management",
        "cur-anti-tourist-trap-filter"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for family-friendly."
      ]
    },
    "nightlife-events": {
      "id": "nightlife-events",
      "group": "culture",
      "name": {
        "tr": "Gece Hayatı & Etkinlik Rehberi",
        "en": "Nightlife & Live Events Guide"
      },
      "desc": {
        "tr": "Canlı müzik ve akşam etkinlikleri.",
        "en": "Recommends live jazz bars and evening events."
      },
      "forceModules": [
        "rte-weather-contingency-indoor-plan",
        "cur-niche-interest-customizer"
      ],
      "override": {
        "derinlik": "dengeli",
        "format": "saatlik",
        "mod": "gurme"
      },
      "injectRules": [
        "Apply travel domain rule for nightlife-events."
      ]
    }
  }
};
