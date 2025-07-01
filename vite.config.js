import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
    'import.meta.env.DEVICE_NAME': JSON.stringify(process.env.DEVICE_NAME),
  },
});
