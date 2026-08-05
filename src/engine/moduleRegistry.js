import learningModulesTr from '../data/modules_tr.json';
import learningModulesEn from '../data/modules_en.json';
import codeModulesTr from '../data/modules_code_tr.json';
import codeModulesEn from '../data/modules_code_en.json';
import decisionModulesTr from '../data/modules_decision_tr.json';
import decisionModulesEn from '../data/modules_decision_en.json';
import academicModulesTr from '../data/modules_academic_tr.json';
import academicModulesEn from '../data/modules_academic_en.json';
import philosophyModulesTr from '../data/modules_philosophy_tr.json';
import philosophyModulesEn from '../data/modules_philosophy_en.json';
import problemsolvingModulesTr from '../data/modules_problemsolving_tr.json';
import problemsolvingModulesEn from '../data/modules_problemsolving_en.json';
import agentarchModulesTr from '../data/modules_agentarch_tr.json';
import agentarchModulesEn from '../data/modules_agentarch_en.json';
import cyberModulesTr from '../data/modules_cyber_tr.json';
import cyberModulesEn from '../data/modules_cyber_en.json';
import blogModulesTr from '../data/modules_blog_tr.json';
import blogModulesEn from '../data/modules_blog_en.json';
import imageModulesTr from '../data/modules_image_tr.json';
import imageModulesEn from '../data/modules_image_en.json';
import languageModulesTr from '../data/modules_language_tr.json';
import languageModulesEn from '../data/modules_language_en.json';
import edudesignModulesTr from '../data/modules_edudesign_tr.json';
import edudesignModulesEn from '../data/modules_edudesign_en.json';
import businessModulesTr from '../data/modules_business_tr.json';
import businessModulesEn from '../data/modules_business_en.json';
import wellnessModulesTr from '../data/modules_wellness_tr.json';
import wellnessModulesEn from '../data/modules_wellness_en.json';
import travelModulesTr from '../data/modules_travel_tr.json';
import travelModulesEn from '../data/modules_travel_en.json';

const REGISTRIES = {
    learning: { tr: learningModulesTr, en: learningModulesEn },
    code: { tr: codeModulesTr, en: codeModulesEn },
    decision: { tr: decisionModulesTr, en: decisionModulesEn },
    academic: { tr: academicModulesTr, en: academicModulesEn },
    philosophy: { tr: philosophyModulesTr, en: philosophyModulesEn },
    problemsolving: { tr: problemsolvingModulesTr, en: problemsolvingModulesEn },
    agentarch: { tr: agentarchModulesTr, en: agentarchModulesEn },
    cyber: { tr: cyberModulesTr, en: cyberModulesEn },
    blog: { tr: blogModulesTr, en: blogModulesEn },
    image: { tr: imageModulesTr, en: imageModulesEn },
    language: { tr: languageModulesTr, en: languageModulesEn },
    edudesign: { tr: edudesignModulesTr, en: edudesignModulesEn },
    business: { tr: businessModulesTr, en: businessModulesEn },
    wellness: { tr: wellnessModulesTr, en: wellnessModulesEn },
    travel: { tr: travelModulesTr, en: travelModulesEn },
};

export function getModuleRegistry(domain = 'learning', lang = 'tr') {
    const byLang = REGISTRIES[domain] || REGISTRIES.learning;
    return byLang[lang] || byLang.tr;
}

export function getModuleById(id, domain = 'learning', lang = 'tr') {
    const registry = getModuleRegistry(domain, lang);
    return registry.find(m => m.id === id);
}
