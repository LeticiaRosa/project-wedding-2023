import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactSvg from 'vite-plugin-svgr'
import dotenv from 'dotenv'

dotenv.config()
export default defineConfig({
  // Outras configurações
  plugins: [react(), reactSvg()],
  server: {
    port: 5050,
    proxy: {
      '/customers': {
        target: 'https://sandbox.asaas.com/api/v3/customers',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/customers/, ''),
      },
      '/payments': {
        target: 'https://sandbox.asaas.com/api/v3/payments',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/payments/, ''),
      },
    },
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg'],
    alias: [
      {
        find: /^\/@svgr/,
        replacement: '/@svgr/webpack?-svgo,+titleProp,+ref![path]',
      },
    ],
  },
})
