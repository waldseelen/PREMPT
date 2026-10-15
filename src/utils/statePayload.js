import { getDomain, DEFAULT_DOMAIN, DOMAINS } from '../domains';
import { getModuleRegistry } from '../engine/moduleRegistry';
import { getPresets } from '../engine/presetEngine';
import { OUTPUT_TARGETS } from '../config/outputTargets';

// Shared serialization shape for saved recipes, share links, and JSON
// export/import. `theme`/`lang`/`tourCompleted` are the recipient's
// environment, never part of a shared setup, so they're deliberately
// excluded here — never add them to this payload.
const PAYLOAD_VERSION = 1;

export function serializeState(state, { includeTopic = false } = {}) {
    const { config, selectedModules, activePreset } = state;
    const payload = {
        version: PAYLOAD_VERSION,
        domain: config.domain ?? DEFAULT_DOMAIN,
        seviye: config.seviye,
        mod: config.mod,
        derinlik: config.derinlik,
        format: config.format,
        hedef: config.hedef,
        monolog: config.monolog,
        autoResolveDeps: config.autoResolveDeps,
        selectedModules: [...selectedModules],
        activePreset: activePreset ?? null,
        // Preset constraint rules are part of the setup: without them a
        // restored share/recipe silently keeps the *previous* session's rules
        // (Phase 16.3). Optional field — old payloads without it sanitize to [].
        injectedRules: Array.isArray(state.injectedRules) ? [...state.injectedRules] : []
    };
    if (includeTopic) {
        payload.konu = config.konu ?? '';
        payload.alan = config.alan ?? '';
    }
    return payload;
}

// Defensive against untrusted input (a bookmarked/stale share link, a
// hand-edited export, a recipe saved under a since-renamed module id).
// Never throws — always returns a payload safe to apply directly. This is
// the same "unknown id" hazard class fixed in intelligenceLayer.js, applied
// to externally-sourced state instead of internally-generated suggestions.
// Max length of a single injected rule line (DoS hygiene, same class as the
// konu/alan caps below).
const MAX_RULE_LEN = 2000;

// Same contract as sanitizePayload, but additionally reports every silent
// substitution it performed so callers can inform the user (Phase 16.4).
// `warnings` entries are `{ code, field?, value?/ids?/dropped? }` with codes:
// 'unknown-domain' | 'dropped-modules' | 'invalid-option' | 'invalid-preset' |
// 'invalid-rules'. An empty array means the payload applied exactly as sent.
export function sanitizePayloadWithWarnings(raw, lang = 'tr') {
    const warnings = [];
    const rawDomain = raw?.domain;
    const domainId = getDomain(rawDomain).id;
    if (typeof rawDomain === 'string' && rawDomain !== '' && !Object.hasOwn(DOMAINS, rawDomain)) {
        warnings.push({ code: 'unknown-domain', value: rawDomain, fellBackTo: domainId });
    }
    const domainDescriptor = getDomain(domainId);
    const registry = getModuleRegistry(domainId, lang);
    const validIds = new Set(registry.map((m) => m.id));

    const rawModules = Array.isArray(raw?.selectedModules) ? raw.selectedModules : [];
    const droppedModules = Array.from(new Set(rawModules.filter((id) => !validIds.has(id))));
    if (droppedModules.length > 0) {
        warnings.push({ code: 'dropped-modules', ids: droppedModules });
    }
    const selectedModules = Array.from(new Set(rawModules.filter((id) => validIds.has(id))));

    const resolveOptionIds = (explicitIds, optionSet) => {
        if (Array.isArray(explicitIds)) return explicitIds;
        if (Array.isArray(optionSet)) return optionSet;
        if (optionSet && typeof optionSet === 'object') return Object.keys(optionSet);
        return [];
    };

    const levelIds = resolveOptionIds(domainDescriptor?.levelIds, domainDescriptor?.optionSets?.levels);
    const modeIds = resolveOptionIds(domainDescriptor?.modeIds, domainDescriptor?.optionSets?.modes);
    const depthIds = resolveOptionIds(domainDescriptor?.depthIds, domainDescriptor?.optionSets?.depths);
    const formatIds = resolveOptionIds(domainDescriptor?.formatIds, domainDescriptor?.optionSets?.formats);

    const fallbackOrValid = (val, validList, fallback, field) => {
        if (Array.isArray(validList) && validList.includes(val)) return val;
        if (val !== undefined && val !== fallback) {
            warnings.push({ code: 'invalid-option', field, value: val, fellBackTo: fallback });
        }
        return fallback;
    };

    const presets = getPresets(domainId);
    const activePreset = raw?.activePreset && presets[raw.activePreset] ? raw.activePreset : null;
    if (raw?.activePreset && !activePreset) {
        warnings.push({ code: 'invalid-preset', value: raw.activePreset });
    }

    // Injected rules travel with the payload (Phase 16.3) but stay untrusted
    // input: keep only non-empty strings, cap length, dedupe.
    const rawRules = Array.isArray(raw?.injectedRules) ? raw.injectedRules : [];
    const cleanRules = Array.from(new Set(
        rawRules.filter((r) => typeof r === 'string').map((r) => r.slice(0, MAX_RULE_LEN)).filter((r) => r.length > 0)
    ));
    if (Array.isArray(raw?.injectedRules) && raw.injectedRules.length !== cleanRules.length) {
        warnings.push({ code: 'invalid-rules', dropped: raw.injectedRules.length - cleanRules.length });
    }

    const sanitized = {
        version: PAYLOAD_VERSION,
        domain: domainId,
        seviye: fallbackOrValid(raw?.seviye, levelIds, domainDescriptor?.defaultConfig?.seviye, 'seviye'),
        mod: fallbackOrValid(raw?.mod, modeIds, domainDescriptor?.defaultConfig?.mod, 'mod'),
        derinlik: fallbackOrValid(raw?.derinlik, depthIds, domainDescriptor?.defaultConfig?.derinlik, 'derinlik'),
        format: fallbackOrValid(raw?.format, formatIds, domainDescriptor?.defaultConfig?.format, 'format'),
        hedef: fallbackOrValid(raw?.hedef, OUTPUT_TARGETS, OUTPUT_TARGETS[0], 'hedef'),
        monolog: typeof raw?.monolog === 'boolean' ? raw.monolog : false,
        autoResolveDeps: typeof raw?.autoResolveDeps === 'boolean' ? raw.autoResolveDeps : true,
        selectedModules,
        activePreset,
        injectedRules: cleanRules
    };
    if (typeof raw?.konu === 'string') sanitized.konu = raw.konu.slice(0, 10000);
    if (typeof raw?.alan === 'string') sanitized.alan = raw.alan.slice(0, 10000);
    return { clean: sanitized, warnings };
}

export function sanitizePayload(raw, lang = 'tr') {
    return sanitizePayloadWithWarnings(raw, lang).clean;
}

export function encodePayloadToParam(payload) {
    try {
        const json = JSON.stringify(payload);
        if (typeof TextEncoder !== 'undefined') {
            const bytes = new TextEncoder().encode(json);
            let bin = '';
            for (let i = 0; i < bytes.length; i++) {
                bin += String.fromCharCode(bytes[i]);
            }
            return encodeURIComponent(btoa(bin));
        }
        return encodeURIComponent(btoa(unescape(encodeURIComponent(json))));
    } catch {
        return '';
    }
}

// Returns null on any decode failure (malformed base64/JSON) instead of
// throwing — callers treat null as "no shareable state present".
export function decodePayloadFromParam(param) {
    try {
        const raw = atob(decodeURIComponent(param));
        if (typeof TextDecoder !== 'undefined') {
            const bytes = new Uint8Array(raw.length);
            for (let i = 0; i < raw.length; i++) {
                bytes[i] = raw.charCodeAt(i);
            }
            return JSON.parse(new TextDecoder().decode(bytes));
        }
        return JSON.parse(decodeURIComponent(escape(raw)));
    } catch {
        try {
            return JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(param)))));
        } catch {
            return null;
        }
    }
}
