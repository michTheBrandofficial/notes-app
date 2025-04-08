import { ManifestOptions } from 'vite-plugin-pwa';

type ManifestOptionsShortcuts = Omit<
  ManifestOptions['shortcuts'][number],
  'url'
> & {
  url: `?task=${Shortcuts}`;
};

const shortcuts: Array<ManifestOptionsShortcuts> = [
  {
    name: 'Open Settings',
    description: 'Opens the Settings page',
    url: '?task=open-settings',
  },
  {
    name: 'Open Trash',
    description: 'Opens the Trash page',
    url: '?task=open-trash',
  },
  {
    name: 'New Note',
    description: 'Creates a new Note',
    url: '?task=new-note',
  },
];

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
  shortcuts,
  display: 'standalone',
  theme_color: '#d8b4fe',
  background_color: '#fff',
  scope: '/',
  orientation: 'portrait',
};

export default manifest;
