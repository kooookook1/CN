import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
});