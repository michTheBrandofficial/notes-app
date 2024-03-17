import { Plugin as Plugin_2 } from 'vite';
import { join, normalize } from 'path';

export default function HMR(): Plugin_2[] {
  const plugin: Plugin_2 = {
    name: 'nixix-vite-hmr',
    apply: 'serve',

    async transform(code, id) {
      // if file extension is not ts | js | jsx | tsx.
      if (/node_modules/.test(id) || !/\.(t|j)sx?$/.test(id)) return;
      const path = normalize(join(`${process.cwd()}`, 'src', 'index.tsx'));
      const regExp = normalize(id).includes(path);
      // index.tsx
      if (regExp) {
        const prelude = `if (import.meta.hot) {
            import.meta.hot?.accept((newMod) => {
              nixixStore?.$$__routeProvider?.replaceChildren('');
              newMod?.default();
            });
          }
          import { nixixStore } from 'nixix/dom/index';`;
        return {
          code: `${prelude}${code}`,
        };
      }
    },
  };

  return [plugin];
}
