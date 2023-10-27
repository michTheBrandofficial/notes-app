import { defineConfig } from 'vite';
// @ts-ignore
import { esbuildOptions } from 'nixix/vite-plugin';
import path from 'path';
// @ts-ignore
import viteJsconfigPaths from 'vite-jsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './pwa.manifest';
import HMR from './asset-vite-plugin/hmr';

// @ts-ignore
function resolve(string) {
  return path.resolve(__dirname, string);
}

const pwaSetup = [
  ...VitePWA({
    manifestFilename: 'manifest.json',
    registerType: 'autoUpdate',
    includeAssets: [
      'favicon.ico',
      'apple-touch-icon.png',
      'masked-icon.svg',
      'assets/*.ttf',
      'assets/*.png',
    ],
    manifest,
    minify: false,
  }),
];

export default defineConfig({
  base: './',
  plugins: [viteJsconfigPaths(), pwaSetup, HMR()],
  resolve: {
    alias: {
      '@styles': resolve('./styles'),
      '@components': resolve('./components'),
      '@assets': resolve('./assets'),
      '@utils': resolve('./utils'),
      '@pages': resolve('./pages'),
      store: resolve('./store'),
      '@hooks': resolve('./hooks'),
      database: resolve('./database'),
      'view-components': resolve('./view-components/index.tsx'),
    },
  },
  esbuild: {
    ...esbuildOptions,
    legalComments: 'none',
  },
  server: {
    hmr: {
      overlay: true,
      timeout: 1000,
    },
  },
  appType: 'spa',
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    force: true,
  },
});
