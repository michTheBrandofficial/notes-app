import { NixixNode } from 'nixix';
import { MutableRefObject, effect } from 'nixix/primitives';
import TinyGesture from 'tinygesture';

type SwipeGestureProps = {
  'on:swiperight': () => void;
  'on:swipeleft': () => void;
  children?: JSX.Element[] | JSX.Element;
};

const options: SwipeOptions = {
  threshold(type, self) {
    return 25;
  },
  velocityThreshold: 100,
  diagonalSwipes: false,
  mouseSupport: false,
  diagonalLimit: 0,
};

const SwipeGesture = (
  props: Optional<SwipeGestureProps, 'on:swiperight' | 'on:swipeleft'>
) => {
  let { children } = props;
  children = (children as JSX.Element[]).flat(Infinity);
  effect(() => {
    (children as JSX.Element[])?.forEach((e) => {
      if (!(e instanceof Node))
        throw new Error('Children should be an array of JSX.Element');
      const gesture = new TinyGesture(e as any, options as any);
      if (props['on:swiperight'])
        gesture.on(
          'swiperight',
          (props as SwipeGestureProps)['on:swiperight']!
        );
      if (props['on:swipeleft'])
        gesture.on('swipeleft', (props as SwipeGestureProps)['on:swipeleft']!);
    });
  }, 'once');

  return children;
};

export default SwipeGesture;
