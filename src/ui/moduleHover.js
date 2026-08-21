export function getModuleHoverModel(module, modules, translations) {
    const requirements = (module.requires || []).map((requirementId) => ({
        id: requirementId,
        name: modules.find((candidate) => candidate.id === requirementId)?.name || requirementId
    }));

    return {
        title: module.name,
        icon: module.icon,
        description: module.desc || module.explain || '',
        promptPreview: module.prompt
            ? module.prompt.length > 130
                ? `${module.prompt.slice(0, 130)}...`
                : module.prompt
            : '',
        requirements,
        requirementsLabel: translations.reqsLabel
    };
}
