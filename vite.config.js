import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || (command === 'serve' ? '/' : '/amflegal/'),
  server: {
    port: 3000,
    open: true
  },
  build: {
    // Aviso cuando un chunk supere 500KB (antes se quejaba con 400KB)
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        // Code-splitting manual: separa vendors pesados en chunks propios
        manualChunks: {
          // React core — cambia raramente, máxima caché
          'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          // Iconos — lucide tiene muchos módulos, mejor aislado
          'vendor-icons': ['lucide-react'],
        }
      }
    },
    // Activa compresión de assets de más de 2KB
    assetsInlineLimit: 2048,
    // Genera sourcemaps solo en dev
    sourcemap: false,
  }
}));
