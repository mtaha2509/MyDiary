import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'markdown-to-jsx': resolve(__dirname, 'node_modules/markdown-to-jsx'),
      'axios': resolve(__dirname, 'node_modules/axios'),
    },
  },
})
