import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // /api 요청을 백엔드(4000)로 프록시 → 프론트 코드에서 호스트 신경 안 써도 됨
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
