# TASKS.md

The execution source of truth and the **only** file in this repository that
carries checkboxes (`CLAUDE.md` §3). Execute only `[ ]` items. `[x]` means
completed **or intentionally skipped** — never redo or re-audit a closed item
unless it is explicitly reopened.

Every item below was derived from something read in this repository — a
documented limitation or a verified mismatch between a document and the source.
Nothing here is speculative feature work.

## Phase 1 — Close the preset validation gap

- [x] 1.1 Extend `scripts/validate-modules.mjs` to validate preset contents.
      Acceptance: a preset with a bogus `forceModules` id, an out-of-vocabulary
      `override` value, or an unknown `group` makes `npm run validate` exit
      non-zero with a message naming the domain and preset id. This gap is
      documented in `CLAUDE.md` §2 and in `ARCHITECTURE.md`'s "Multi-Domain
      Architecture" section as producing a silently broken prompt at runtime.
    - [x] 1.1.1 Import `getPresets` into the validator and resolve module ids from each domain's loaded registry, without hardcoding `learning`/`code`.
        Acceptance: the script reads presets for every domain in `DOMAINS`
        without hardcoding `learning`/`code`.
  - [x] 1.1.2 Check every `forceModules` id exists in that domain's registry.
        Acceptance: an unknown id is reported as an error with its preset id.
    - [x] 1.1.3 Check every `override` key's value against the domain descriptor's `modeIds`/`levelIds`/`depthIds`/`formatIds`.
        Acceptance: an out-of-vocabulary value is reported as an error.
  - [x] 1.1.4 Check every preset's `group` is defined in
        `domain.ui[lang].presetGroups` for both languages, which is the live
        source used by `PresetBar` after the unified domain-spec refactor.
        Acceptance: a preset whose group has no translated label fails the gate,
        in both `tr` and `en`.
  - [x] 1.1.5 Update the "does not check presets" wording in `CLAUDE.md` §2 and
        `ARCHITECTURE.md` once the check exists.
        Acceptance: no document still claims presets are unvalidated.

- [x] 1.2 Add a consistency check for the output-target id list.
      Acceptance: the ids in `VALID_TARGETS` (`src/utils/statePayload.js`), the
      `FORMATTERS` dispatch table (`src/compiler/finalPromptAssembler.js`), and
      the `<select id="sel-hedef">` options (`src/ui/ConfigPanel.jsx`) are
      verified to agree by a gate rather than by hand. They are currently three
      independent copies of one list with nothing enforcing agreement.

## Phase 2 — Reconcile `ARCHITECTURE.md` with the source

Each item is a verified mismatch between `ARCHITECTURE.md` and the current code.
Per `CLAUDE.md` §9.4 the code wins; the document gets corrected.

- [ ] 2.1 Remove `generatedPrompt` from the documented state shape.
      Acceptance: `ARCHITECTURE.md`'s state-shape block and the `setDomain`
      description no longer mention `generatedPrompt` — the key does not exist in
      `src/store/engineState.js`; `PreviewPanel.jsx` derives the prompt locally
      with `useMemo`.
- [ ] 2.2 Document `config.hedef` and the output-target formatters.
      Acceptance: `ARCHITECTURE.md` covers `config.hedef`, the
      `src/compiler/formatters/` directory (`markdown.js`, `claudeXml.js`,
      `openaiJson.js`, `labelTags.js`), and step 3 of the compile pipeline —
      currently the pipeline section stops at "blocks are concatenated", which
      has not been true since the formatter dispatch was added.
- [ ] 2.3 Document the intro/workspace view routing.
      Acceptance: `ARCHITECTURE.md`'s file tree includes `src/ui/IntroView.jsx`,
      and the state shape includes the session-only `view` field plus the
      `enterWorkspace`/`backToIntro`/`startManual` actions. `App.jsx` branches on
      `view` at the top level and this is not mentioned anywhere.
- [ ] 2.4 Correct the `src/App.css` entry.
      Acceptance: the tree comment says the file is unused rather than "currently
      near-empty" — it is 184 lines of Vite-scaffold leftovers and is imported by
      no file (see `MEMORY.md`).
- [ ] 2.5 Correct the token-estimate figure.
      Acceptance: `ARCHITECTURE.md` no longer says "~4-chars-per-token";
      `analyzePromptComplexity` divides by `3.5`.
- [ ] 2.6 Move the "Recent Changes" log out of `ARCHITECTURE.md`.
      Acceptance: `ARCHITECTURE.md` carries no history; per `CLAUDE.md` §3 dates
      and session history are owned by `PROGRESS.md`. Decide with the user
      whether to migrate the existing entries or drop them in favour of `git log`
      — do not silently delete them.
- [ ] 2.7 Update the doc-pointer lines that describe `AGENT.md`.
      Acceptance: `README.md`'s "Deeper Documentation" list and
      `ARCHITECTURE.md`'s file-tree comments describe `AGENT.md`/`AGENTS.md` as
      pointer stubs and name `CLAUDE.md` as the rules owner, plus list
      `MEMORY.md`, `PROGRESS.md`, and `TASKS.md`.
- [ ] 2.8 Correct the validator's "a 3rd domain needs no change here" claim.
      Acceptance: the tree comment and `DOMAIN_FILES` agree — either the comment
      is narrowed to what the script actually does, or `DOMAIN_FILES` is derived
      from `DOMAINS` (which 1.1.1 already requires). The script does read
      `src/domains/index.js` for the domain→layer-set map, but `DOMAIN_FILES` is
      a hardcoded `{ learning, code }` literal, so a third domain's data files
      would simply go unvalidated while the comment claims otherwise.

## Phase 3 — Accessibility and dead code

- [ ] 3.1 Add `prefers-reduced-motion` handling.
      Acceptance: a `@media (prefers-reduced-motion: reduce)` block in
      `src/index.css` disables or shortens the five `@keyframes` animations
      (`lineDraw1`, `lineDraw2`, `fadeInUp`, `fadeInDown`, `floatGlow`) and the
      decorative `.bg-glow-orb` motion. There is currently no such block anywhere
      in the repo, which `CLAUDE.md` §13.5 requires.
- [ ] 3.2 Decide the fate of `src/App.css`.
      Acceptance: the file is either deleted or its live rules are merged into
      `src/index.css` — with the user's approval, since §15 covers global CSS.
      It is currently imported by nothing and ships no styles.
- [ ] 3.3 Confirm whether `design-mockup.html` and `tmp/` should stay in the repo.
      Acceptance: an explicit decision recorded here; both are unreferenced by
      the build. Do not delete either without asking.

## Phase 4 — Centralize content ownership and presentation behavior

- [x] 4.1 Move domain navigation groups, theme tokens, and icon ids into `src/domains/presentation.js` with a shared `src/ui/iconRegistry.js`.
      Acceptance: `DomainSwitcher.jsx` owns no `GROUPS` or domain `ICON_MAP` literals and `npm run validate` verifies all 15 domains have presentation and icon registration.
- [x] 4.2 Add bilingual parameter hover descriptions and an accessible `ParameterSelect` listbox.
      Acceptance: all 15 domains and all four option sets have TR/EN descriptions; hover and keyboard focus reveal the active option explanation; `npm run validate` rejects missing coverage.
- [x] 4.3 Remove duplicate preset/rule/formatter ownership and centralize module hover assembly.
      Acceptance: presets resolve from domain specs, suggestion rules live in `src/engine/suggestionRules.js`, formatters use `src/compiler/formatterRegistry.js`, output targets use `src/config/outputTargets.js`, and module hover content is assembled by `src/ui/moduleHover.js`.
- [x] 4.4 Update architecture/agent docs and verify the migration.
      Acceptance: `npm run validate`, `npm run build`, `git diff --check`, targeted ESLint, and browser checks for TR/EN parameter hover plus module hover all pass.

## Phase 5 — Default / Advanced user flow and AI routing

- [x] 5.1 Add the Default five-step journey.
      Acceptance: the first-run surface guides the user through domain → recommended preset → user need → parameters → output; all 15 domains have localized purpose and example copy; only 3–5 recommended presets are shown before progressive disclosure.
- [x] 5.2 Add the Advanced mode boundary and local preference.
      Acceptance: Advanced restores the complete existing workspace, Default remains the initial fallback, the mode switch is reversible, and `config.gorunum` is excluded from share/recipe payloads.
- [x] 5.3 Add responsive and accessible flow behavior.
      Acceptance: mobile layout uses stacked cards and sticky navigation/actions, hover content has keyboard-focus equivalents, and `prefers-reduced-motion` disables the new flow animation.
- [x] 5.4 Stabilize provider-specific AI routes.
      Acceptance: ChatGPT, Perplexity, and Gemini use encoded provider routes where verified; Claude uses an explicit clipboard fallback; the route regression script validates special-character encoding and provider paths through `npm run validate`.
- [x] 5.5 Verify and document the migration.
      Acceptance: `npm run validate`, `npm run build`, targeted ESLint, and browser checks for Default → Advanced, domain → preset → need → parameters, option explanations, and AI route strategy all pass. Full lint’s pre-existing App hook warning remains documented.

## Phase 6 — Complete advanced parameter hover coverage

- [x] 6.1 Replace partial legacy label-tooltip ownership.
      Acceptance: Advanced `ConfigPanel` no longer depends on domain-specific `i18n` `levelDescs`/`modeDescs`/`depthDescs`/`formatDescs` maps; all four label menus consume `src/domains/parameterDescriptions.js` through `ParameterHoverMenu`.
- [x] 6.2 Validate every domain and option in both languages.
      Acceptance: `scripts/audit-parameter-hover.mjs` reports all 15 domains, all four parameter fields, matching live option counts, non-empty TR/EN descriptions, and no generic fallback usage; `npm run validate` runs this audit.
- [x] 6.3 Verify Advanced hover and focus behavior.
      Acceptance: `Prompt Tipi` and `Mimarlık Tarzı` expose all three Agent Architecture option explanations; all 15 domains render four non-empty label menus in the browser; option listboxes still reveal descriptions on hover/focus; keyboard focus opens the label menu.
