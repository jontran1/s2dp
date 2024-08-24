import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint()
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@worker': path.resolve(__dirname, './src/worker'),
    }
  },
  build: {
    sourcemap: true,
  },
})
