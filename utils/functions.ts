import { selectedNotes, setNotes, setSelectedNotes } from 'store';
import { setNotification, setSelectOp, setformDisplay } from 'store/display';
import { getTrash, setTrashStore } from 'store/trash';
import { ClassList, Style } from './classes';
import { displayRefs, notesRef } from './refs';

export function createNewNote() {
  Style.set(displayRefs.formRef, 'display', 'block');
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
    Style.set(displayRefs.formRef, 'display', 'none');
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
      setTrashStore([...trash, ...(getTrash() || [])]);
      deselectNotes(toDelete);
      return persistentNotes as TNotes;
    });
    setSelectOp('0');
    setSelectedNotes([]);
    notesRef.current?.scroll({
      behavior: 'smooth',
      left: 0,
    });
  } else {
    showNotification('Please select notes to delete');
  }
}

export function deselectNotes(indexArray: number[]) {
  const selectedNotes = notesRef.current?.children as HTMLCollection;
  indexArray.forEach((index) => {
    ClassList.remove(selectedNotes?.item(index) as any, 'selected');
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

export function showTrash() {
  const trashRef = displayRefs.trashRef;
  const opacity = trashRef.current?.style.opacity!;
  if (opacity === '1') return;
  Style.set(trashRef, 'zIndex', '10');
  Style.set(trashRef, 'opacity', '1');
  displayRefs.xButtonRef.current?.click();
}

export function showHome() {
  const trashRef = displayRefs.trashRef;
  const opacity = trashRef.current?.style.opacity!;
  if (opacity === '0') return;
  Style.set(trashRef, 'opacity', '0');
  setTimeout(() => {
    Style.set(trashRef, 'zIndex', '0');
  }, 800);
}
