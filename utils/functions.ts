import { selectedNotes, setNotes, setSelectedNotes } from 'store';
import { setNotification, setSelectOp, setformDisplay } from 'store/display';
import { getTrash, setTrashStore } from 'store/trash';
import { ClassList } from './classes';
import { displayRefs, notesRef } from './refs';

export function createNewNote() {
  setformDisplay(true);
}

export function closeForm() {
  setformDisplay(false);
}

export function deleteNotes() {
  const toDelete = selectedNotes.$$__value;
  if (Boolean(toDelete.length)) {
    setNotes((prev) => {
      const persistentNotes: TNotes = [];
      const trash: TTrash = [];

      prev?.forEach((note, i) => {
        let includes = Boolean(toDelete.includes(i));
        if (includes === true) {
          trash.push(note as unknown as TrashType);
        } else {
          persistentNotes.push(note);
        }
      });
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
  ClassList.remove(trashRef, 'opacity-0', 'translate-x-[100%]');
  trashRef.current?.querySelector('button')?.focus();
}

export function showHome() {
  const trashRef = displayRefs.trashRef;
  ClassList.add(trashRef, 'opacity-0', 'translate-x-[100%]');
}
