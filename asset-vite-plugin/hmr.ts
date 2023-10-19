import { Plugin as Plugin_2 } from 'vite';

export default function HMR(): Plugin_2[] {
  const plugin: Plugin_2 = {
    name: 'nixix-vite-hmr',
    apply: 'serve',
    handleHotUpdate(ctx) {
      (ctx.read() as Promise<string>)?.then?.((value) => {
        console.log(value);
      });
    },
  };

  return [plugin];
}
