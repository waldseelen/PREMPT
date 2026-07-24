# 🤖 Agent System Instructions

> **Note to AI Agents / Autonomous Coders:** If you are reading this file, you have been assigned to maintain, upgrade, or debug the `PROMPTER` repository. Please adhere to the following rules and architectural constraints.

## 🎯 Project Identity
This is not a generic "Prompt Builder." It's a parametric prompt engineer serving two domains today —
**Learning** (deeply map concepts, deconstruct systems, provide structured cognitive scaffolding) and
**Code** (software-engineering prompting: design, build, review, harden, ship) — with room to add more.
Both domains compile through the same engine/compiler pipeline; only the content feeding it is
domain-sourced. See `ARCHITECTURE.md`'s "Multi-Domain Architecture" section and `src/domains/` before
touching anything domain-specific.

## 🧱 Architectural Directives

1. **Strict Separation of Concerns**
   - **UI Components (`src/ui`)**: Must remain DUMB. Do NOT put logic for prompt generation, length calculation, or state mutation (other than dispatching) in the React components.
   - **Engine (`src/engine`) & Compiler (`src/compiler`)**: All business logic (prompt generation, string manipulation, validation, dependency resolution) lives here.
   - **Data (`src/data`)**: Modules are strictly configuration objects. NEVER put functions or logic inside `modules_en.json` / `modules_tr.json`.

2. **No "God Components"**
   - Do not combine UI elements into a massive `App.jsx`. Use the existing component splits (e.g., `ConfigPanel.jsx`, `ModuleGrid.jsx`, `ActionBar.jsx`).

3. **State Management**
   - Use the existing **Zustand** store (`src/store/engineState.js`).
   - Do not introduce React Context or Redux. Zustand handles persistence (`localStorage`) out of the box. Use it.

4. **Adding New Features / Modules**
   - Modules are per-domain. To add a Learning module, append a new object at the same index to both
     `src/data/modules_en.json` and `src/data/modules_tr.json`. To add a Code module, do the same to
     `src/data/modules_code_en.json` and `src/data/modules_code_tr.json`. Same `id`, same order, in
     both files of the pair. The UI will automatically render it, and the Engine will automatically
     compile it.
   - `layer` must be one of the target domain's layer ids, defined in `src/domains/{learning,code}.js`
     — not a fixed global enum.
   - If a new module depends on another module in the *same* domain to make sense (e.g., "Scale
     Analysis" requires "Mechanism"), add the dependency to the `requires: ['mekanizma']` array.
   - Run `npm run validate` after editing any of these files — it checks TR/EN parity, required
     fields, and `requires` references, independently per domain.
   - Adding a whole new domain (a 3rd one beyond Learning/Code) means a new descriptor in
     `src/domains/`, registered in `src/domains/index.js`, plus its own module data, i18n strings
     (`src/locales/i18n.js`), compiler text (`src/locales/compilerTexts.js`), and presets
     (`src/engine/presetEngine.js`) — no other engine or UI code should need to change.

5. **Theme & CSS**
   - The project uses **Pure CSS** with custom properties mapped to HTML `data-theme="light|dark"`.
   - **DO NOT install Tailwind CSS** or styled-components unless explicitly instructed by the human user.
   - Respect the *Glassmorphism* design aesthetic.

## ⚠️ Hard Constraints
- **URL Length Limits**: AI services (Gemini, ChatGPT) have URL character limits. The `openInAI` helper in `src/utils/aiRouter.js` enforces a 4000-char guard before calling `window.open`, falling back to `copyToClipboard` when the prompt is too long. Follow that path for any new provider.
- **Monologue Mode**: The system supports internal reasoning (`<thinking>`). Ensure prompt templates do not explicitly contradict the monologue instructions injected by the engine.

If you understand these constraints, proceed with your task. Focus on modularity, determinism, and UI performance.
