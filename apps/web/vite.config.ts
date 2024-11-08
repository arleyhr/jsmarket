/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/web',

    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL)
    },

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
    },
    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest'
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/web',
        provider: 'v8'
      }
    }
  };
});
