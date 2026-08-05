# Handoff: PROMPTER AI Query Deep-Link Issue & Root Cause Analysis

## Executive Summary
In the **PROMPTER** project (`https://github.com/waldseelen/PROMPTER`), clicking external AI provider buttons (**ChatGPT**, **Claude**, **Gemini**, **Perplexity**) fails to pre-fill the chat input box in the newly opened browser tab, even when the generated prompt length is under 4000 characters (`< 4000`).

---

## Technical Root Cause Analysis

### 1. `encodeURIComponent` Expansion & URL Query Limits (~2048 Bytes)
- While `src/utils/aiRouter.js` checks `prompt.length > 4000`, it evaluates raw string character count.
- PROMPTER prompts contain rich markdown formatting (`#`), XML tags (`<thinking>`, `<instructions>`), newlines (`\n`), and non-ASCII characters.
- `encodeURIComponent(prompt)` expands special characters into 3-byte sequences (`%0A`, `%3C`, `%3E`, `%23`), expanding a **1,500-character prompt into a 4,500+ byte URL string**.
- Major web browsers (Chrome, Edge, Safari) and web app frontends truncate or drop URL query parameters (`?q=`) when the total URL length exceeds **~2048 characters**.

### 2. Missing Clipboard Fallback on the `< 4000` Path
- In the original `openInAI` implementation:
  ```javascript
  if (isTooLongForUrl) {
      // Calls copyToClipboard() and opens base URL
      return;
  }
  // Opens URL with ?q= WITHOUT calling copyToClipboard()
  window.open(strategy.getPromptUrl(prompt), '_blank');
  ```
- When the URL parameter was truncated or ignored by the AI provider, the input box opened blank AND nothing was copied to the clipboard, leaving the user with no prompt to paste (`Ctrl+V`).

### 3. Provider-Specific URL Query Parameter Support
- **Claude (`claude.ai`)**: The web UI does not parse `?q=` query parameters natively; it opens a blank chat interface.
- **Gemini (`gemini.google.com`)**: The web UI ignores `?prompt=` parameters on `gemini.google.com/app`.
- **ChatGPT & Perplexity**: Support `?q=`, but require clean encoding and short total URL length (< 2000 chars).

---

## Recommended Solution

Update `src/utils/aiRouter.js` with the following strategy:

1. **Synchronous Window Open**: Execute `window.open` synchronously as the first step inside `openInAI` to avoid browser popup blockers (conforms to `CLAUDE.md` Rule #9).
2. **Universal Clipboard Fallback**: Always call `copyToClipboard(prompt)` on every AI button click so `Ctrl+V` (Paste) is guaranteed to work even if the web app ignores the URL parameter.
3. **Encoded URL Length Guard**: Check `encodedUrl.length <= 2000` rather than `rawPrompt.length <= 4000`.
4. **Provider-Specific Routing**: Open base URLs for providers that ignore query parameters (Claude, Gemini) while supplying query URLs for ChatGPT/Perplexity when within URL length limits.

---

## Key Files & References
- **Router Logic**: `src/utils/aiRouter.js`
- **UI Trigger**: `src/ui/ActionBar.jsx`
- **Repo Guidelines**: `CLAUDE.md` (See rule #9 regarding synchronous popup window ordering)
