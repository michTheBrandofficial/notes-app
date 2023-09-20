import {
  selectedNotes,
  setNotes,
  setSelectedNotes,
  setformDisplay,
} from 'store';
import { displayRefs, formRef, notesRef } from './refs';
import { useStorage } from './useStorage';
// make the form to be tied to localStorage
export function createNewNote() {
  displayRefs.formRef.current?.style.setProperty('display', 'block');
  setTimeout(() => {
    setformDisplay({
      transform: 'translateX(0)',
      opacity: '1',
    });
    const form = formRef.current;
    setTimeout(() => {
      form?.querySelector('input')?.focus();
    }, 500);
  }, 50);
}

export function closeForm() {
  setformDisplay({
    transform: 'translateX(100%)',
    opacity: '0',
  });
  setTimeout(() => {
    displayRefs.formRef.current?.style.setProperty('display', 'none');
  }, 500);
}

const [getTrash, setTrash] = useStorage<TTrash>('trash');

export function deleteNotes() {
  const toDelete = selectedNotes.$$__value;
  if (Boolean(toDelete.length)) {
    setNotes((prev) => {
      const persistentNotes: TNotes = [];
      const trash: TTrash = prev?.filter((_, i) => {
        let includes = toDelete.includes(i);
        if (!includes) {
          persistentNotes.push(_);
          return !includes;
        } else return includes;
      }) as TNotes;
      setTrash([...(getTrash() || []), ...trash]);
      deselectNotes(toDelete);
      setSelectedNotes([]);
      return persistentNotes as TNotes;
    });
  } else {
    console.log('no selected note');
  }
}

export function deselectNotes(indexArray: number[]) {
  const selectedNotes = notesRef.current?.children;
  indexArray.forEach((index) => {
    selectedNotes?.item(index)?.classList.remove('selected');
  });
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

export function splice<T extends any[]>(array: T, index: number): T[number] {
  const value = array.splice(index, 1)[0];
  return value;
}
