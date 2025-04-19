import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import config from 'config';
import { fileURLToPath } from 'url';

// Check the environment variable
// console.log(process.env.NODE_ENV);
const PORT = config.get<number>("port");

//Web Socket configuration
const WS_HOST = config.get<string>("web_socket.host");
const WS_PORT = config.get<number>("web_socket.port");

//Root of the source code
const srcRoot = 'src';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //Same as the location of vite.config.ts
  root: '.',
  publicDir: 'public',
  build: {
    emptyOutDir: true,
    manifest: "vite-manifest.json",
    assetsDir: `${srcRoot}/assets`,
    rollupOptions: {
      input: [
        //`${srcRoot}/main.tsx`
        //Need to compile html according to the manifest.json
        'index.html'
      ],
      output: {
        manualChunks: (id) => {
            //console.log(id);
            if (id.includes('node_modules')) {
                const arr = id.toString().split('node_modules/')[1].split('/');
                switch (arr[0]) {
                    case 'anyPacketWantToUseDefaultChunkDivisionLogic':
                        return;
                    case '@mui':
                        return `${arr[0]}_${arr[1]}`;
                    default:
                        return arr[0];
                }
            }
        }
      }
    }
  },
  server: {
    proxy: {
      //Proxy API request to the backend
      '/api': `http://localhost:${PORT}`
    }
  },
  define: {
    __WS_HOST__: `"${WS_HOST}"`,
    __WS_PORT__: WS_PORT
  },
  resolve: {
    alias: [ 
      { find: '@types', replacement: fileURLToPath(new URL(`./${srcRoot}/types`, import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL(`./${srcRoot}/assets`, import.meta.url)) },
      { find: '@styles', replacement: fileURLToPath(new URL(`./${srcRoot}/styles`, import.meta.url)) },
      { find: '@models', replacement: fileURLToPath(new URL(`./${srcRoot}/models`, import.meta.url)) },
      { find: '@utilities', replacement: fileURLToPath(new URL(`./${srcRoot}/utilities`, import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL(`./${srcRoot}/components`, import.meta.url)) },
    ]
  }
})
