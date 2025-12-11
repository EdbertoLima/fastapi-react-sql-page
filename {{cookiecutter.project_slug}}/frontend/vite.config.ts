import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true, // Required for Docker on Windows/Mac
    },
    hmr: {
      clientPort: 5173, // Hot Module Replacement port
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  resolve: {
    alias: {
      // Optional: Add path aliases for cleaner imports
      // '@': '/src',
    },
  },
});
