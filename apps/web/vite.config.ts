/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/web',

  server: {
    port: 4200,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      port: 4200,
      host: 'localhost',
      protocol: 'ws'
    },
    watch: {
      usePolling: true,
      interval: 1000
    },
    cors: true
  },

  plugins: [react(), nxViteTsPaths()],

  build: {
    outDir: '../../dist/apps/web',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }
});
