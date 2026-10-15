// Single source for every URL-length decision in the app (Phase 18.1).
// Two named limits, not one number, because they guard different risks:
// - PROMPT_URL_MAX_LENGTH applies to the FINAL URL string handed to the AI
//   chat tool (chatgpt/perplexity/gemini `?q=` links). Both the preview badge
//   and the router must measure this same string, or one says "safe" while
//   the other falls back to copy.
// - SHARE_URL_WARN_LENGTH applies to ?share= links we generate: some platforms
//   truncate very long URLs, so this is a warning threshold, not a gate.
export const PROMPT_URL_MAX_LENGTH = 4000;
export const SHARE_URL_WARN_LENGTH = 2000;

// Measures exactly what openInAI will open. Keep both callers on this helper.
export function isPromptUrlSafe(url) {
    return typeof url === 'string' && url.length <= PROMPT_URL_MAX_LENGTH;
}

// Badge-side estimate: the chat-tool base URL is short, so the encoded
// prompt plus a fixed margin decides the same way the router does
// (4000 - 200 margin = the historical 3800, now derived, not magic).
const BASE_URL_MARGIN = 200;

export function isPromptTextUrlSafe(text) {
    try {
        return encodeURIComponent(text).length + BASE_URL_MARGIN <= PROMPT_URL_MAX_LENGTH;
    } catch {
        return text.length <= SHARE_URL_WARN_LENGTH;
    }
}
