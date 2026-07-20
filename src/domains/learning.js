// Declarative descriptor for the Learning domain. Structural facts only —
// translated labels live in src/locales/i18n.js (domains.learning.{lang}),
// compiler role/goal/constraint text lives in src/locales/compilerTexts.js
// (COMPILER_TEXTS.learning), module data lives in src/data/modules_{en,tr}.json,
// and presets live in src/engine/presetEngine.js (PRESETS_BY_DOMAIN.learning).
export const learningDomain = {
    id: 'learning',
    route: 'learn',
    // Ordered layer ids — ModuleGrid renders category columns in this order.
    layers: ['foundation', 'mechanism', 'context', 'boundaries', 'application'],
    // Ordered option-set ids for ConfigPanel <select>s. Ids are the canonical
    // vocabulary shared with COMPILER_TEXTS[domain][lang] and config values.
    modeIds: ['karma', 'feynman', 'sistem', 'sokratik', 'ilkeler'],
    levelIds: ['otomatik', 'acemi', 'orta', 'ileri', 'uzman'],
    depthIds: ['orta', 'temel', 'derin', 'kapsamli'],
    formatIds: ['markdown', 'tablo', 'ders', 'quiz'],
    // Applied to config on domain switch / initial load for domain-specific fields.
    defaultConfig: {
        seviye: 'otomatik',
        mod: 'karma',
        derinlik: 'orta',
        format: 'markdown'
    }
};
