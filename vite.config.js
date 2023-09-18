import { defineConfig } from 'vite';
import viteJsconfigPaths from 'vite-jsconfig-paths';
import path from 'path';
// @ts-ignore
function resolve(string) {
  return path.resolve(__dirname, string);
}

export default defineConfig({
  plugins: [viteJsconfigPaths()],
  resolve: {
    alias: {
      '@styles': resolve('./styles'),
      '@components': resolve('./components'),
      '@assets': resolve('./assets'),
      '@utils': resolve('./utils'),
    },
  },
  esbuild: {
    jsxFactory: 'Nixix.create',
    jsxFragment: '"fragment"',
    jsxImportSource: 'nixix',
    jsxInject: "import Nixix from 'nixix/dom'",
    minifyIdentifiers: true,
  },
  optimizeDeps: {
    force: true,
  },
});
