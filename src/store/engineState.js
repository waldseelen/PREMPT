import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { resolveDependencies } from '../engine/dependencyResolver';
import { applyPreset } from '../engine/presetEngine';
import { getDomain, DEFAULT_DOMAIN } from '../domains';
import { pushDomainRoute } from '../utils/domainRoute';
import { serializeState, sanitizePayload } from '../utils/statePayload';

const MAX_RECIPES = 20;

export const useEngineState = create(
    persist(
        (set) => ({
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
                theme: 'system',
                lang: 'tr',
                tourCompleted: false
            },

            // 2. Active Behaviors (Modules & Presets)
            selectedModules: [],
            activePreset: null,
            injectedRules: [],
            generatedPrompt: '',

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
                    generatedPrompt: '',
                    dependencyHints: []
                };
            }),

            setTheme: (themeVal) => set((state) => ({
                config: { ...state.config, theme: themeVal }
            })),

            setGeneratedPrompt: (prompt) => set({ generatedPrompt: prompt }),

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
                    activePreset: null, // User override breaks the pure preset
                    injectedRules: [],
                    dependencyHints
                };
            }),

            setPreset: (presetId) => set((state) => {
                const domain = state.config.domain ?? DEFAULT_DOMAIN;
                const presetResult = applyPreset(presetId, domain);

                let newModules = presetResult.forceModules;
                let dependencyHints = [];

                if (state.config.autoResolveDeps) {
                    const resolved = resolveDependencies(newModules, domain, state.config.lang);
                    if (resolved.length > newModules.length) {
                        const added = resolved.filter(x => !newModules.includes(x));
                        dependencyHints = [`Preset '${presetId}' applied -> +[${added.join(', ')}]`];
                    }
                    newModules = resolved;
                }

                const newConfig = { ...state.config, ...presetResult.override };

                return {
                    activePreset: presetId,
                    selectedModules: newModules,
                    injectedRules: presetResult.injectRules || [],
                    config: newConfig,
                    dependencyHints
                };
            }),

            setModules: (moduleIds) => set((state) => {
                const domain = state.config.domain ?? DEFAULT_DOMAIN;
                let newModules = moduleIds;
                if (state.config.autoResolveDeps) {
                    newModules = resolveDependencies(newModules, domain, state.config.lang);
                }
                return {
                    selectedModules: newModules
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
                const recipe = { id: crypto.randomUUID(), name, createdAt: Date.now(), payload };
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
                        monolog: clean.monolog,
                        autoResolveDeps: clean.autoResolveDeps
                    },
                    selectedModules: clean.selectedModules,
                    activePreset: clean.activePreset,
                    generatedPrompt: '',
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
                        monolog: clean.monolog,
                        autoResolveDeps: clean.autoResolveDeps
                    },
                    selectedModules: clean.selectedModules,
                    activePreset: clean.activePreset,
                    generatedPrompt: '',
                    dependencyHints: []
                };
            }),

            startTour: () => set({ showTour: true }),
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
                generatedPrompt: '',
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
                    ...persistedState?.config
                }
            }),
            partialize: (state) => ({ config: state.config, savedRecipes: state.savedRecipes })
        }
    )
);
