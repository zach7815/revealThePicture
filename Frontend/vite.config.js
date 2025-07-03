import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/pages/', // Point directly to the pages folder
  build: {
    outDir: '../../dist', // Adjust if needed
  },
  server: {
    open: true,
  },
});
