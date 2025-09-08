// © 2025 Alessandro Romano — Non-Commercial use only. See LICENSE.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use root path for custom domain
  base: '/',
})
