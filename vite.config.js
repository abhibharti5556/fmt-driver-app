import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Inline small brand assets (e.g. the logo) as base64 data URIs into the
  // JS bundle rather than separate hashed files in dist/assets — keeps the
  // build a single self-contained pair of files.
  build: {
    assetsInlineLimit: 100000,
  },
})
