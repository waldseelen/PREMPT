import { getDomain, DEFAULT_DOMAIN } from '../domains';
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
        ? Array.from(new Set(raw.selectedModules.filter((id) => validIds.has(id))))
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
        hedef: fallbackOrValid(raw?.hedef, OUTPUT_TARGETS, OUTPUT_TARGETS[0]),
        monolog: typeof raw?.monolog === 'boolean' ? raw.monolog : false,
        autoResolveDeps: typeof raw?.autoResolveDeps === 'boolean' ? raw.autoResolveDeps : true,
        selectedModules,
        activePreset
    };
    if (typeof raw?.konu === 'string') sanitized.konu = raw.konu.slice(0, 10000);
    if (typeof raw?.alan === 'string') sanitized.alan = raw.alan.slice(0, 10000);
    return sanitized;
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
