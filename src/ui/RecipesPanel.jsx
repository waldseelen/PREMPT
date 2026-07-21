import { useState } from 'react';
import { useEngineState } from '../store/engineState';
import { useShallow } from 'zustand/react/shallow';
import { getTranslation } from '../locales/i18n';
import { Bookmark, Save, Trash2, X } from 'lucide-react';

export default function RecipesPanel({ showToast }) {
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState('');

    const { config, savedRecipes, saveRecipe, loadRecipe, deleteRecipe } = useEngineState(useShallow(state => ({
        config: state.config,
        savedRecipes: state.savedRecipes,
        saveRecipe: state.saveRecipe,
        loadRecipe: state.loadRecipe,
        deleteRecipe: state.deleteRecipe
    })));
    const t = getTranslation(config.lang, config.domain);

    const handleSave = () => {
        const trimmed = name.trim();
        if (!trimmed) {
            showToast?.(t.toastRecipeNeedName, 'warn');
            return;
        }
        saveRecipe(trimmed);
        setName('');
        setIsAdding(false);
        showToast?.(t.toastRecipeSaved);
    };

    const handleDelete = (id) => {
        deleteRecipe(id);
        showToast?.(t.toastRecipeDeleted);
    };

    return (
        <section className="card delay-3" style={{ marginTop: '12px' }}>
            <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><span className="dot"></span> {t.recipesTitle}</span>
                {!isAdding && (
                    <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => setIsAdding(true)}>
                        <Save size={12} style={{ marginRight: '4px' }} /> {t.btnSaveRecipe}
                    </button>
                )}
            </div>

            {isAdding && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <input
                        type="text"
                        autoFocus
                        placeholder={t.recipeNamePlaceholder}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave();
                            if (e.key === 'Escape') { setIsAdding(false); setName(''); }
                        }}
                        style={{ flex: 1 }}
                    />
                    <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={handleSave}>
                        {t.btnSaveRecipe}
                    </button>
                    <button className="btn btn-secondary" style={{ padding: '4px 10px' }} onClick={() => { setIsAdding(false); setName(''); }}>
                        <X size={14} />
                    </button>
                </div>
            )}

            {savedRecipes.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '8px' }}>
                    {t.recipesEmpty}
                </p>
            ) : (
                <div className="presets-row" style={{ marginTop: '8px' }}>
                    {savedRecipes.map((recipe) => (
                        <div key={recipe.id} className="preset-btn" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'default' }}>
                            <button
                                onClick={() => loadRecipe(recipe.id)}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit', padding: 0 }}
                                title={t.btnLoadRecipe}
                            >
                                <Bookmark size={12} /> {recipe.name}
                            </button>
                            <button
                                onClick={() => handleDelete(recipe.id)}
                                title={t.btnDeleteRecipe}
                                aria-label={t.btnDeleteRecipe}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, display: 'flex' }}
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
