import { setFormDisplay } from 'store';
import { formRef } from './refs';
// make the form to be tied to localStorage
export function createNewNote() {
  setFormDisplay(true);

  const form = formRef.current;
  form?.querySelector('input')?.focus?.();
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
  return `${updateTime.hours} : ${
    updateTime.minutes >= 10 ? updateTime.minutes : `0${updateTime.minutes}`
  } ${updateTime.meridian()} Monday`;
}
