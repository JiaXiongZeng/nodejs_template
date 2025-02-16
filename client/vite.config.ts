import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import config from 'config';

console.log(process.env.NODE_ENV);
const PORT = config.get<number>("port");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      //Proxy API request to the backend
      '/api': `http://localhost:${PORT}`
    }
  }
})
