import { effect } from 'nixix/primitives';
import TinyGesture from 'tinygesture';

type PannableProps = { children: JSX.Element | JSX.Element[] };

const Pannable = (props: PannableProps): someView => {
  let { children } = props;
  children = (children as JSX.Element[]).flat(Infinity);
  effect(() => {
    (children as JSX.Element[]).forEach((el) => {
      const node = el as unknown as HTMLElement;
      if (!(node instanceof Node))
        throw new Error(`Can't pass a ${typeof node} as a pannable element`);
      const gesture = new TinyGesture(node as unknown as HTMLElement);
      let animationFrame: Null<number> = null;

      gesture.on('panmove', () => {
        if (animationFrame) {
          return;
        }
        animationFrame = requestAnimationFrame(() => {
          if (gesture.swipingDirection !== 'horizontal') {
            return;
          }

          console.log(
            'moveX:',
            gesture.touchMoveX,
            'moveY:',
            gesture.touchMoveY
          );

          // Give an indication of how far the user has pulled the target away from its origin.
          // node.style.transform = `translateX()`
          animationFrame = null;
        });
      });

      gesture.on('panend', () => {
        animationFrame == null || window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
        node.style.transform = '';
        node.style.left = '0px';
        node.style.top = '0px';
        node.style.opacity = '1';
      });
    });
  });

  return children;
};

export default Pannable;
