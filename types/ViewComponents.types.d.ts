import { HTMLAttributes } from 'nixix';

export {};

declare global {
  type ViewComponentType<T = HTMLAttributes<HTMLElement>> = T &
    JSX.IntrinsicAttributes;
}
