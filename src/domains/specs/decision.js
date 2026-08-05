export const decisionDomain = {
    id: 'decision',
    route: 'decision',
    layers: ["foundation","analysis","tradeoff","biases","execution"],
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
