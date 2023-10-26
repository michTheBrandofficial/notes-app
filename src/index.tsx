import { render } from 'nixix/dom';
import View from './View';
import './index.css';
import { Suspense } from 'nixix/hoc';

// make and export default a function called Mount then the hmr plugin will call it when needed

/* @module-reload */
const root = document.querySelector('body#notes-app') as HTMLElement;
const Mount = () => {
  render(
    <Suspense>
      <View />
    </Suspense>,
    root
  );
};

Mount();

export default Mount;
