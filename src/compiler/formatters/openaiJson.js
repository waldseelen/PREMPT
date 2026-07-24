import { LABEL_TO_TAG } from './labelTags';

// Produces an OpenAI-style system-message payload, NOT pasteable chat text.
// This target is copy-only / API-oriented by design — aiRouter's deep-link
// buttons must not URL-encode this into a chat query (see ActionBar.jsx's
// TEXT_TARGETS guard, which falls the AI buttons back to Markdown for this
// target instead).
export function formatOpenAiJson(structure) {
    const sections = {};
    for (const [blockLabel, content] of Object.entries(structure)) {
        sections[LABEL_TO_TAG[blockLabel] || blockLabel] = content;
    }

    const systemContent = Object.entries(structure)
        .map(([blockLabel, content]) => `${blockLabel}\n${content}`)
        .join('\n\n');

    const payload = {
        messages: [
            { role: 'system', content: systemContent }
        ],
        sections
    };

    return JSON.stringify(payload, null, 2);
}
