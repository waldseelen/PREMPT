/**
 * Intelligence Layer (Auto-Intelligence Layer)
 * Suggests modules based on user's current configuration or selected modules.
 * This turns the system from a "dumb form" into an "OS that thinks".
 */
export const DEPTH = {
    BASIC: 'temel',
    EXPERT: 'uzman'
};
export const FORMAT = {
    LECTURE: 'ders'
};

const RULES = [
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

export function getSuggestions(config, selectedModules) {
    const suggestions = new Set();
    const has = (id) => selectedModules.includes(id);

    RULES.forEach(rule => {
        if (rule.condition(config, has)) {
            rule.action(suggestions, has);
        }
    });

    return Array.from(suggestions);
}
