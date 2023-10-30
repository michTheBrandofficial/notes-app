import { patchObject, removeUnusedProps } from '@utils/functions';
import { effect } from 'nixix/primitives';
import { cloneObject } from 'nixix/primitives/helpers';
import TinyGesture from 'tinygesture';

type SwipeGestureProps = {
  'on:swiperight': () => void;
  'on:swipeleft': () => void;
  children?: JSX.Element[] | JSX.Element;
} & SwipeOptions;

const defaultOptions: SwipeOptions = {
  threshold(type, self) {
    return 25;
  },
  velocityThreshold: 10,
  diagonalSwipes: false,
  mouseSupport: false,
  diagonalLimit: 0,
};

const SwipeGesture = (props: Partial<SwipeGestureProps>) => {
  const removedProps = removeUnusedProps<typeof props>(
    props,
    'children',
    'on:swipeleft',
    'on:swiperight'
  );
  const options = patchObject(defaultOptions, props);
  let { children } = removedProps;
  children = (children as JSX.Element[]).flat(Infinity);
  effect(() => {
    (children as JSX.Element[])?.forEach((e) => {
      if (!(e instanceof Node))
        throw new Error('Children should be an array of JSX.Element');
      const gesture = new TinyGesture(e as any, defaultOptions as any);
      if (removedProps['on:swiperight'])
        gesture.on(
          'swiperight',
          (removedProps as SwipeGestureProps)['on:swiperight']!
        );
      if (removedProps['on:swipeleft'])
        gesture.on(
          'swipeleft',
          (removedProps as SwipeGestureProps)['on:swipeleft']!
        );
    });
  }, 'once');

  return children;
};

export default SwipeGesture;
