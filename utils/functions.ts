import NotificationSound from '@assets/audio/mixkit-software-interface-start-2574.wav';
import { UserSettings } from 'database';
import { MutableRefObject } from 'nixix/primitives';
import { cloneObject } from 'nixix/primitives/helpers';
import { selectedNotes, setNotes, setSelectedNotes } from 'store';
import { setNotification, setSelectOp, setformDisplay } from 'store/display';
import { getTrash, setTrashStore } from 'store/trash';
import { ClassList } from './classes';
import { displayRefs, notesRef } from './refs';

const settingsInstance: Null<UserSettings> = new UserSettings();
settingsInstance._settings;
export function createNewNote() {
  setformDisplay(true);
}

export function closeForm() {
  setformDisplay(false);
}

let permanentDeletionSetting: boolean = isNull(
  settingsInstance?._settings?.['permanent deletion'],
  false
);
settingsInstance.addEventListener('get:permanent deletion', (e) => {
  permanentDeletionSetting = e;
});
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
      permanentDeletionSetting === false &&
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

export function patchObject<O extends AnyObject, N extends AnyObject>(
  obj: O,
  newObj: N
) {
  const clonedObject = cloneObject(obj);
  Object.entries(newObj)?.forEach(([key, val]) => {
    // @ts-ignore;
    clonedObject[key] = val;
  });
  return clonedObject as O;
}

export function removeUnusedProps<
  T extends AnyObject,
  K extends keyof T = keyof T
>(props: T, ...propNames: K[]) {
  const newProps: { [index: string]: any } = {};
  for (const propName of propNames) {
    newProps[propName as string] = props[propName];
    delete props[propName];
  }
  return newProps as {
    [index in K]: T[index];
  };
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

export function lowerCase<T extends string>(str: T): Lowercase<T> {
  return str.toLowerCase() as Lowercase<T>;
}

export function removeLast(arr: string[]) {
  if (arr.length > 3) arr.length = 3;
  return arr as IUserSettings['font size']['recentOptions'];
}

export function getDefault<T extends keyof IUserSettings>(
  settings: T,
  def: IUserSettings
): IUserSettings[T] {
  return def[settings];
}

export function createLesserSize(str: `${string}px`) {
  return (Number(str.replace('px', '')) - 3).toString().concat('px');
}

export function bindMethod<T extends { [index: string]: any }>(
  that: T,
  met: keyof T
) {
  return that[met].bind(that);
}

export function isNull(val: any, def?: boolean) {
  if (val === null || val === undefined) return def === false ? false : true;
  else return val;
}

let notificationSetting: boolean = isNull(
  settingsInstance?._settings?.notifications
);
settingsInstance?.addEventListener('get:notifications', (e) => {
  notificationSetting = e;
});
export function showNotification(message: string) {
  if (notificationSetting) {
    setNotification({
      message,
    });
    const notifiEl = displayRefs.notificationRef.current;
    notifiEl?.classList.add('notifi');
    const audio = new Audio(NotificationSound);
    audio.play();
    setTimeout(() => {
      notifiEl?.classList.remove('notifi');
    }, 3000);
  }
}

export function showTrash() {
  const trashRef = displayRefs.trashRef;
  ClassList.remove(trashRef, 'opacity-0', 'translate-x-[100%]');
  trashRef.current?.querySelector('button')?.focus();
}

export function showSettings() {
  const settingsRef = displayRefs.settingsRef;
  ClassList.remove(settingsRef, ...['translate-x-[-100%]', 'opacity-0']);
}

export function showHome(
  ref: MutableRefObject<HTMLElement | null>,
  { classes }: { classes: string[] }
) {
  ClassList.add(ref, ...classes);
}
