import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../../static/vite-app',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: 'vite.js',
                chunkFileNames: 'chunks/[name].js',
                assetFileNames: '[name].[ext]',
                format: 'iife',
            },
        },
    },
})
