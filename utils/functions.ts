import { formRef, sectionRef } from './refs';
// make the form to be tied to localStorage
export function createNewNote() {
  sectionRef.current?.classList.add('right-t');

  const form = formRef.current;
  form?.querySelector('input')?.focus?.();
}

const DayMap: any = {
  '0': 'Sunday',
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday',
};

export function getCreationDate(): string {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function getUpdateTime(): string {
  const now = new Date();
  const updateTime = {
    hours: now.getHours() % 12,
    minutes: now.getMinutes(),
    meridian: () => {
      return now.getHours() >= 12 ? 'PM' : 'AM';
    },
  };
  const day = DayMap[`${now.getDay()}` as any];
  return `${updateTime.hours} : ${
    updateTime.minutes >= 10 ? updateTime.minutes : `0${updateTime.minutes}`
  } ${updateTime.meridian()} ${day}`;
}

export function removeValue(
  ...elements: (HTMLInputElement | HTMLTextAreaElement)[]
) {
  elements.forEach((el) => {
    el.value = '';
  });
}
