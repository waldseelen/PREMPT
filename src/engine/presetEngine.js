import { getDomain } from '../domains/index.js';

// Domain-scoped presets: PRESETS_BY_DOMAIN[domain][presetId].
// Module ids referenced by `forceModules` are language-agnostic (same id in
// modules_{en,tr}.json / modules_code_{en,tr}.json), so presets don't need a
// `lang` parameter — only `domain`.
//
// `group` is a structural key (mirrors domain `layers` / module `layer`) used
// purely to cluster the PresetBar UI; its translated label lives in
// i18n[lang].domains[domain].presetGroups. Every preset in a domain must have
// a group that domain's presetGroups defines.
const LEARNING_PRESETS = {
    hizli: {
        id: 'hizli',
        group: 'understand',
        forceModules: ['mekanizma', 'ornekler', 'pareto'],
        override: { derinlik: 'temel', format: 'markdown', mod: 'feynman' },
        injectRules: ["Focus only on the 20% that gives 80% of the understanding.", "Use very simple analogies."]
    },
    derin: {
        id: 'derin',
        group: 'analyze',
        forceModules: ['ontoloji', 'mekanizma', 'evrim', 'rakip', 'varsayimlar'],
        override: { derinlik: 'derin', format: 'markdown', mod: 'sistem' },
        injectRules: ["Deconstruct the topic into its absolute fundamentals.", "Map the entire dependency tree of concepts."]
    },
    sinav: {
        id: 'sinav',
        group: 'apply',
        forceModules: ['quiz', 'transfer'],
        override: { derinlik: 'orta', format: 'quiz', mod: 'sokratik' },
        injectRules: ["Enable spaced repetition principles in the questions.", "Focus strictly on recall-based questioning."]
    },
    muhendis: {
        id: 'muhendis',
        group: 'apply',
        forceModules: ['insa', 'tersine', 'basarisizlik', 'kirilma', 'pareto'],
        override: { derinlik: 'derin', format: 'tablo', mod: 'ilkeler' },
        injectRules: ["Explain how to build this from scratch.", "Focus on architectural decisions and engineering tradeoffs."]
    },
    tam: {
        id: 'tam',
        group: 'apply',
        forceModules: ['kalibrasyon', 'ontoloji', 'mekanizma', 'evrim', 'ornekler', 'gelecek'],
        override: { derinlik: 'kapsamli', format: 'markdown', mod: 'karma' },
        injectRules: ["Leave no stone unturned.", "Provide the most exhaustive explanation possible."]
    },
    arastirmaci: {
        id: 'arastirmaci',
        group: 'analyze',
        forceModules: ['ontoloji', 'nedensellik', 'evrim', 'rakip', 'varsayimlar', 'gelecek'],
        override: { derinlik: 'kapsamli', format: 'markdown', mod: 'sistem' },
        injectRules: ["Act as an academic researcher.", "Provide historical context and citations to dominant theories."]
    },
    temeller: {
        id: 'temeller',
        group: 'understand',
        forceModules: ['kalibrasyon', 'onkosul', 'ontoloji', 'mekanizma'],
        override: { derinlik: 'temel', format: 'ders', mod: 'ilkeler' },
        injectRules: ["Focus purely on first principles.", "Do not introduce advanced topics until the core foundation is explicitly clear."]
    },
    pratik: {
        id: 'pratik',
        group: 'understand',
        forceModules: ['ornekler', 'uzman', 'pareto', 'mental'],
        override: { derinlik: 'orta', format: 'markdown', mod: 'feynman' },
        injectRules: ["Use the 80/20 rule (Pareto principle).", "Provide extremely practical, real-world analogies."]
    },
    hata: {
        id: 'hata',
        group: 'analyze',
        forceModules: ['basarisizlik', 'kirilma', 'celiski', 'pareto'],
        override: { derinlik: 'derin', format: 'tablo', mod: 'sistem' },
        injectRules: ["Focus on Single Points of Failure (SPOF) and anti-patterns.", "Explain exactly when and why this concept or system falls apart."]
    },
    yaratici: {
        id: 'yaratici',
        group: 'understand',
        forceModules: ['diagram', 'simulasyon', 'gelecek', 'mental'],
        override: { derinlik: 'derin', format: 'markdown', mod: 'ilkeler' },
        injectRules: ["Combine cross-disciplinary mental models.", "Propose highly creative future scenarios and synthesize new ideas."]
    },
    karsilastir: {
        id: 'karsilastir',
        group: 'analyze',
        forceModules: ['kontrast', 'rakip', 'karar', 'celiski'],
        override: { derinlik: 'derin', format: 'tablo', mod: 'sistem' },
        injectRules: ["Present a structured comparison of the alternatives with explicit tradeoffs.", "End with a clear recommendation and the reasoning that justifies it."]
    },
    mulakat: {
        id: 'mulakat',
        group: 'apply',
        forceModules: ['mekanizma', 'ornekler', 'basarisizlik', 'uzman'],
        override: { derinlik: 'derin', format: 'markdown', mod: 'sokratik' },
        injectRules: ["Simulate the follow-up questions a technical interviewer would ask, not just a static explanation.", "Prioritize being able to explain this clearly out loud, under time pressure, over written completeness."]
    }
};

const CODE_PRESETS = {
    'ship-feature': {
        id: 'ship-feature',
        group: 'build',
        forceModules: ['req-clarify', 'api-design', 'implement', 'tests'],
        override: { derinlik: 'orta', format: 'explained', mod: 'senior' },
        injectRules: ["Prioritize a working, correct implementation over premature abstraction.", "Flag any requirement ambiguity instead of silently guessing."]
    },
    'code-review': {
        id: 'code-review',
        group: 'review-harden',
        forceModules: ['review', 'security', 'performance'],
        override: { derinlik: 'derin', format: 'explained', mod: 'reviewer' },
        injectRules: ["Separate blocking issues from nitpicks explicitly.", "End with an explicit APPROVE / REQUEST CHANGES verdict."]
    },
    debug: {
        id: 'debug',
        group: 'understand',
        forceModules: ['trace', 'debug', 'tests'],
        override: { derinlik: 'derin', format: 'stepwise', mod: 'senior' },
        injectRules: ["Do not propose a fix before the root cause is confirmed with evidence.", "Include a regression test that would have caught this bug."]
    },
    refactor: {
        id: 'refactor',
        group: 'build',
        forceModules: ['explain', 'refactor', 'tests'],
        override: { derinlik: 'orta', format: 'diff', mod: 'senior' },
        injectRules: ["Preserve external behavior exactly; no new features in this pass.", "Summarize what changed and why for the reviewer."]
    },
    'system-design': {
        id: 'system-design',
        group: 'build',
        forceModules: ['architecture', 'api-design', 'data-model', 'tech-select'],
        override: { derinlik: 'kapsamli', format: 'explained', mod: 'architect' },
        injectRules: ["Justify every major decision against the alternative you rejected.", "Make trust and system boundaries explicit."]
    },
    onboard: {
        id: 'onboard',
        group: 'understand',
        forceModules: ['codebase-map', 'explain', 'trace'],
        override: { derinlik: 'orta', format: 'explained', mod: 'pair' },
        injectRules: ["Optimize for a new contributor's first hour in this codebase.", "Recommend a concrete reading order, not just a description."]
    },
    harden: {
        id: 'harden',
        group: 'review-harden',
        forceModules: ['security', 'edge-cases', 'performance'],
        override: { derinlik: 'kapsamli', format: 'explained', mod: 'security' },
        injectRules: ["Think like an attacker: assume every input is hostile until proven otherwise.", "Prioritize findings by real-world exploitability, not theoretical risk."]
    },
    document: {
        id: 'document',
        group: 'understand',
        forceModules: ['docs', 'commit-pr', 'explain'],
        override: { derinlik: 'orta', format: 'explained', mod: 'senior' },
        injectRules: ["Write for a reader who can run the code but not read your mind.", "Prefer the documentation format that matches the artifact, not prose by default."]
    },
    'security-review': {
        id: 'security-review',
        group: 'review-harden',
        forceModules: ['threat-model', 'auth-design', 'security', 'infra-security', 'supply-chain'],
        override: { derinlik: 'derin', format: 'explained', mod: 'security', seviye: 'hardened' },
        injectRules: ["Think like an attacker: enumerate the trust boundaries and what happens if each one is breached.", "Rank every finding by real-world exploitability, not theoretical severity."]
    },
    'test-strategy': {
        id: 'test-strategy',
        group: 'review-harden',
        forceModules: ['tests', 'edge-cases', 'algorithm'],
        override: { derinlik: 'derin', format: 'explained', mod: 'reviewer' },
        injectRules: ["Design tests that would actually catch regressions, not just increase coverage numbers.", "Call out the edge cases that are easy to forget before writing any test code."]
    },
    'perf-tune': {
        id: 'perf-tune',
        group: 'build',
        forceModules: ['performance', 'algorithm', 'concurrency', 'observability'],
        override: { derinlik: 'derin', format: 'explained', mod: 'senior' },
        injectRules: ["Profile first: identify the actual bottleneck before proposing any optimization.", "State the Big-O and concurrency tradeoff of each optimization explicitly."]
    },
    modernize: {
        id: 'modernize',
        group: 'build',
        forceModules: ['codebase-map', 'explain', 'tests', 'refactor', 'migration'],
        override: { derinlik: 'kapsamli', format: 'explained', mod: 'senior' },
        injectRules: ["Preserve external behavior at every step; migrate incrementally, not in one big rewrite.", "Flag any legacy behavior that is undocumented or relies on unstated assumptions."]
    }
};

export const PRESETS_BY_DOMAIN = {
    learning: LEARNING_PRESETS,
    code: CODE_PRESETS
};

export function getPresets(domain = 'learning') {
    const domainDef = getDomain(domain);
    if (domainDef && domainDef.presets && Object.keys(domainDef.presets).length > 0) {
        return domainDef.presets;
    }
    return PRESETS_BY_DOMAIN[domain] || LEARNING_PRESETS;
}

export function applyPreset(presetId, domain = 'learning') {
    const preset = getPresets(domain)[presetId];
    if (!preset) return { forceModules: [], override: {}, injectRules: [] };
    return preset;
}
