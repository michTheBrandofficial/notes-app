import { MutableRefObject, effect } from 'nixix/primitives';
import TinyGesture from 'tinygesture';

type SwipeGestureProps = {
  'on:swiperight': () => void;
  'on:swipeleft': () => void;
  children?: any;
  gestureRef: MutableRefObject<HTMLElement | null>;
};

const options: SwipeOptions = {
  threshold(type, self) {
    return 50;
  },
  velocityThreshold: 100,
  diagonalSwipes: false,
  mouseSupport: false,
  diagonalLimit: 0,
};

const SwipeGesture = (
  props: Optional<SwipeGestureProps, 'on:swiperight' | 'on:swipeleft'>
): someView => {
  const { gestureRef } = props;
  if (!gestureRef) throw new Error('gestureRef argument not passed');
  effect(() => {
    const gesture = new TinyGesture(gestureRef.current!, options as any);
    if (props['on:swiperight'])
      gesture.on('swiperight', (props as SwipeGestureProps)['on:swiperight']!);
    if (props['on:swipeleft'])
      gesture.on('swipeleft', (props as SwipeGestureProps)['on:swipeleft']!);
  }, 'once');

  return props.children as JSX.Element;
};

export default SwipeGesture;
