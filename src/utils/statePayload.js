import { getDomain, DEFAULT_DOMAIN } from '../domains';
import { getModuleRegistry } from '../engine/moduleRegistry';
import { getPresets } from '../engine/presetEngine';

// Shared serialization shape for saved recipes, share links, and JSON
// export/import. `theme`/`lang`/`tourCompleted` are the recipient's
// environment, never part of a shared setup, so they're deliberately
// excluded here — never add them to this payload.
const PAYLOAD_VERSION = 1;

// Global (domain-agnostic) target-format ids — see engineState.js's `hedef`
// comment. Kept here rather than imported from the compiler so this module
// stays free of a compiler dependency for a 3-item allowlist.
const VALID_TARGETS = ['markdown', 'claude-xml', 'openai-json'];

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
        activePreset: activePreset ?? null
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
export function sanitizePayload(raw, lang = 'tr') {
    const domainId = getDomain(raw?.domain).id;
    const domainDescriptor = getDomain(domainId);
    const registry = getModuleRegistry(domainId, lang);
    const validIds = new Set(registry.map((m) => m.id));

    const selectedModules = Array.isArray(raw?.selectedModules)
        ? raw.selectedModules.filter((id) => validIds.has(id))
        : [];

    const fallbackOrValid = (value, validList, fallback) =>
        validList.includes(value) ? value : fallback;

    const presets = getPresets(domainId);
    const activePreset = raw?.activePreset && presets[raw.activePreset] ? raw.activePreset : null;

    const sanitized = {
        version: PAYLOAD_VERSION,
        domain: domainId,
        seviye: fallbackOrValid(raw?.seviye, domainDescriptor.levelIds, domainDescriptor.defaultConfig.seviye),
        mod: fallbackOrValid(raw?.mod, domainDescriptor.modeIds, domainDescriptor.defaultConfig.mod),
        derinlik: fallbackOrValid(raw?.derinlik, domainDescriptor.depthIds, domainDescriptor.defaultConfig.derinlik),
        format: fallbackOrValid(raw?.format, domainDescriptor.formatIds, domainDescriptor.defaultConfig.format),
        hedef: fallbackOrValid(raw?.hedef, VALID_TARGETS, 'markdown'),
        monolog: typeof raw?.monolog === 'boolean' ? raw.monolog : false,
        autoResolveDeps: typeof raw?.autoResolveDeps === 'boolean' ? raw.autoResolveDeps : true,
        selectedModules,
        activePreset
    };
    if (typeof raw?.konu === 'string') sanitized.konu = raw.konu;
    if (typeof raw?.alan === 'string') sanitized.alan = raw.alan;
    return sanitized;
}

export function encodePayloadToParam(payload) {
    return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(payload)))));
}

// Returns null on any decode failure (malformed base64/JSON) instead of
// throwing — callers treat null as "no shareable state present".
export function decodePayloadFromParam(param) {
    try {
        const json = decodeURIComponent(escape(atob(decodeURIComponent(param))));
        return JSON.parse(json);
    } catch {
        return null;
    }
}
