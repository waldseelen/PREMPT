// Default target formatter — this is the pre-Tier-B behavior verbatim,
// extracted out of finalPromptAssembler.js so it can sit alongside the other
// targets behind the same dispatch.
export function formatMarkdown(structure) {
    let out = '';
    for (const [blockLabel, content] of Object.entries(structure)) {
        out += `${blockLabel}\n${content}\n\n`;
    }
    return out.trim();
}
