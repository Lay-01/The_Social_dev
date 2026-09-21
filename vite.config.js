import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    open: true,
    // Mirror production security headers locally so audits don't produce false positives
    headers: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'X-XSS-Protection': '1; mode=block',
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://ajax.googleapis.com",
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com",
        "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net",
        "img-src 'self' data: blob: https://cdn.prod.website-files.com https://hbcpxaavhlblceqjlyza.supabase.co https://images.unsplash.com https://thesocialdev.co.in",
        "connect-src 'self' https://hbcpxaavhlblceqjlyza.supabase.co https://fonts.googleapis.com https://fonts.gstatic.com https://api.microlink.io https://wa.me ws://localhost:3000",
        "frame-src 'self'"
      ].join('; ')
    }
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
