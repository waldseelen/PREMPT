# MEMORY.md

Durable, non-obvious facts about how this repository actually behaves. Traps,
asymmetries, and things that look one way in the file tree and behave another.

No dates, no ✅, no version pins here — those belong in `PROGRESS.md`. Structure
and layout belong in `ARCHITECTURE.md`; binding rules belong in `CLAUDE.md`.

## Files that are not what they look like

- `legacy/learning-os.html` is a self-contained, pre-React single-file version of
  this app. Nothing imports it and it is not referenced by `index.html`,
  `vite.config.js`, or any source file — it is **not part of the build**. Read it
  as historical reference only; changing it changes nothing that ships.
- `src/App.css` is imported by **nothing**. `main.jsx` imports `./index.css` and
  `App.jsx` also imports `./index.css`; no file imports `App.css`. It still
  contains Vite-scaffold leftovers (`.counter`, `.hero`, …), so it reads like
  live styling but has zero effect on the rendered app. All real styling is in
  `src/index.css`.
- `design-mockup.html` at the repo root and the contents of `tmp/` are not
  referenced by the build either.

## Silent-fallback helpers — nothing throws where you expect it to

- `sanitizePayload` (`src/utils/statePayload.js`) **never throws**. Every invalid
  field is silently resolved to a safe default: an unknown `domain` falls back to
  the default domain, unknown module ids are filtered out of `selectedModules`,
  an out-of-vocabulary `seviye`/`mod`/`derinlik`/`format` falls back to that
  domain's `defaultConfig`, an unknown `hedef` falls back to `markdown`, and an
  unknown `activePreset` becomes `null`. Consequence: a hand-edited or stale
  share link cannot crash the app — but it also cannot report that it was
  wrong. Do not add a throw here expecting a caller to catch it; there is no
  catch.
- `decodePayloadFromParam` returns `null` on malformed base64/JSON rather than
  throwing. Callers treat `null` as "no shareable state present".
- `getDomain(id)` (`src/domains/index.js`) returns the Learning descriptor for
  any unknown id. It never returns `undefined`, so a typo'd domain id produces
  Learning behavior rather than an error.
- `getModuleRegistry(domain, lang)` (`src/engine/moduleRegistry.js`) falls back
  the same way twice: an unknown domain yields the Learning registry, and an
  unknown lang yields the `tr` array. A wrong domain string silently returns the
  wrong module set.
- `getFormatter` (`src/compiler/finalPromptAssembler.js`) falls back to the
  markdown formatter for any unknown `hedef`.
- A module card's icon comes from `moduleIcons[mod.id] || Box` in
  `src/ui/ModuleGrid.jsx` — a hand-maintained lucide map keyed by module id. Add
  a module without adding its entry there and it renders the generic `Box` icon,
  silently. The `icon` field inside the module JSON (an emoji) is required and
  non-empty-checked by `scripts/validate-modules.mjs`, but **no code reads it**;
  it is inert data, so filling it in does not give the new module an icon.
- `assembleFinalPrompt` returns the empty string `""` — not `null`, not a
  partial prompt — when `config.konu` is empty or `selectedModules` is empty.
  Every caller must treat `""` as "nothing to do"; `ActionBar` and `PreviewPanel`
  both guard on it.

The one real throw in the compile path is `topologicalSort`, which throws on a
circular `requires` chain. It surfaces as a render error caught by
`src/ui/ErrorBoundary.jsx`.

## Asymmetries that bite

- `resolveDependencies` returns an array of **id strings**; `sortDependencies`
  returns an array of **module objects**. They are neighbors in the same file
  with near-identical names, and downstream code depends on the difference —
  `analyzePromptComplexity` reads `m.layer` off the sorted result.
- The dependency graph cache is a `Map` keyed by the template string
  `` `${domain}:${lang}` `` — not a per-language singleton. Adding a domain needs
  no change to `dependencyResolver.js`. The cache is never invalidated, which is
  safe only because module data is statically imported JSON.
- `config.hedef` is global and domain-agnostic, while `seviye`/`mod`/`derinlik`/
  `format` are domain-scoped. `hedef` is deliberately absent from every domain
  descriptor's `defaultConfig` so `setDomain`'s spread cannot reset it.
- The valid `hedef` ids are declared **three times**, in three files,
  deliberately: `VALID_TARGETS` in `src/utils/statePayload.js`, the `FORMATTERS`
  dispatch table in `src/compiler/finalPromptAssembler.js`, and the module-level
  `TARGET_IDS` literal in `src/ui/ConfigPanel.jsx` (kept local so `ui/` does not
  import from `compiler/`). Adding an output target means editing all three.
  Nothing checks that they agree.

## Persistence behavior

- Only `config` and `savedRecipes` are persisted (`partialize`).
  `selectedModules`, `activePreset`, `injectedRules`, `dependencyHints`,
  `showTour`, and `view` are session-only and start empty on every load. Code
  that assumes a reload restores the user's module selection is wrong.
- `theme`, `lang`, and `tourCompleted` are deliberately excluded from **every**
  payload — recipes, share links, and JSON export alike. They describe the
  recipient's environment, not a shared setup. Never add them to
  `serializeState`.
- Saved recipes are capped by `MAX_RECIPES` and trimmed with `.slice(-MAX_RECIPES)`
  on save, so the oldest recipe is dropped silently once the cap is reached — no
  warning, no toast.
- Recipes save without topic text (`includeTopic: false`); share links and JSON
  export include it (`includeTopic: true`). Same payload shape, different flag.

## State-reset semantics

- `setDomain` is the **only** action that resets the domain-specific config
  fields (`seviye`/`mod`/`derinlik`/`format`) to a domain's `defaultConfig`. It
  also clears `selectedModules`/`activePreset`/`injectedRules`/`dependencyHints`.
  It early-returns an empty object when the target domain equals the current one.
- Selection state is *also* cleared by `clearAll` (which additionally wipes
  `konu`/`alan`) and by `startManual` (which leaves `konu`/`alan` alone). So
  "only `setDomain` resets selection" is not quite true — what is unique to
  `setDomain` is the config-field reset and the route push.
- `loadRecipe` and `applySharedState` deliberately do **not** call `setDomain`,
  because `setDomain`'s job is to wipe state on a manual switch — the opposite of
  restoring a saved setup. Each pushes the route itself instead. If you ever
  refactor them to reuse `setDomain`, the restored selection is erased
  immediately after being set.
- `toggleModule` clears `activePreset` on every manual change; any hand edit
  breaks preset purity by design.

## Browser-quirk workarounds that look removable

- In `openInAI` (`src/utils/aiRouter.js`), `window.open` is called
  **synchronously** before the clipboard write on the too-long-for-URL path.
  This ordering exists to stay inside the user-gesture window so popup blockers
  do not eat the tab. Awaiting or reordering breaks it, and it breaks only in
  real browsers under a real click — never in a code review.
- `copyToClipboard` has a `document.execCommand('copy')` textarea fallback for
  environments without `navigator.clipboard` (non-secure contexts). It is dead on
  HTTPS and load-bearing on plain HTTP.
- `App.jsx`'s mount effect strips `?share=` from the URL with `replaceState`
  **before** attempting to decode it, so a corrupt payload cannot get stuck
  re-failing on every reload.
- The share-link and pathname-sync paths live in **one** effect with an explicit
  branch, not two effects. Split apart, the pathname sync's `setDomain` would
  wipe the share payload's modules right after `applySharedState` set them.

## Output-target coupling

- The `openai-json` target produces an API-shaped payload, not pasteable chat
  text. `src/ui/ActionBar.jsx` therefore passes `forceTarget: 'markdown'` to
  `assembleFinalPrompt` for the AI deep-link buttons specifically, and shows a
  warning toast. The comment in `src/compiler/formatters/openaiJson.js` and that
  guard are a paired contract — change one and the other silently becomes wrong.
- `analyzePromptComplexity` runs the **same** formatter as the real output, so
  the character count and the URL-length warning reflect what will actually be
  copied. Changing a formatter changes the stats and the warning threshold
  behavior together.

## Prompt-text conventions

- Preset `injectRules` strings are written in English in
  `src/engine/presetEngine.js` regardless of the UI language — `structureBuilder`
  appends each one to the constraints block as `PRESET RULE: <string>`, untranslated
  and not routed through `compilerTexts.js`.
- `'otomatik'` is reused as a level id across both domains on purpose, so
  `structureBuilder`'s "the AI will determine this" special case can stay
  domain-agnostic. It is the *only* overlap between the two `levelIds` lists;
  `modeIds` and `formatIds` are disjoint. The `depthIds` lists, by contrast, are
  **identical** in both descriptors (`orta`, `temel`, `derin`,
  `kapsamli`), so `sanitizePayload`'s `fallbackOrValid(raw?.derinlik, …)` accepts
  a `derinlik` carried over from the other domain without flagging it.
- `intelligenceLayer.js` rules are domain-scoped because they reference concrete
  module ids; a Learning rule evaluated in the Code domain would suggest a module
  id that does not exist and break the compiler downstream.
