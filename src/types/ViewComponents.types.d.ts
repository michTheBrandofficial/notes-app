import { HTMLAttributes, NixixNode } from 'nixix';

export {};

declare global {
  type Children = {
    children?: NixixNode;
  };

  type ViewComponentType<T = HTMLAttributes<HTMLElement>> = T & Children;
}
