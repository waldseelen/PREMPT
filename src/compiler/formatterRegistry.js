import { formatMarkdown } from './formatters/markdown';
import { formatClaudeXml } from './formatters/claudeXml';
import { formatOpenAiJson } from './formatters/openaiJson';

export const FORMATTERS = {
    markdown: formatMarkdown,
    'claude-xml': formatClaudeXml,
    'openai-json': formatOpenAiJson
};

export function getFormatter(targetId) {
    return FORMATTERS[targetId] || FORMATTERS.markdown;
}
