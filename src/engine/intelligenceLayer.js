import { DEPTH, FORMAT, LEVEL, getSuggestionRules } from './suggestionRules';

export { DEPTH, FORMAT, LEVEL };

// Returns [{ id, reasonKey }], not a plain id array — callers look up the
// human-readable reason through the active domain's presentation strings.
export function getSuggestions(config, selectedModules) {
    const suggestions = new Map();
    const has = (id) => selectedModules.includes(id);
    const rules = getSuggestionRules(config.domain);

    rules.forEach((rule) => {
        if (rule.condition(config, has)) {
            rule.action(suggestions, has, rule.reasonKey);
        }
    });

    return Array.from(suggestions, ([id, reasonKey]) => ({ id, reasonKey }));
}
