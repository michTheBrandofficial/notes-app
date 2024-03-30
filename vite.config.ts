import Nixix from 'nixix/vite-plugin';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import viteJsconfigPaths from 'vite-jsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './src/app-config/pwa.manifest';

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
  plugins: [viteJsconfigPaths(), pwaSetup, Nixix({
    hmr: true
  })],
  resolve: {
    alias: {
      "@": resolve('./'),
      "~": resolve('./src/')
    },
  },
  build: {
    target: 'esnext',
  },
  server: {
    hmr: true
  },
});
