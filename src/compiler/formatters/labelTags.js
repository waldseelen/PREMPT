// Maps structureBuilder.js's bracket-label block keys to stable, language-
// independent tag/field names for the XML and JSON formatters. Relies on
// COMPILER_TEXTS[domain][lang].labels being the same fixed bracket strings
// across every domain/lang pair (true today for all of learning/code x tr/en
// — see src/locales/compilerTexts.js). If a domain ever introduces a
// different label set, extend this map rather than deriving tags from label
// text at runtime.
export const LABEL_TO_TAG = {
    '[ROLE]': 'role',
    '[GOAL]': 'goal',
    '[CONTEXT]': 'context',
    '[ACTIVE MODULES]': 'active_modules',
    '[INSTRUCTIONS]': 'instructions',
    '[OUTPUT FORMAT]': 'output_format',
    '[CONSTRAINTS / SAFETY]': 'constraints_safety'
};
