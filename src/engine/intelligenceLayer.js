/**
 * Intelligence Layer (Auto-Intelligence Layer)
 * Suggests modules based on user's current configuration or selected modules.
 * This turns the system from a "dumb form" into an "OS that thinks".
 *
 * Rules are domain-scoped (RULES_BY_DOMAIN) because they reference specific
 * module ids, which are not shared across domains — a Learning-domain rule
 * suggesting e.g. 'mental' would surface a non-existent module id in the
 * Code domain and crash the compiler downstream.
 *
 * Each rule carries a `reasonKey` so the UI can explain *why* a module was
 * suggested (looked up in i18n's domains.{domain}.suggestionReasons), instead
 * of a single generic "recommended for better context" for every suggestion.
 */
export const DEPTH = {
    BASIC: 'temel',
    EXPERT: 'uzman'
};
export const FORMAT = {
    LECTURE: 'ders'
};
export const LEVEL = {
    HARDENED: 'hardened'
};

const LEARNING_RULES = [
    {
        reasonKey: 'quizNeedsFoundations',
        condition: (config, has) => has('quiz'),
        action: (suggestions, has, reasonKey) => {
            if (!has('ontoloji')) suggestions.set('ontoloji', reasonKey);
            if (!has('mekanizma')) suggestions.set('mekanizma', reasonKey);
        }
    },
    {
        reasonKey: 'basicNeedsMentalModel',
        condition: (config, has) => config.derinlik === DEPTH.BASIC && !has('mental'),
        action: (suggestions, has, reasonKey) => suggestions.set('mental', reasonKey)
    },
    {
        reasonKey: 'lectureNeedsPrereqs',
        condition: (config, has) => config.format === FORMAT.LECTURE && !has('onkosul'),
        action: (suggestions, has, reasonKey) => suggestions.set('onkosul', reasonKey)
    },
    {
        reasonKey: 'expertNeedsBoundaries',
        condition: (config) => config.seviye === DEPTH.EXPERT,
        action: (suggestions, has, reasonKey) => {
            if (!has('varsayimlar')) suggestions.set('varsayimlar', reasonKey);
            if (!has('basarisizlik')) suggestions.set('basarisizlik', reasonKey);
        }
    },
    {
        reasonKey: 'firstPrinciplesNeedsMisconceptions',
        condition: (config, has) => config.mod === 'ilkeler' && !has('yanilgilar'),
        action: (suggestions, has, reasonKey) => suggestions.set('yanilgilar', reasonKey)
    }
];

const CODE_RULES = [
    {
        reasonKey: 'implementNeedsTests',
        condition: (config, has) => (has('debug') || has('implement')) && !has('tests'),
        action: (suggestions, has, reasonKey) => suggestions.set('tests', reasonKey)
    },
    {
        reasonKey: 'architectureNeedsApiDesign',
        condition: (config, has) => has('architecture') && !has('api-design'),
        action: (suggestions, has, reasonKey) => suggestions.set('api-design', reasonKey)
    },
    {
        reasonKey: 'hardenedNeedsSecurity',
        condition: (config) => config.seviye === LEVEL.HARDENED,
        action: (suggestions, has, reasonKey) => {
            if (!has('security')) suggestions.set('security', reasonKey);
            if (!has('edge-cases')) suggestions.set('edge-cases', reasonKey);
        }
    },
    {
        reasonKey: 'migrationNeedsTests',
        condition: (config, has) => has('migration') && !has('tests'),
        action: (suggestions, has, reasonKey) => suggestions.set('tests', reasonKey)
    }
];

const RULES_BY_DOMAIN = {
    learning: LEARNING_RULES,
    code: CODE_RULES
};

// Returns [{ id, reasonKey }], not a plain id array — callers look up the
// human-readable reason via i18n (domains.{domain}.suggestionReasons[reasonKey]).
export function getSuggestions(config, selectedModules) {
    const suggestions = new Map(); // id -> reasonKey
    const has = (id) => selectedModules.includes(id);
    const rules = RULES_BY_DOMAIN[config.domain] || RULES_BY_DOMAIN.learning;

    rules.forEach(rule => {
        if (rule.condition(config, has)) {
            rule.action(suggestions, has, rule.reasonKey);
        }
    });

    return Array.from(suggestions, ([id, reasonKey]) => ({ id, reasonKey }));
}
