# SUPER-PROMPT: PREMPT 13-Domain x 30 Modules Data Generator

> **Target AI Model Instructions:** You are acting as a Principal Prompt Architect & Domain Expert. Your task is to generate production-grade, highly structured module data for **PREMPT** — a 100% client-side, zero-API parametric prompt engine and AI router.
> 
> You will generate **30 high-rigor modules** for each of the **13 new target domains** (totaling **390 modules**), with strict 1-to-1 parity between Turkish (`tr`) and English (`en`) data arrays.

---

## 1. PROJECT CONTEXT & ARCHITECTURE

### What is PREMPT?
**PREMPT** (*"Pre-empt bad AI answers before they happen"*) is a deterministic, data-driven prompt compiler. It takes raw human inputs, passes them through modular domain engines, resolves prerequisites via a Directed Acyclic Graph (DAG), topologically sorts them, and compiles a comprehensive prompt to hand off to external AI chat interfaces (**ChatGPT**, **Claude**, **Gemini**, **Perplexity**).

### Core Compilation Pipeline Rules
1. **Zero Fluff & High Epistemic Rigor**: Every module's `prompt` string must be an authoritative, actionable, unambiguous instruction.
2. **DAG Dependency Graph**: Modules can depend on other modules (`requires: ["mod-a", "mod-b"]`). Prerequisites appear *before* dependents in the final compiled prompt.
3. **Layer Depth (`layer`)**: 
   - `layer: 1` — Foundation / Entry / Requirements
   - `layer: 2` — Core Analysis / Execution / Mechanism
   - `layer: 3` — Advanced / Stress-Testing / Audit / Hardening
4. **Bilingual Parity**: For every module in `tr`, an exact matching module in `en` with identical `id`, `category`, `layer`, and `requires` array MUST exist at the exact same index.

---

## 2. THE 13 TARGET DOMAINS & CATEGORIES

You must generate **30 modules per domain** for the following 13 domains:

### 1. `decision` (Karar Alma & Zihinsel Modeller)
- *Categories:* `foundation`, `analysis`, `tradeoff`, `biases`, `execution`
- *Themes:* Second-Order Thinking, Inversion, 2x2 Decision Matrix, Pre-Mortem, Confirmation Bias Removal, Opportunity Cost.

### 2. `academic` (Akademik & Araştırma)
- *Categories:* `methodology`, `literature`, `writing`, `review`, `validation`
- *Themes:* Quantitative/Qualitative Audit, Peer-Review Response, Literature Gap Analysis, Academic Tone Elevate (CEFR C2), Citation Verification.

### 3. `philosophy` (Felsefe & Etik)
- *Categories:* `logic`, `ethics`, `epistemology`, `thought-experiments`, `critique`
- *Themes:* Fallacy Checker, Utilitarian vs Deontological Audit, Ship of Theseus, Socratic Aporia, Dialectic Synthesis.

### 4. `problemsolving` (Yaratıcı Problem Çözme & TRIZ)
- *Categories:* `deconstruction`, `triz`, `lateral`, `scamper`, `evaluation`
- *Themes:* TRIZ Contradiction Matrix, SCAMPER Operator, de Bono 6 Thinking Hats, Root Cause 5-Whys, Morphological Analysis.

### 5. `agentarch` (Meta-Prompt & AI Agent Tasarımı)
- *Categories:* `persona`, `cot`, `guardrails`, `fewshot`, `orchestration`
- *Themes:* System Prompt Architecture, Chain-of-Thought (CoT) Injection, Hallucination Guardrails, Output Format Locking, Variable Ingestion.

### 6. `cyber` (Siber Güvenlik & Tehdit Modelleme)
- *Categories:* `threat`, `appsec`, `audit`, `pentest`, `compliance`
- *Themes:* STRIDE Threat Modeling, OWASP Top 10 Audit, Zero-Trust Spec, Penetration Test Scenario, Vulnerability Remediation.

### 7. `blog` (Blog & Editoryal Analiz - Based on BLOG.md spec)
- *Categories:* `triage`, `evidence`, `dialectic`, `structure`, `anti-patterns`
- *Themes:* Evidence Hierarchy (SAĞLAM/KÜÇÜLDÜ/TARTIŞMALI/BİLİNMİYOR/ÇÖKTÜ), Steelman Opposition, Pop-Culture Cliché Filter, Outline Builder with [YAZIM NOTU].

### 8. `image` (Görsel & Sanat - Midjourney, Flux.1, DALL-E 3, SDXL)
- *Categories:* `medium`, `composition`, `lighting`, `atmosphere`, `parameters`
- *Themes:* Octane Render, 35mm Lens, Volumetric Lighting, Golden Ratio, Midjourney Parameters (`--ar 16:9`, `--v 6.0`, `--stylize`), Negative Prompts.

### 9. `language` (Dil, Çeviri & Nüans)
- *Categories:* `localization`, `register`, `fluency`, `idioms`, `pedagogy`
- *Themes:* Cultural Localization, CEFR B2->C2 Polish, Socratic Language Coach, Idiom & Phrasal Verb Harmonizer, Tone Shift.

### 10. `edudesign` (Eğitmen & Müfredat Tasarımı)
- *Categories:* `taxonomy`, `curriculum`, `assessment`, `engagement`, `rubrics`
- *Themes:* Bloom's Taxonomy Question Generator, Rubric & Scoring Matrix, Lesson Plan Flow, Active Recall Drill Generator.

### 11. `business` (İş & Strateji)
- *Categories:* `validation`, `market`, `unit-economics`, `pitch`, `risk`
- *Themes:* Business Pre-Mortem, SWOT / PESTEL Matrix, Unit Economics Audit, Pitch Deck Framing, Competitor Positioning.

### 12. `wellness` (Sağlık, Form & Sirkadiyen)
- *Categories:* `workout`, `circadian`, `nutrition`, `adaptation`, `habits`
- *Themes:* Personalized Workout Blueprint, Circadian & Light Optimization, Macro Distribution Strategy, Injury Adaptation, Habit Stacking.

### 13. `travel` (Seyahat & Deneyim)
- *Categories:* `curation`, `route`, `culture`, `logistics`, `budget`
- *Themes:* Anti-Tourist Trap Filter, Local Hidden Gem Route, Cultural Etiquette, Walking Distance & Transit Optimizer, Expense Planner.

---

## 3. STRICT JSON / JS MODULE SCHEMA

Every module MUST adhere to the following schema:

```typescript
interface Module {
  id: string;          // Kebab-case unique string (e.g., "second-order-thinking")
  icon: string;        // Emoji icon (e.g., "🧠")
  name: string;        // Short title (2-4 words)
  category: string;    // One of the domain's 5 category IDs
  description: string; // One sentence explaining what this module adds
  layer: 1 | 2 | 3;    // Topological depth layer
  requires: string[];  // Array of prerequisite module IDs within the domain
  prompt: string;      // Authoritative, concrete prompt instruction block
}
```

### Example Module Definition (Turkish):
```javascript
{
  id: "second-order-thinking",
  icon: "🔮",
  name: "İkinci Derece Etkiler",
  category: "analysis",
  description: "Kararın 6 ay ve 2 yıl sonraki dolaylı sonuçlarını ve kelebek etkilerini analiz eder.",
  layer: 2,
  requires: ["decision-framing"],
  prompt: "İkinci derece etkileri analiz et: Bu kararın veya hipotezin doğrudan sonuçlarının ötesine geç. (a) 6 ay sonra ortaya çıkacak dolaylı etkileri, (b) 2 yıl sonra sistemde oluşacak kelebek etkilerini ve (c) geri tepme risklerini (perverse incentives) açıkça haritalandır."
}
```

---

## 4. GENERATION INSTRUCTIONS FOR THE AI

1. Generate the data in clean JavaScript array export format: `export const domainModules = [...]`.
2. Produce **all 30 modules** for each domain without placeholders, comments like `"// rest of modules..."`, or truncation.
3. Ensure every `requires` reference points to an existing module `id` within the same domain (no dangling references).
4. Maintain perfect **TR / EN** array length and ID symmetry.
5. Focus on professional engineering quality, deep analytical phrasing, and practical real-world utility.
