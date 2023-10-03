import { defineConfig } from 'vite';
import viteJsconfigPaths from 'vite-jsconfig-paths';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// @ts-ignore
function resolve(string) {
  return path.resolve(__dirname, string);
}

export default defineConfig({
  base: './',
  plugins: [
    viteJsconfigPaths(),
    VitePWA({
      manifestFilename: 'manifest.json',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
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
    }),
  ],
  resolve: {
    alias: {
      '@styles': resolve('./styles'),
      '@components': resolve('./components'),
      '@assets': resolve('./assets'),
      '@utils': resolve('./utils'),
      store: resolve('./store'),
      database: resolve('./database'),
    },
  },
  esbuild: {
    jsxFactory: 'Nixix.create',
    jsxFragment: '"fragment"',
    jsxImportSource: 'nixix',
    jsxDev: false,
    jsx: 'transform',
    jsxInject: "import Nixix from 'nixix/dom'",
    minifyIdentifiers: true,
  },
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    force: true,
  },
});
