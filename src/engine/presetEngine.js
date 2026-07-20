// Domain-scoped presets: PRESETS_BY_DOMAIN[domain][presetId].
// Module ids referenced by `forceModules` are language-agnostic (same id in
// modules_{en,tr}.json / modules_code_{en,tr}.json), so presets don't need a
// `lang` parameter — only `domain`.
const LEARNING_PRESETS = {
    hizli: {
        id: 'hizli',
        forceModules: ['mekanizma', 'ornekler', 'pareto'],
        override: { derinlik: 'temel', format: 'markdown', mod: 'feynman' },
        injectRules: ["Focus only on the 20% that gives 80% of the understanding.", "Use very simple analogies."]
    },
    derin: {
        id: 'derin',
        forceModules: ['ontoloji', 'mekanizma', 'evrim', 'rakip', 'varsayimlar'],
        override: { derinlik: 'derin', format: 'markdown', mod: 'sistem' },
        injectRules: ["Deconstruct the topic into its absolute fundamentals.", "Map the entire dependency tree of concepts."]
    },
    sinav: {
        id: 'sinav',
        forceModules: ['quiz', 'transfer'],
        override: { derinlik: 'orta', format: 'quiz', mod: 'sokratik' },
        injectRules: ["Enable spaced repetition principles in the questions.", "Focus strictly on recall-based questioning."]
    },
    muhendis: {
        id: 'muhendis',
        forceModules: ['insa', 'tersine', 'basarisizlik', 'kirilma', 'pareto'],
        override: { derinlik: 'derin', format: 'tablo', mod: 'ilkeler' },
        injectRules: ["Explain how to build this from scratch.", "Focus on architectural decisions and engineering tradeoffs."]
    },
    tam: {
        id: 'tam',
        forceModules: ['kalibrasyon', 'ontoloji', 'mekanizma', 'evrim', 'ornekler', 'gelecek'],
        override: { derinlik: 'kapsamli', format: 'markdown', mod: 'karma' },
        injectRules: ["Leave no stone unturned.", "Provide the most exhaustive explanation possible."]
    },
    arastirmaci: {
        id: 'arastirmaci',
        forceModules: ['ontoloji', 'nedensellik', 'evrim', 'rakip', 'varsayimlar', 'gelecek'],
        override: { derinlik: 'kapsamli', format: 'markdown', mod: 'sistem' },
        injectRules: ["Act as an academic researcher.", "Provide historical context and citations to dominant theories."]
    },
    temeller: {
        id: 'temeller',
        forceModules: ['kalibrasyon', 'onkosul', 'ontoloji', 'mekanizma'],
        override: { derinlik: 'temel', format: 'ders', mod: 'ilkeler' },
        injectRules: ["Focus purely on first principles.", "Do not introduce advanced topics until the core foundation is explicitly clear."]
    },
    pratik: {
        id: 'pratik',
        forceModules: ['ornekler', 'uzman', 'pareto', 'mental'],
        override: { derinlik: 'orta', format: 'markdown', mod: 'feynman' },
        injectRules: ["Use the 80/20 rule (Pareto principle).", "Provide extremely practical, real-world analogies."]
    },
    hata: {
        id: 'hata',
        forceModules: ['basarisizlik', 'kirilma', 'celiski', 'pareto'],
        override: { derinlik: 'derin', format: 'tablo', mod: 'sistem' },
        injectRules: ["Focus on Single Points of Failure (SPOF) and anti-patterns.", "Explain exactly when and why this concept or system falls apart."]
    },
    yaratici: {
        id: 'yaratici',
        forceModules: ['diagram', 'simulasyon', 'gelecek', 'mental'],
        override: { derinlik: 'derin', format: 'markdown', mod: 'ilkeler' },
        injectRules: ["Combine cross-disciplinary mental models.", "Propose highly creative future scenarios and synthesize new ideas."]
    }
};

const CODE_PRESETS = {
    'ship-feature': {
        id: 'ship-feature',
        forceModules: ['req-clarify', 'api-design', 'implement', 'tests'],
        override: { derinlik: 'orta', format: 'explained', mod: 'senior' },
        injectRules: ["Prioritize a working, correct implementation over premature abstraction.", "Flag any requirement ambiguity instead of silently guessing."]
    },
    'code-review': {
        id: 'code-review',
        forceModules: ['review', 'security', 'performance'],
        override: { derinlik: 'derin', format: 'explained', mod: 'reviewer' },
        injectRules: ["Separate blocking issues from nitpicks explicitly.", "End with an explicit APPROVE / REQUEST CHANGES verdict."]
    },
    debug: {
        id: 'debug',
        forceModules: ['trace', 'debug', 'tests'],
        override: { derinlik: 'derin', format: 'stepwise', mod: 'senior' },
        injectRules: ["Do not propose a fix before the root cause is confirmed with evidence.", "Include a regression test that would have caught this bug."]
    },
    refactor: {
        id: 'refactor',
        forceModules: ['explain', 'refactor', 'tests'],
        override: { derinlik: 'orta', format: 'diff', mod: 'senior' },
        injectRules: ["Preserve external behavior exactly; no new features in this pass.", "Summarize what changed and why for the reviewer."]
    },
    'system-design': {
        id: 'system-design',
        forceModules: ['architecture', 'api-design', 'data-model', 'tech-select'],
        override: { derinlik: 'kapsamli', format: 'explained', mod: 'architect' },
        injectRules: ["Justify every major decision against the alternative you rejected.", "Make trust and system boundaries explicit."]
    },
    onboard: {
        id: 'onboard',
        forceModules: ['codebase-map', 'explain', 'trace'],
        override: { derinlik: 'orta', format: 'explained', mod: 'pair' },
        injectRules: ["Optimize for a new contributor's first hour in this codebase.", "Recommend a concrete reading order, not just a description."]
    },
    harden: {
        id: 'harden',
        forceModules: ['security', 'edge-cases', 'performance'],
        override: { derinlik: 'kapsamli', format: 'explained', mod: 'security' },
        injectRules: ["Think like an attacker: assume every input is hostile until proven otherwise.", "Prioritize findings by real-world exploitability, not theoretical risk."]
    },
    document: {
        id: 'document',
        forceModules: ['docs', 'commit-pr', 'explain'],
        override: { derinlik: 'orta', format: 'explained', mod: 'senior' },
        injectRules: ["Write for a reader who can run the code but not read your mind.", "Prefer the documentation format that matches the artifact, not prose by default."]
    }
};

export const PRESETS_BY_DOMAIN = {
    learning: LEARNING_PRESETS,
    code: CODE_PRESETS
};

export function getPresets(domain = 'learning') {
    return PRESETS_BY_DOMAIN[domain] || LEARNING_PRESETS;
}

export function applyPreset(presetId, domain = 'learning') {
    const preset = getPresets(domain)[presetId];
    if (!preset) return { forceModules: [], override: {}, injectRules: [] };
    return preset;
}
