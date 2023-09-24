import { selectedNotes, setNotes, setSelectedNotes } from 'store';
import { setNotification, setSelectOp, setformDisplay } from 'store/display';
import { getTrash, setTrash } from 'store/trash';
import { displayRefs, notesRef } from './refs';

export function createNewNote() {
  displayRefs.formRef.current?.style.setProperty('display', 'block');
  setTimeout(() => {
    setformDisplay({
      transform: 'translateX(0)',
      opacity: '1',
    });
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
      setTrash([...trash, ...(getTrash() || [])]);
      return persistentNotes as TNotes;
    });
    setSelectOp('0');
    deselectNotes(toDelete);
    setSelectedNotes([]);
  } else {
    showNotification('Please select notes to delete');
  }
}

export function deselectNotes(indexArray: number[]) {
  const selectedNotes = notesRef.current?.children;
  indexArray.forEach((index) => {
    selectedNotes?.item(index)?.classList.remove('selected');
  });
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

export function showNotification(message: string) {
  setNotification({
    message,
  });
  const notifiEl = displayRefs.notificationRef.current;
  notifiEl?.classList.add('notifi');
  setTimeout(() => {
    notifiEl?.classList.remove('notifi');
  }, 3000);
}

export function showTrash() {}
