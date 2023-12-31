import { CSSProperties } from 'nixix';
import { MutableRefObject } from 'nixix/primitives';

export class CreateNote {
  static DayMap: {
    [index: string]: string;
  } = {
    '0': 'Sunday',
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wednesday',
    '4': 'Thursday',
    '5': 'Friday',
    '6': 'Saturday',
  };

  static getCreationDate(): string {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  static getUpdateTime(): string {
    const now = new Date();
    const updateTime = {
      hours: now.getHours() % 12,
      minutes: now.getMinutes(),
      meridian: () => {
        return now.getHours() >= 12 ? 'PM' : 'AM';
      },
    };
    const day = this.DayMap[`${now.getDay()}`];
    return `${updateTime.hours} : ${
      updateTime.minutes >= 10 ? updateTime.minutes : `0${updateTime.minutes}`
    } ${updateTime.meridian()} ${day}`;
  }
}

export class ClassList {
  /**
   * removes classes from the ref passed to it
   */
  static remove<T extends HTMLElement | SVGElement | null>(
    ref: MutableRefObject<T> | T,
    ...classList: string[]
  ) {
    if (ref instanceof Node)
      (ref as HTMLElement | SVGElement).classList.remove(...classList);
    else (ref as MutableRefObject<T>).current?.classList.remove(...classList);
  }

  /**
   * removes classes from the ref passed to it
   */
  static replace<T extends HTMLElement | SVGElement | null>(
    ref: MutableRefObject<T> | T,
    ...classList: [string, string]
  ) {
    if (ref instanceof Node)
      (ref as HTMLElement | SVGElement).classList.replace(...classList);
    else (ref as MutableRefObject<T>).current?.classList.replace(...classList);
  }

  /**
   * add classes to the ref passed to it
   */
  static add<T extends HTMLElement | SVGElement | null>(
    ref: MutableRefObject<T> | T,
    ...classList: string[]
  ) {
    if (ref instanceof Node)
      (ref as HTMLElement | SVGElement).classList.add(...classList);
    else (ref as MutableRefObject<T>).current?.classList.add(...classList);
  }
}

export class Style {
  static set<
    P extends keyof CSSProperties,
    T extends HTMLElement | SVGElement | null = HTMLElement | SVGElement
  >(ref: MutableRefObject<T> | T, prop: P, value: CSSProperties[P]) {
    if (ref instanceof Node) (ref as any).style[prop] = value;
    // @ts-ignore
    else ref.current.style[prop] = value;
  }
}
