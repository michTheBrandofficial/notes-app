import { MouseEvent, MouseEventHandler } from 'nixix/types/eventhandlers';

class ClickAndHold<T extends HTMLElement = HTMLElement> {
  timerId: number | undefined;
  delay: number | undefined;
  isLongPress: boolean;
  onlongpress: MouseEventHandler<T>;
  onclick?: MouseEventHandler<T>;

  constructor(
    onlongpress: ClickAndHold['onlongpress'],
    delay = 500,
    onclick?: ClickAndHold['onclick']
  ) {
    this.timerId = undefined;
    this.isLongPress = false;
    this.delay = delay;
    this.onlongpress = onlongpress;
    onclick ? (this.onclick = onclick) : null;
  }

  apply(element: T) {
    element.addEventListener('click', this.handleClick.bind(this) as any);
    element.addEventListener(
      'mousedown',
      this.handleMouseDown.bind(this) as any
    );
    element.addEventListener('mouseup', this.handleMouseUp.bind(this) as any);
    element.addEventListener(
      'touchstart',
      this.handleOnTouchStart.bind(this) as any
    );
    element.addEventListener(
      'touchend',
      this.handleOnTouchEnd.bind(this) as any
    );
  }

  handleClick(e: MouseEvent<T>) {
    if (this.isLongPress) {
      return;
    }
    this.onclick && this.onclick(e);
  }
  handleMouseDown(e: MouseEvent<T>) {
    this.startPressTimer(e);
  }
  handleMouseUp() {
    clearTimeout(this.timerId);
  }

  handleOnTouchStart(e: MouseEvent<T>) {
    this.startPressTimer(e);
  }
  handleOnTouchEnd() {
    clearTimeout(this.timerId);
  }
  startPressTimer(e: MouseEvent<T>) {
    this.isLongPress = false;
    this.timerId = window.setTimeout(() => {
      this.onlongpress(e);
      this.isLongPress = true;
    }, this.delay);
  }
}

export default ClickAndHold;
