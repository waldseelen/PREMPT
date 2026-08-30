import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
                        return 'vendor-react';
                    }
                    if (id.includes('node_modules/zustand/')) {
                        return 'vendor-state';
                    }
                    if (id.includes('node_modules/lucide-react/') || id.includes('node_modules/@icons-pack/')) {
                        return 'vendor-icons';
                    }
                    if (id.includes('src/data/') || id.includes('src\\data\\')) {
                        return 'modules-data';
                    }
                    if (id.includes('src/domains/specs/') || id.includes('src\\domains\\specs\\')) {
                        return 'domain-specs';
                    }
                }
            }
        }
    }
});
