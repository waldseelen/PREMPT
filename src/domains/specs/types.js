/**
 * @typedef {Object} LocalizedString
 * @property {string} tr
 * @property {string} en
 */

/**
 * @typedef {Object} OptionDef
 * @property {string} tr
 * @property {string} en
 */

/**
 * @typedef {Object} OptionSets
 * @property {Record<string, OptionDef>} levels
 * @property {Record<string, OptionDef>} modes
 * @property {Record<string, OptionDef>} depths
 * @property {Record<string, OptionDef>} formats
 */

/**
 * @typedef {Object} DomainPreset
 * @property {string} id
 * @property {string} group
 * @property {LocalizedString} name
 * @property {LocalizedString} desc
 * @property {string[]} forceModules
 * @property {Record<string, string>} override
 * @property {string[]} injectRules
 */

/**
 * @typedef {Object} CompilerTextBundle
 * @property {Record<string, string>} mod
 * @property {Record<string, string>} derinlik
 * @property {Record<string, string>} format
 * @property {Record<string, string>} labels
 * @property {Record<string, string>} contextLabels
 * @property {string} goalTemplate
 * @property {string[]} constraintsBase
 * @property {string} monologueText
 */

/**
 * @typedef {Object} DomainUI
 * @property {string} title
 * @property {string} subtitle
 * @property {string} topicLabel
 * @property {string} topicPlaceholder
 * @property {string} domainLabel
 * @property {string} domainPlaceholder
 * @property {string} levelLabel
 * @property {string} modeLabel
 * @property {string} depthLabel
 * @property {string} formatLabel
 * @property {Record<string, string>} presetGroups
 * @property {Record<string, string>} [categories]
 * @property {string} [modulesTitle]
 * @property {string} [presetsTitle]
 * @property {string} [paramsTitle]
 * @property {Array<{title: string, desc: string, target?: string}>} [tourSteps]
 */

/**
 * @typedef {Object} DomainSpec
 * @property {string} id
 * @property {string} route
 * @property {Record<string, string>} defaultConfig
 * @property {string} icon
 * @property {string} category
 * @property {string[]} layers
 * @property {{ tr: DomainUI, en: DomainUI }} ui
 * @property {OptionSets} optionSets
 * @property {{ tr: CompilerTextBundle, en: CompilerTextBundle }} compilerTexts
 * @property {Record<string, DomainPreset>} presets
 */

export {};
