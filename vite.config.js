import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Aviso cuando un chunk supere 550KB
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        // Code-splitting manual: separa vendors pesados en chunks propios
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    assetsInlineLimit: 2048,
    sourcemap: false,
  },
}));
