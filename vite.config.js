import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config as loadEnv } from 'dotenv';

loadEnv();

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
    'import.meta.env.DEVICE_NAME': JSON.stringify(process.env.DEVICE_NAME),
  },
});
