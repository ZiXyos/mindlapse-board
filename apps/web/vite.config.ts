import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@shared/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@': path.resolve(__dirname, '../../packages/ui/src'),
      '@mindboard/shared': path.resolve(__dirname, '../../packages/shared/src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "mindboard.local"
    ]
  }
})
