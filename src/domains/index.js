import { learningDomain } from './learning';
import { codeDomain } from './code';

// Adding a 3rd domain: create its descriptor file, register it here, and add
// its i18n/compilerTexts/presets/module-data entries. No engine or UI change
// beyond that.
export const DOMAINS = {
    learning: learningDomain,
    code: codeDomain
};

export const DEFAULT_DOMAIN = 'learning';

// URL route segment ('learn' | 'code') -> domain id.
export const DOMAIN_ROUTES = Object.fromEntries(
    Object.values(DOMAINS).map((d) => [d.route, d.id])
);

export function getDomain(id) {
    return DOMAINS[id] || DOMAINS[DEFAULT_DOMAIN];
}
