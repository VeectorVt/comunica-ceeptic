import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Minificação mais agressiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
      },
    },
    // Inlinar assets menores que 4kb diretamente no JS
    assetsInlineLimit: 4096,
    // Dividir em chunks menores para melhor cache
    rollupOptions: {
      output: {
        manualChunks: {
          // Isola o React do resto
          'vendor-react': ['react', 'react-dom'],
          // Isola o roteador
          'vendor-router': ['react-router-dom'],
          // Isola framer-motion (pesado) em chunk separado
          'vendor-motion': ['framer-motion'],
          // Isola ícones
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Não gerar source maps em produção
    sourcemap: false,
    // Avisar se um chunk passar de 400kb
    chunkSizeWarningLimit: 400,
  },
})
