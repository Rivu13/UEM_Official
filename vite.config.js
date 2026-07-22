import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Local Razorpay backend — see src/utils/razorpay.js for the endpoints in use.
      // The backend's own CORS middleware rejects the Vite dev origin, so the browser's
      // Origin header is stripped here — the backend allows requests with no Origin (same as curl).
      "/api": {
        target: "http://192.168.1.250:8000",
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.removeHeader("origin")
          })
        },
      },
    },
  },
})