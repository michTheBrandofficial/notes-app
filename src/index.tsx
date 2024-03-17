import { render } from 'nixix/dom';
import View from './View';
import './index.css';

const root = document.querySelector<HTMLElement>('body#notes-app');
const Mount = () => {
  render(() => <View />, root!);
};

Mount();

export default Mount;
