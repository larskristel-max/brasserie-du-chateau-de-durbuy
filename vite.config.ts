import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/brasserie-chateau-durbuy-2026/',
  plugins: [react()],
});
