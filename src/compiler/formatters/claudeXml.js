import { LABEL_TO_TAG } from './labelTags';

function indent(text) {
    return text.split('\n').map((line) => `    ${line}`).join('\n');
}

// Still plain pasteable text (Claude reads XML-tagged prompts natively), so
// this target stays compatible with aiRouter's clipboard/?q= hand-off —
// unlike the OpenAI-JSON target, which is not.
export function formatClaudeXml(structure) {
    let out = '<prompt>\n';
    for (const [blockLabel, content] of Object.entries(structure)) {
        const tag = LABEL_TO_TAG[blockLabel] || 'block';
        out += `  <${tag}>\n${indent(content)}\n  </${tag}>\n`;
    }
    out += '</prompt>';
    return out;
}
