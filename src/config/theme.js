export const THEME_IDS = Object.freeze(['light', 'dark']);

export const THEME_LABELS = {
    tr: {
        light: 'Açık tema',
        dark: 'Koyu tema'
    },
    en: {
        light: 'Light theme',
        dark: 'Dark theme'
    }
};

export function getNextTheme(theme) {
    return theme === 'light' ? 'dark' : 'light';
}

export function getThemeLabel(lang, theme) {
    return THEME_LABELS[lang]?.[theme] || THEME_LABELS.tr[theme] || theme;
}
