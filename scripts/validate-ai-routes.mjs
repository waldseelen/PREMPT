import assert from 'node:assert/strict';
import { AI_STRATEGIES } from '../src/utils/aiRouter.js';

const prompt = 'Türkçe özel karakterler: İstanbul’da 7 günlük plan & bütçe';

const chatgptUrl = AI_STRATEGIES.chatgpt.getPromptUrl(prompt);
assert.equal(new URL(chatgptUrl).searchParams.get('q'), prompt);
assert.equal(new URL(chatgptUrl).hostname, 'chatgpt.com');

const perplexityUrl = AI_STRATEGIES.perplexity.getPromptUrl(prompt);
assert.equal(new URL(perplexityUrl).searchParams.get('q'), prompt);
assert.equal(new URL(perplexityUrl).pathname, '/search/new');

const geminiUrl = AI_STRATEGIES.gemini.getPromptUrl(prompt);
assert.equal(new URL(geminiUrl).searchParams.get('q'), prompt);
assert.equal(new URL(geminiUrl).hostname, 'gemini.google.com');

assert.equal(AI_STRATEGIES.claude.supportsQuery, false);
assert.equal(typeof AI_STRATEGIES.claude.getBaseUrl, 'function');

for (const [name, strategy] of Object.entries(AI_STRATEGIES)) {
    assert.equal(typeof strategy.getBaseUrl, 'function', `${name} must define a base URL`);
    assert.match(strategy.getBaseUrl(), /^https:\/\//, `${name} base URL must be HTTPS`);
}

console.log('✓ AI route strategies passed (query encoding, provider paths, and clipboard fallback contract).');
