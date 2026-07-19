# 🏛️ Architecture Overview

The **Learning OS** is designed with a strict separation of concerns, ensuring that the UI remains a dumb renderer while the core logic is handled by a dedicated engine.

## 📁 Directory Structure

```text
src/
 ├── ui/             # Pure UI rendering layer (Components, Pages, Modals)
 ├── engine/         # Prompt compilation and intelligence layer
 ├── compiler/       # Assembly of final prompts (DAG traversal, String interpolation)
 ├── data/           # Data-driven definitions (Modules, Presets)
 ├── store/          # Global state management (Zustand)
 ├── utils/          # Helpers (AI Routing, Clipboard)
 ├── App.jsx         # Root component & Theme Controller
 └── index.css       # Core styling & Theme variables
```

## ⚙️ Core Layers

### 1. The Engine & Compiler (`src/engine/` & `src/compiler/`)
This is the brain of the application. It never touches the DOM.
- **Dependency Resolver**: Iterates recursively over the selected modules to find and inject required dependencies using Topological Sort.
- **Structure Builder**: Assembles the final string. It injects the system role, formatting rules, user depth/level parameters, internal monologue commands, and concatenates the selected module prompts in a deterministic order.
- **Intelligence Layer**: Uses a Declarative Rules Engine to suggest modules to the user based on their current configuration.

### 2. The Data Layer (`src/data/modules_en.json` + `src/data/modules_tr.json`)
Modules live in two parallel, bilingual JSON files (one per language), loaded via
`src/engine/moduleRegistry.js` (`getModuleRegistry(lang)` / `getModuleById(id, lang)`).
The two files must stay in sync: identical `id` set in identical order. Modules are strictly
data objects — no logic is executed here.
```javascript
{
    id: 'mekanizma',
    icon: '⚙️',
    name: 'Mekanizma',
    desc: 'Girdi → Süreç → Çıktı',
    explain: 'Sistemin nasıl çalıştığını adım adım açıklar.',
    requires: ['ontoloji'], // Dependency definition
    prompt: `MEKANİZMA\nSistemin çalışma mekanizmasını...`,
    layer: 'mechanism'     // foundation | mechanism | context | boundaries | application
}
```
This data-driven approach means adding a new feature/module requires exactly zero changes to the UI or Engine logic.

**Validation:** run `npm run validate` (`scripts/validate-modules.mjs`) to guard against silent
drift — it checks TR/EN parity (same ids, same order), required fields, valid `layer` values,
and that every `requires` entry points to an existing module.

### 3. State Management (`src/store/engineState.js`)
Powered by **Zustand**. 
- Holds the `config` object (Topic, Domain, Level, Mode, Depth, Format, Theme, Monologue, Auto-Resolve).
- Holds `selectedModules` array.
- Handled with the `persist` middleware, ensuring state is perfectly synced to `localStorage`.

### 4. UI Layer (`src/ui/`)
- **`App.jsx`**: Acts as the layout wrapper and dynamically modifies the `<html data-theme="X">` attribute based on OS system preferences. Includes Error Boundaries to prevent unhandled graph errors.
- **`ModuleGrid.jsx`**: Renders the data array into interactive cards. Handles hover events to show requirements and tooltips.
- **`ActionBar.jsx`**: Triggers the engine compiler and talks to the AI Router.
- **`Toast.jsx`**: A custom, lightweight notification system.

## 🔗 AI Router (`src/utils/aiRouter.js`)
Handles the translation of the generated prompt into actionable endpoints using a Strategy Pattern:
- Generates GET parameterized URLs for Gemini, ChatGPT, Claude, and Perplexity using provider-specific strategies.
- Intercepts URLs that are too long, gracefully copying to the clipboard synchronously to bypass popup blockers, and opening the base chat interface.
