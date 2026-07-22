import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Hosted Razorpay backend — see src/utils/razorpay.js for the endpoints in use.
      "/api": {
        target: "https://uemofficialbackend-api.iem.edu.in",
        changeOrigin: true,
      },
    },
  },
})