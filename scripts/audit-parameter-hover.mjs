import { DOMAINS } from '../src/domains/index.js';
import { PARAMETER_DESCRIPTIONS } from '../src/domains/parameterDescriptions.js';

const FIELDS = ['levels', 'modes', 'depths', 'formats'];
const LANGS = ['tr', 'en'];
const FALLBACKS = {
  tr: {
    levels: 'Bu seçenek domainin hedef veya işlem seviyesini belirler.',
    modes: 'Bu seçenek domainin çalışma yaklaşımını belirler.',
    depths: 'Bu seçenek çıktının kapsam ve ayrıntı düzeyini belirler.',
    formats: 'Bu seçenek çıktının sunum biçimini belirler.'
  },
  en: {
    levels: 'This option sets the domain target or operating level.',
    modes: 'This option sets the domain working approach.',
    depths: 'This option sets the scope and detail level of the output.',
    formats: 'This option sets the presentation format of the output.'
  }
};

const errors = [];
const warnings = [];
const rows = [];

for (const [domainId, domain] of Object.entries(DOMAINS)) {
  const descriptions = PARAMETER_DESCRIPTIONS[domainId];
  const labels = {};
  for (const field of FIELDS) {
    const optionSet = domain.optionSets?.[field] || {};
    const optionIds = Object.keys(optionSet);
    const fieldDescriptions = descriptions?.[field];
    const missing = [];
    const fallback = [];
    const badLanguage = [];

    if (!fieldDescriptions) {
      errors.push(`${domainId}/${field}: description field is missing`);
    }

    for (const optionId of optionIds) {
      const description = fieldDescriptions?.[optionId];
      if (!description) {
        missing.push(optionId);
        errors.push(`${domainId}/${field}/${optionId}: description is missing`);
        continue;
      }
      for (const lang of LANGS) {
        if (typeof description[lang] !== 'string' || description[lang].trim() === '') {
          badLanguage.push(`${optionId}:${lang}`);
          errors.push(`${domainId}/${field}/${optionId}: missing ${lang} text`);
        } else if (description[lang] === FALLBACKS[lang][field]) {
          fallback.push(`${optionId}:${lang}`);
          warnings.push(`${domainId}/${field}/${optionId}: uses generic ${lang} fallback text`);
        }
      }
    }

    const extra = Object.keys(fieldDescriptions || {}).filter((id) => !Object.hasOwn(optionSet, id));
    if (extra.length) {
      warnings.push(`${domainId}/${field}: stale description ids: ${extra.join(', ')}`);
    }

    const labelKey = {
      levels: 'levelLabel',
      modes: 'modeLabel',
      depths: 'depthLabel',
      formats: 'formatLabel'
    }[field];
    labels[field] = {
      tr: domain.ui?.tr?.[labelKey] || '',
      en: domain.ui?.en?.[labelKey] || ''
    };

    rows.push({ domainId, field, optionCount: optionIds.length, missing, fallback, badLanguage, labels: labels[field] });
  }
}

console.log('PARAMETER_HOVER_AUDIT');
console.log(JSON.stringify({
  domainCount: Object.keys(DOMAINS).length,
  rows,
  errors,
  warnings
}, null, 2));

console.log('\nPARAMETER_LABELS');
for (const row of rows.filter((entry) => ['levels', 'modes', 'depths', 'formats'].includes(entry.field))) {
  console.log(`${row.domainId}/${row.field}: tr="${row.labels.tr}" | en="${row.labels.en}" | options=${row.optionCount}`);
}

if (errors.length) process.exitCode = 1;
