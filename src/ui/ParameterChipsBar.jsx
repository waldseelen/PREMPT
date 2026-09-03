import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { getDomain } from '../domains';
import { getParameterDescription } from '../domains/parameterDescriptions';
import { GraduationCap, Workflow, Layers, FileText } from 'lucide-react';
import ParameterChip from './ParameterChip';

export default function ParameterChipsBar() {
    const { config, setConfig } = useEngineState(useShallow((state) => ({
        config: state.config,
        setConfig: state.setConfig
    })));

    const t = getTranslation(config.lang, config.domain);
    const domain = getDomain(config.domain);
    const lang = config.lang || 'tr';

    const levelIds = domain.levelIds || Object.keys(domain.optionSets?.levels || {}) || [];
    const modeIds = domain.modeIds || Object.keys(domain.optionSets?.modes || {}) || [];
    const depthIds = domain.depthIds || Object.keys(domain.optionSets?.depths || {}) || [];
    const formatIds = domain.formatIds || Object.keys(domain.optionSets?.formats || {}) || [];

    const getOptionLabel = (optionsMap, id) => {
        const val = optionsMap?.[id];
        if (!val) return id;
        if (typeof val === 'string') return val;
        return val[lang] || val.tr || val.en || id;
    };

    const getParameterOptions = (field, ids, optionsMap) => ids.map((id) => ({
        id,
        label: getOptionLabel(optionsMap, id),
        description: getParameterDescription(config.domain, lang, field, id)
    }));

    const chips = [
        {
            key: 'seviye',
            field: 'levels',
            icon: GraduationCap,
            label: domain.ui?.[lang]?.levelLabel || domain.ui?.levelLabel || t.levelLabel || (lang === 'en' ? 'Level' : 'Seviye'),
            shortLabel: lang === 'en' ? 'Level' : 'Seviye',
            value: config.seviye,
            options: getParameterOptions('levels', levelIds, domain.optionSets?.levels || t.levels),
            align: 'left'
        },
        {
            key: 'mod',
            field: 'modes',
            icon: Workflow,
            label: domain.ui?.[lang]?.modeLabel || domain.ui?.modeLabel || t.modeLabel || (lang === 'en' ? 'Mode' : 'Mod'),
            shortLabel: lang === 'en' ? 'Mode' : 'Mod',
            value: config.mod,
            options: getParameterOptions('modes', modeIds, domain.optionSets?.modes || t.modes),
            align: 'left'
        },
        {
            key: 'derinlik',
            field: 'depths',
            icon: Layers,
            label: domain.ui?.[lang]?.depthLabel || domain.ui?.depthLabel || t.depthLabel || (lang === 'en' ? 'Depth' : 'Derinlik'),
            shortLabel: lang === 'en' ? 'Depth' : 'Derinlik',
            value: config.derinlik,
            options: getParameterOptions('depths', depthIds, domain.optionSets?.depths || t.depths),
            align: 'right'
        },
        {
            key: 'format',
            field: 'formats',
            icon: FileText,
            label: domain.ui?.[lang]?.formatLabel || domain.ui?.formatLabel || t.formatLabel || (lang === 'en' ? 'Format' : 'Format'),
            shortLabel: lang === 'en' ? 'Format' : 'Format',
            value: config.format,
            options: getParameterOptions('formats', formatIds, domain.optionSets?.formats || t.formats),
            align: 'right'
        }
    ];

    return (
        <section className="parameter-chips-bar" aria-label={t.contextualTuning || (lang === 'en' ? 'Contextual Tuning' : 'Bağlamsal Ayarlar')}>
            <div className="parameter-chips-list">
                {chips.map((chip) => (
                    <ParameterChip
                        key={chip.key}
                        icon={chip.icon}
                        label={chip.shortLabel}
                        field={chip.field}
                        value={chip.value}
                        options={chip.options}
                        onChange={(newVal) => setConfig(chip.key, newVal)}
                        align={chip.align}
                    />
                ))}
            </div>
        </section>
    );
}
