export const imageDomain = {
    id: 'image',
    route: 'image',
    layers: ["medium","composition","lighting","atmosphere","parameters"],
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
