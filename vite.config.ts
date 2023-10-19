import { defineConfig } from 'vite';
// @ts-ignore
import { esbuildOptions } from 'nixix/vite-plugin';
import path from 'path';
// @ts-ignore
import viteJsconfigPaths from 'vite-jsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
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
    manifest: {
      start_url: '/',
      short_name: 'NotesRus',
      name: 'NotesRus',
      description: 'A Note taking app with rich features',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable any',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'apple touch icon',
        },
      ],
      display: 'standalone',
      theme_color: '#d8b4fe',
      background_color: '#fff',
      scope: '/',
      orientation: 'portrait',
    },
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
      store: resolve('./store'),
      '@hooks': resolve('./hooks'),
      database: resolve('./database'),
      'view-components': resolve('./view-components/index.tsx'),
    },
  },
  esbuild: {
    ...esbuildOptions,
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
