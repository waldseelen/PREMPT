import { learningSpec } from './specs/learningSpec.js';
import { codeSpec } from './specs/codeSpec.js';
import { decisionSpec } from './specs/decisionSpec.js';
import { academicSpec } from './specs/academicSpec.js';
import { philosophySpec } from './specs/philosophySpec.js';
import { problemsolvingSpec } from './specs/problemsolvingSpec.js';
import { agentarchSpec } from './specs/agentarchSpec.js';
import { cyberSpec } from './specs/cyberSpec.js';
import { blogSpec } from './specs/blogSpec.js';
import { imageSpec } from './specs/imageSpec.js';
import { languageSpec } from './specs/languageSpec.js';
import { edudesignSpec } from './specs/edudesignSpec.js';
import { businessSpec } from './specs/businessSpec.js';
import { wellnessSpec } from './specs/wellnessSpec.js';
import { travelSpec } from './specs/travelSpec.js';

export const DOMAINS = {
    learning: learningSpec,
    code: codeSpec,
    decision: decisionSpec,
    academic: academicSpec,
    philosophy: philosophySpec,
    problemsolving: problemsolvingSpec,
    agentarch: agentarchSpec,
    cyber: cyberSpec,
    blog: blogSpec,
    image: imageSpec,
    language: languageSpec,
    edudesign: edudesignSpec,
    business: businessSpec,
    wellness: wellnessSpec,
    travel: travelSpec
};

export const DEFAULT_DOMAIN = 'learning';

export const DOMAIN_ROUTES = Object.fromEntries(
    Object.values(DOMAINS).map((d) => [d.route, d.id])
);

export function getDomain(id) {
    if (id && Object.hasOwn(DOMAINS, id)) {
        return DOMAINS[id];
    }
    return DOMAINS[DEFAULT_DOMAIN];
}

