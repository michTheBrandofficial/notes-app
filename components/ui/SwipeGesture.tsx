import { effect } from 'nixix/primitives';
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

const SwipeGesture = ({"on:swipeleft": onSwipeLeft, "on:swiperight": onSwipeRight, children, ...rest}: Partial<SwipeGestureProps>) => {
  children = (children as JSX.Element[]).flat(Infinity);
  effect(() => {
    (children as JSX.Element[])?.forEach((e) => {
      if (!(e instanceof Node))
        throw new Error('Children should be an array of JSX.Element');
      const gesture = new TinyGesture(e as any, {...defaultOptions, ...rest} as any);
        onSwipeRight && gesture.on('swiperight', onSwipeRight);
        onSwipeLeft && gesture.on('swipeleft', onSwipeLeft);
    });
  });

  return children;
};

export default SwipeGesture;
