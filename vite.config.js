import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    },
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2015',
    cssMinify: true
  },
  esbuild: {
    legalComments: 'none',
    drop: ['console', 'debugger']
  }
})
