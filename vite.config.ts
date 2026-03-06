import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/modern-skylight-calendar-card.ts',
      formats: ['es'],
      fileName: () => 'modern-skylight-calendar-card.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    target: 'es2020',
    minify: false, // Keep readable for debugging; set to true for production
  },
});
