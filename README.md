# 🧠 PROMPTER — The Learning OS

PROMPTER is a client-side React application that acts as an "Operating System" for prompting. Instead of typing one-off prompts, you mix and match modular components which the engine compiles into a single, large, highly-structured prompt — then hands off to your AI chat tool of choice (ChatGPT, Claude, Gemini, or Perplexity).

There is **no backend**. Everything runs in the browser: state lives in `localStorage`, and every hand-off to an external AI happens through a URL query parameter or a clipboard copy.

## ✨ Key Features

- **Two parallel domains, one engine**: PROMPTER ships two prompting domains that share the same compiler pipeline:
  - **Learning** (35 modules) — deconstruct, analyze, and understand any concept, with modules like *Ontology (First Principles)*, *Hidden Assumptions*, *Causal Necessity*, *Paradox Mode*, and *Thought Experiments*.
  - **Code** (32 modules) — software-engineering prompting across five phases: *design, build, comprehend, harden, ship* (threat modeling, auth design, concurrency, observability, CI/CD, and more).
  You switch between them with a Learn | Code pill, and each domain resets to its own sensible defaults.
- **Dynamic Dependency Resolution**: Modules declare prerequisites as a dependency graph (DAG). Selecting a module can auto-add the modules it depends on, and the compiler topologically sorts them so prerequisites always appear before dependents in the final prompt.
- **One-Click Presets**: 12 curated presets per domain, grouped by intent, load a ready-made module bundle plus matching configuration in a single click — from *Rapid Grasping* and *Deep Analysis* on the Learning side to *Test Strategy*, *Security Review*, and *Legacy Modernization* on the Code side.
- **Internal Monologue (Reasoning) Mode**: Optionally force the AI to use internal `<thinking>` tags to evaluate boundary conditions from multiple perspectives before producing its final answer.
- **Smart AI Router with a URL-length guard**: One-click export to ChatGPT, Claude, Gemini, or Perplexity. A built-in 4000-character guard detects prompts too long to pass safely through a URL and falls back to opening the bare chat page and copying the prompt to your clipboard instead — avoiding browser URL-limit crashes and popup blockers.
- **Recipes, Share Links & Export/Import**: Save reusable setups as local recipes, share a frozen setup as a `?share=` link, or export/import a setup as JSON. All three use one safe serialization format that gracefully repairs stale or hand-edited data.
- **Bilingual data (TR / EN)**: Every domain ships parallel English and Turkish module sets and UI/prompt text. The display language is independent of the internal state model.
- **Adaptive Glassmorphism UI**: A fully responsive, pure-CSS interface with a Light / Dark / System theme engine.
- **State Persistence**: Your configuration, selected modules, and preferences are saved automatically to your browser's `localStorage` via Zustand's persist middleware.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Production build
npm run build

# Preview the production build
npm run preview

# Validate module data (TR/EN parity, required fields, dependency refs)
npm run validate
```

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **State Management**: Zustand v5 (with persist middleware, `localStorage`)
- **Styling**: Pure CSS (custom properties, CSS Grid, glassmorphism, animations)
- **Deployment**: Static HTML/JS/CSS bundle, zero backend required (SPA deploy on Vercel).

## 🤝 Philosophy

This is not a simple "prompt generator." It is a **prompting operating system**. The engine is deterministic and data-driven: modules are pure configuration, all "thinking" (dependency resolution, suggestions, prompt assembly, presets) lives in the engine and compiler, and the UI is a thin renderer over a single Zustand store. Adding a new module — or even a whole new domain — is largely a matter of adding data.

## 📚 Deeper Documentation

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — full file tree, strict layering, the multi-domain design, state shape, and the compilation pipeline.
- [`CLAUDE.md`](./CLAUDE.md) — guidance for working in this repository (commands, layering rules, how to add modules/domains/presets).
- [`AGENT.md`](./AGENT.md) — hard constraints and directives for AI coding agents.
