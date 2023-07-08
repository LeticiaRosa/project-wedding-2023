import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactSvg from 'vite-plugin-svgr'

// https://vitejs.dev/config/

export default defineConfig({
  // Outras configurações
  plugins: [react(), reactSvg()],
  server: { port: 5050 },
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
