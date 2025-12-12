import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    force: true, // Force dependency re-optimization
  },
  server: {
    host: true, // Listen on all addresses including LAN
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // Required for Docker on Windows/Mac
    },
    hmr: {
      clientPort: {{cookiecutter.https_port}}, // Hot Module Replacement through nginx HTTPS
      protocol: 'wss', // Secure WebSocket for HTTPS
      host: 'localhost',
    },
    cors: true,
    origin: 'https://localhost:{{cookiecutter.https_port}}',
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
