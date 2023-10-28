import { ManifestOptions } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> = {
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
  background_color: '#d8b4fe',
  scope: '/',
  orientation: 'portrait',
};

export default manifest;
