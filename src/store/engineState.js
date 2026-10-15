import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { resolveDependencies } from '../engine/dependencyResolver';
import { getModuleRegistry } from '../engine/moduleRegistry';
import { applyPreset, getPresets } from '../engine/presetEngine';
import { getDomain, DEFAULT_DOMAIN } from '../domains';
import { pushDomainRoute } from '../utils/domainRoute';
import { serializeState, sanitizePayload } from '../utils/statePayload';

const MAX_RECIPES = 20;

export const useEngineState = create(
    persist(
        (set, get) => ({
            // 1. Core Configuration (Input State)
            config: {
                domain: DEFAULT_DOMAIN,
                konu: '',
                alan: '',
                seviye: 'otomatik',
                mod: 'karma',
                derinlik: 'orta',
                format: 'markdown',
                monolog: false,
                autoResolveDeps: true,
                // Output syntax target (Tier B formatters). Deliberately global,
                // NOT part of any domain's defaultConfig — setDomain()'s
                // `...targetDomain.defaultConfig` spread must not reset it on a
                // Learn<->Code switch. finalPromptAssembler falls back to
                // 'markdown' itself on an unknown/missing value, so no migrate
                // backfill is needed for pre-existing persisted blobs.
                hedef: 'markdown',
                theme: 'system',
                lang: 'tr',
                tourCompleted: false,
                // UI preference only; intentionally excluded from share/recipe payloads.
                gorunum: 'default'
            },

            // 2. Active Behaviors (Modules & Presets)
            selectedModules: [],
            activePreset: null,
            injectedRules: [],

            // 3. Intelligence / Hints
            dependencyHints: [],
            showTour: false,

            // 4. Saved Recipes — sibling of `config`, not inside it, so
            // setDomain()/clearAll() never touch it. Persisted separately
            // (see partialize below).
            savedRecipes: [],

            // Actions
            setConfig: (key, value) => set((state) => {
                const newConfig = { ...state.config, [key]: value };
                return { config: newConfig };
            }),

            // Switches the active domain (Learning <-> Code). Keeps konu, alan, lang,
            // theme, monolog, autoResolveDeps; resets domain-specific config fields to
            // the target domain's defaults and clears module/preset/prompt state, since
            // module ids and option-set vocabularies aren't shared across domains.
            setDomain: (domainId) => set((state) => {
                const currentDomain = state.config.domain ?? DEFAULT_DOMAIN;
                if (domainId === currentDomain) return {};

                const targetDomain = getDomain(domainId);
                pushDomainRoute(targetDomain.route);

                return {
                    config: {
                        ...state.config,
                        domain: targetDomain.id,
                        ...targetDomain.defaultConfig
                    },
                    selectedModules: [],
                    activePreset: null,
                    injectedRules: [],
                    dependencyHints: []
                };
            }),

            setTheme: (themeVal) => set((state) => ({
                config: { ...state.config, theme: themeVal }
            })),

            setGorunum: (mode) => set((state) => ({
                config: { ...state.config, gorunum: mode === 'advanced' ? 'advanced' : 'default' }
            })),

            // Detaches active preset name (Eject/Remix) while preserving all
            // injectedRules, selectedModules, and configuration overrides.
            ejectPreset: () => set((state) => {
                if (!state.activePreset) return {};
                return { activePreset: null };
            }),

            toggleModule: (id) => set((state) => {
                const domain = state.config.domain ?? DEFAULT_DOMAIN;
                const isSelected = state.selectedModules.includes(id);
                let newModules = isSelected
                    ? state.selectedModules.filter(m => m !== id)
                    : [...state.selectedModules, id];

                let dependencyHints = [];

                // DAG Resolution
                if (state.config.autoResolveDeps && !isSelected) {
                    const resolved = resolveDependencies(newModules, domain, state.config.lang);
                    if (resolved.length > newModules.length) {
                        const added = resolved.filter(x => !newModules.includes(x));
                        dependencyHints = [`${id} -> +[${added.join(', ')}] (Auto-resolved)`];
                    }
                    newModules = resolved;
                }

                return {
                    selectedModules: newModules,
                    activePreset: null, // User override breaks the pure preset (eject semantics)
                    injectedRules: state.injectedRules,
                    dependencyHints
                };
            }),

            setPreset: (presetId) => set((state) => {
                if (!presetId || typeof presetId !== 'string') return {};
                const domain = state.config.domain ?? DEFAULT_DOMAIN;
                const availablePresets = getPresets(domain);
                const targetPreset = availablePresets[presetId] || Object.values(availablePresets).find(p => p?.id === presetId);
                if (!targetPreset) return {};
                const targetPresetId = targetPreset.id || presetId;
                const presetResult = (availablePresets[targetPresetId] ? applyPreset(targetPresetId, domain) : targetPreset) || targetPreset;

                let newModules = presetResult.forceModules || targetPreset.forceModules || [];
                let dependencyHints = [];

                if (state.config.autoResolveDeps) {
                    const resolved = resolveDependencies(newModules, domain, state.config.lang);
                    if (resolved.length > newModules.length) {
                        const added = resolved.filter(x => !newModules.includes(x));
                        dependencyHints = [`Preset '${targetPresetId}' applied -> +[${added.join(', ')}]`];
                    }
                    newModules = resolved;
                }

                const newConfig = { ...state.config, ...presetResult.override };

                return {
                    activePreset: targetPresetId,
                    selectedModules: newModules,
                    injectedRules: presetResult.injectRules || targetPreset.injectRules || [],
                    config: newConfig,
                    dependencyHints
                };
            }),

            applyPreset: function (presetId) {
                return this.setPreset?.(presetId) || get()?.setPreset(presetId);
            },

            setModules: (moduleIds) => set((state) => {
                const domain = state.config.domain ?? DEFAULT_DOMAIN;
                // Defensive: unknown ids (e.g. from a hand-edited ?modules= URL)
                // are dropped here so they can never linger in state while the
                // compiler silently omits them (Phase 16.5). Valid ids pass through.
                const validIds = new Set(getModuleRegistry(domain, state.config.lang).map((m) => m.id));
                let newModules = Array.isArray(moduleIds)
                    ? moduleIds.filter((id) => validIds.has(id))
                    : [];
                if (state.config.autoResolveDeps) {
                    newModules = resolveDependencies(newModules, domain, state.config.lang);
                }
                return {
                    selectedModules: newModules,
                    activePreset: null,
                    injectedRules: state.injectedRules,
                    dependencyHints: []
                };
            }),

            // --- Recipes & Sharing ---
            // All three actions below are single atomic set() calls that
            // restore domain/config/modules/preset directly. They deliberately
            // do NOT call setDomain() — setDomain's whole job is to WIPE
            // selection/config on a manual domain switch, which is the
            // opposite of what "load a saved/shared setup" needs. Each calls
            // pushDomainRoute itself so the URL still matches.
            saveRecipe: (name) => set((state) => {
                const payload = serializeState(state, { includeTopic: false });
                const id = typeof crypto !== 'undefined' && crypto.randomUUID
                    ? crypto.randomUUID()
                    : (Date.now().toString(36) + Math.random().toString(36).slice(2));
                const recipe = { id, name, createdAt: Date.now(), payload };
                const trimmed = [...state.savedRecipes, recipe].slice(-MAX_RECIPES);
                return { savedRecipes: trimmed };
            }),

            deleteRecipe: (id) => set((state) => ({
                savedRecipes: state.savedRecipes.filter((r) => r.id !== id)
            })),

            loadRecipe: (id) => set((state) => {
                const recipe = state.savedRecipes.find((r) => r.id === id);
                if (!recipe) return {};
                const clean = sanitizePayload(recipe.payload, state.config.lang);
                const targetDomain = getDomain(clean.domain);
                pushDomainRoute(targetDomain.route);
                return {
                    config: {
                        ...state.config,
                        domain: clean.domain,
                        seviye: clean.seviye,
                        mod: clean.mod,
                        derinlik: clean.derinlik,
                        format: clean.format,
                        hedef: clean.hedef,
                        monolog: clean.monolog,
                        autoResolveDeps: clean.autoResolveDeps
                    },
                    selectedModules: clean.selectedModules,
                    activePreset: clean.activePreset,
                    // Restore the saved rule set exactly: without this the
                    // previous session's rules leak into the loaded setup
                    // (Phase 16.3). Old payloads sanitize injectedRules to [].
                    injectedRules: clean.injectedRules,
                    dependencyHints: []
                };
            }),

            // Used by both the share-link mount effect (App.jsx) and JSON
            // import — the only two entry points for state that came from
            // outside this browser session. `raw` must already be sanitized
            // by the caller via sanitizePayload before reaching here in the
            // share-link path; JSON import sanitizes right before calling too.
            applySharedState: (clean) => set((state) => {
                const targetDomain = getDomain(clean.domain);
                pushDomainRoute(targetDomain.route);
                return {
                    config: {
                        ...state.config,
                        domain: clean.domain,
                        konu: clean.konu ?? state.config.konu,
                        alan: clean.alan ?? state.config.alan,
                        seviye: clean.seviye,
                        mod: clean.mod,
                        derinlik: clean.derinlik,
                        format: clean.format,
                        hedef: clean.hedef,
                        monolog: clean.monolog,
                        autoResolveDeps: clean.autoResolveDeps
                    },
                    selectedModules: clean.selectedModules,
                    activePreset: clean.activePreset,
                    // Same rule-restore contract as loadRecipe (Phase 16.3).
                    injectedRules: clean.injectedRules,
                    dependencyHints: []
                };
            }),

            startTour: () => set({ showTour: true }),
            // Applies pre-sanitized externally-sourced config values (URL
            // overrides). The only sanctioned path for outside writes — UI
            // never calls setState directly (Phase 18.8).
            applyUrlConfig: (patch) => set((state) => ({
                config: { ...state.config, ...patch }
            })),

            // One-shot UI flag for the Gemini extension notice. Session-only
            // (not persisted, not shared) so ActionBar never touches
            // localStorage directly (Phase 18.8).
            seenGeminiNotice: false,
            markGeminiNoticeSeen: () => set({ seenGeminiNotice: true }),
            completeTour: () => set((state) => ({
                showTour: false,
                config: { ...state.config, tourCompleted: true }
            })),
            cancelTour: () => set({ showTour: false }),

            clearAll: () => set((state) => ({
                selectedModules: [],
                activePreset: null,
                injectedRules: [],
                dependencyHints: [],
                config: { ...state.config, konu: '', alan: '' }
            }))
        }),
        {
            name: 'learning-os-engine-storage',
            version: 1,
            // Pre-v1 persisted blobs have no `config.domain` key. Zustand's default
            // rehydrate merge replaces the whole `config` object (it's a top-level
            // persisted key) rather than deep-merging it, so without this an old blob
            // would land with config.domain === undefined instead of 'learning'.
            migrate: (persistedState) => ({
                ...persistedState,
                config: {
                    domain: DEFAULT_DOMAIN,
                    gorunum: 'default',
                    ...persistedState?.config
                }
            }),
            merge: (persistedState, currentState) => ({
                ...currentState,
                ...persistedState,
                config: {
                    ...currentState.config,
                    ...persistedState?.config
                }
            }),
            partialize: (state) => ({ config: state.config, savedRecipes: state.savedRecipes })
        }
    )
);
