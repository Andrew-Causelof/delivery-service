import { defineConfig } from 'vite';
import { resolve } from 'path';
// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://dushes-cafe.seo-gravity.ru',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: resolve(__dirname, 'src', 'main.tsx'),
      output: {
        entryFileNames: 'bundle.js',
        format: 'iife',
      },
    },
  },
});
