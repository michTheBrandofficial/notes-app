import { MutableRefObject } from 'nixix/primitives';

export class CreateNote {
  static DayMap: {
    [key: string]: string;
  };

  constructor() {
    CreateNote.DayMap = {
      '0': 'Sunday',
      '1': 'Monday',
      '2': 'Tuesday',
      '3': 'Wednesday',
      '4': 'Thursday',
      '5': 'Friday',
      '6': 'Saturday',
    };
  }

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
    const day = CreateNote.DayMap[`${now.getDay()}` as any];
    return `${updateTime.hours} : ${
      updateTime.minutes >= 10 ? updateTime.minutes : `0${updateTime.minutes}`
    } ${updateTime.meridian()} ${day}`;
  }
}

export class ClassList {
  /**
   * removes classes from the ref passed to it
   */
  static remove(
    ref: MutableRefObject<HTMLElement | null>,
    ...classList: string[]
  ) {
    ref.current?.classList.remove(...classList);
  }

  /**
   * add classes to the ref passed to it
   */
  static add(
    ref: MutableRefObject<HTMLElement | null>,
    ...classList: string[]
  ) {
    ref.current?.classList.add(...classList);
  }
}
