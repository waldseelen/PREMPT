# 🤖 Agent System Instructions

> **Note to AI Agents / Autonomous Coders:** If you are reading this file, you have been assigned to maintain, upgrade, or debug the `Learning OS` repository. Please adhere to the following rules and architectural constraints.

## 🎯 Project Identity
This is not a generic "Prompt Builder." It is a **Parametric Learning OS**. 
The goal is to deeply map concepts, deconstruct systems, and provide structured cognitive scaffolding using advanced LLMs. 

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
   - To add a new learning module, append a new object at the same index to both `src/data/modules_en.json` and `src/data/modules_tr.json` (same `id`, same order in both files). The UI will automatically render it, and the Engine will automatically compile it.
   - If a new module depends on another module to make sense (e.g., "Scale Analysis" requires "Mechanism"), add the dependency to the `requires: ['mekanizma']` array.
   - Run `npm run validate` after editing either file — it checks TR/EN parity, required fields, and `requires` references.

5. **Theme & CSS**
   - The project uses **Pure CSS** with custom properties mapped to HTML `data-theme="light|dark"`.
   - **DO NOT install Tailwind CSS** or styled-components unless explicitly instructed by the human user.
   - Respect the *Glassmorphism* design aesthetic.

## ⚠️ Hard Constraints
- **URL Length Limits**: AI services (Gemini, ChatGPT) have URL character limits. Always use the `checkPromptLength` utility in `promptCompiler.js` before calling `window.open`. Fallback to clipboard `copyToClipboard` when necessary.
- **Monologue Mode**: The system supports internal reasoning (`<thinking>`). Ensure prompt templates do not explicitly contradict the monologue instructions injected by the engine.

If you understand these constraints, proceed with your task. Focus on modularity, determinism, and UI performance.
