# ⚡ PREMPT — Parametric Prompting Operating System

> **"Pre-empt bad AI answers before they happen."**

PREMPT is a zero-API, 100% client-side React 19 application that acts as a parametric operating system for prompting. Instead of typing one-off ambiguous prompts, you assemble modular prompt blocks which the engine compiles into a single, highly structured, production-grade prompt — then hands off to your AI chat tool of choice (ChatGPT, Claude, Gemini, or Perplexity).

There is **no backend**. Everything runs locally in the browser: state lives in `localStorage`, and every hand-off to an external AI tool happens via URL query parameters or clipboard copy.

---

## ✨ Key Features & Architecture Highlights

- **15 Parametric Domains & 450+ Modules**:
  PREMPT ships 15 dedicated parametric domains organized into 5 major categories:
  - 🧠 **Düşünce & Mantık**: `learning` (Öğrenme), `decision` (Karar Alma), `problemsolving` (TRIZ & Problem Çözme)
  - 🔬 **Akademi & Felsefe**: `academic` (Akademik Araştırma), `philosophy` (Felsefe & Etik), `edudesign` (Eğitim Tasarımı)
  - 💻 **Mühendislik & AI**: `code` (Kod Mühendisliği), `agentarch` (AI Agent & System Prompt), `cyber` (Siber Güvenlik)
  - 🎨 **İçerik, Sanat & Dil**: `blog` (Blog & Editoryal), `image` (Görsel & Sanat), `language` (Dil & Çeviri)
  - 💼 **İş & Yaşam Ops**: `business` (İş & Strateji), `wellness` (Sağlık & Form), `travel` (Seyahat & Rota)

- **180 Handcrafted Domain Presets (15 Domains x 12 Presets Each)**:
  Every domain contains 12 handcrafted, domain-specific presets grouped into 3 structural categories. In a single click, load ready-made module bundles and parameter locks (from *Reviewer #2 Stress Test* in Academic to *Zero-Hallucination Guardrail* in Agent Arch and *Cinematic 35mm Realism* in Image).

- **Unified Single Viewport Layout**:
  No multi-stage landing screen. All controls (`TopicInput`, `PresetBar`, `ModuleGrid`, `ConfigPanel`, `ActionBar`, `PreviewPanel`) render in a single unified viewport.

- **Sleek Horizontal Header Domain Bar**:
  Switch instantly between all 15 domains via a 5-group x 3-domain horizontal navigation bar right in the header, with distinct accent color themes (Indigo, Emerald, Amber, Rose, Cyan), active glow badges, and overflow protection.

- **Dynamic Dependency Graph Resolution (DAG)**:
  Modules declare prerequisites as a directed acyclic graph. Selecting a module automatically resolves transitively required modules and topologically sorts them so prerequisites appear before dependents.

- **⚡ Prompt Injection Preview Tooltips**:
  Hovering over module cards shows live prompt injection code snippets and dependency requirements (`🔗 Requires`).

- **Smart AI Router with URL-length Guard**:
  One-click export to ChatGPT, Claude, Gemini, or Perplexity. A built-in 4000-character guard opens the chat URL and copies the prompt to your clipboard if the prompt exceeds URL safety limits.

- **Bilingual TR / EN Support**:
  Full parallel Turkish and English support across all UI labels, module cards, option sets, compiler headers, and preset descriptions.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run the dev server (http://localhost:3000)
npm run dev

# Validate module datasets across all 15 domains
node scripts/validate-modules.mjs

# Build production bundle (dist/)
npm run build
```

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **State Management**: Zustand v5 (`localStorage` persist middleware)
- **Icons**: Lucide React
- **Styling**: Pure Vanilla CSS (CSS custom properties, Glassmorphism, Zero Tailwind)
- **Deployment**: Static SPA bundle on Vercel (`vercel.json`)

---

## 📚 Deeper Documentation

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — Unified 15-domain spec architecture, single viewport layout, compiler pipeline, and file tree.
- [`PROGRESS.md`](./PROGRESS.md) — Active gate status, verification logs, and session history.
- [`CLAUDE.md`](./CLAUDE.md) — Development guidelines and rules.
