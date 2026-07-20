import learningModulesTr from '../data/modules_tr.json';
import learningModulesEn from '../data/modules_en.json';
import codeModulesTr from '../data/modules_code_tr.json';
import codeModulesEn from '../data/modules_code_en.json';

// Registries keyed by domain, then by language. Adding a 3rd domain means
// adding one entry here (plus its data files) — no other change in this file.
const REGISTRIES = {
    learning: { tr: learningModulesTr, en: learningModulesEn },
    code: { tr: codeModulesTr, en: codeModulesEn }
};

// In the future, this file could load from an API or allow user-injected modules.
export function getModuleRegistry(domain = 'learning', lang = 'tr') {
    const byLang = REGISTRIES[domain] || REGISTRIES.learning;
    return byLang[lang] || byLang.tr;
}

export function getModuleById(id, domain = 'learning', lang = 'tr') {
    const registry = getModuleRegistry(domain, lang);
    return registry.find(m => m.id === id);
}
