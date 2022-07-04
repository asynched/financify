/* eslint-disable no-undef */
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'financify',
        short_name: 'financify',
        description:
          'Financify is an app where you can track your expenses and incomes',
        theme_color: '#fff',
        icons: [
          {
            src: path.resolve(__dirname, 'public', 'app-icon-256x256.png'),
            sizes: '256x256',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
