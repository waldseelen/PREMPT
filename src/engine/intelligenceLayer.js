/**
 * Intelligence Layer (Auto-Intelligence Layer)
 * Suggests modules based on user's current configuration or selected modules.
 * This turns the system from a "dumb form" into an "OS that thinks".
 *
 * Rules are domain-scoped (RULES_BY_DOMAIN) because they reference specific
 * module ids, which are not shared across domains — a Learning-domain rule
 * suggesting e.g. 'mental' would surface a non-existent module id in the
 * Code domain and crash the compiler downstream.
 */
export const DEPTH = {
    BASIC: 'temel',
    EXPERT: 'uzman'
};
export const FORMAT = {
    LECTURE: 'ders'
};

const LEARNING_RULES = [
    {
        condition: (config, has) => has('quiz'),
        action: (suggestions, has) => {
            if (!has('ontoloji')) suggestions.add('ontoloji');
            if (!has('mekanizma')) suggestions.add('mekanizma');
        }
    },
    {
        condition: (config, has) => config.derinlik === DEPTH.BASIC && !has('mental'),
        action: (suggestions) => suggestions.add('mental')
    },
    {
        condition: (config, has) => config.format === FORMAT.LECTURE && !has('onkosul'),
        action: (suggestions) => suggestions.add('onkosul')
    },
    {
        condition: (config) => config.seviye === DEPTH.EXPERT,
        action: (suggestions, has) => {
            if (!has('varsayimlar')) suggestions.add('varsayimlar');
            if (!has('basarisizlik')) suggestions.add('basarisizlik');
        }
    }
];

const CODE_RULES = [
    {
        condition: (config, has) => (has('debug') || has('implement')) && !has('tests'),
        action: (suggestions) => suggestions.add('tests')
    },
    {
        condition: (config, has) => has('architecture') && !has('api-design'),
        action: (suggestions) => suggestions.add('api-design')
    },
    {
        condition: (config) => config.seviye === 'hardened',
        action: (suggestions, has) => {
            if (!has('security')) suggestions.add('security');
            if (!has('edge-cases')) suggestions.add('edge-cases');
        }
    }
];

const RULES_BY_DOMAIN = {
    learning: LEARNING_RULES,
    code: CODE_RULES
};

export function getSuggestions(config, selectedModules) {
    const suggestions = new Set();
    const has = (id) => selectedModules.includes(id);
    const rules = RULES_BY_DOMAIN[config.domain] || RULES_BY_DOMAIN.learning;

    rules.forEach(rule => {
        if (rule.condition(config, has)) {
            rule.action(suggestions, has);
        }
    });

    return Array.from(suggestions);
}
