export const languageDomain = {
    id: 'language',
    route: 'language',
    layers: ["localization","register","fluency","idioms","pedagogy"],
    modeIds: ['karma', 'feynman', 'sistem', 'sokratik', 'ilkeler'],
    levelIds: ['otomatik', 'acemi', 'orta', 'ileri', 'uzman'],
    depthIds: ['orta', 'temel', 'derin', 'kapsamli'],
    formatIds: ['markdown', 'tablo', 'ders', 'quiz'],
    defaultConfig: {
        seviye: 'otomatik',
        mod: 'karma',
        derinlik: 'orta',
        format: 'markdown'
    }
};
