import { setEditedNote } from '@/src/store';
import { ClassList, Style } from '@/src/utils/classes';
import { closeForm } from '@/src/utils/functions';
import {
  MutableRefObject,
  SetSignalDispatcher,
  Signal,
  Store,
  callReaction,
  callSignal,
  effect,
  reaction
} from 'nixix/primitives';

export function setInputReadOnly({
  parentRef,
  readOnlySignal,
}: {
  parentRef: MutableRefObject<HTMLElement | null>;
  readOnlySignal: Signal<boolean>;
}) {
  reaction(() => {
    const editBtn =
      parentRef.current?.querySelector?.<HTMLButtonElement>('.edit-btn')!;
    if (readOnlySignal.value) {
      ClassList.add(editBtn.nextElementSibling as HTMLButtonElement, 'hidden');
      ClassList.remove(editBtn, 'hidden');
    } else {
      ClassList.remove(
        editBtn.nextElementSibling as HTMLButtonElement,
        'hidden'
      );
      ClassList.add(editBtn, 'hidden');
    }
  }, [readOnlySignal]);
}

export function setFormEffect({
  formDisplaySignal,
  editedNote,
  parentRef,
  setReadOnly,
}: {
  formDisplaySignal: Signal<boolean>;
  parentRef: MutableRefObject<HTMLElement | null>;
  editedNote: Store<Optional<EditedNote, 'bodyValue' | 'inputValue'>>;
  setReadOnly: SetSignalDispatcher<boolean>;
}) {
  effect(() => {
    const formDisplay = formDisplaySignal.value;
    const key = editedNote.key?.value;
    if (formDisplay) {
      ClassList.remove(parentRef.current, 'opacity-0', 'translate-x-[100%]');
      if (key === null) {
        setReadOnly(false);
      } else {
        setReadOnly(true);
      }
    } else ClassList.add(parentRef.current, 'opacity-0', 'translate-x-[100%]');
  });
}

export function getPopupPermission(
  popupRef: MutableRefObject<HTMLElement | null>,
  fn: CallableFunction
): [Signal<boolean>, SetSignalDispatcher<boolean>] {
  const [accepted, setAccepted] = callSignal<boolean>(false, { equals: true });
  callReaction(() => {
    ClassList.remove(popupRef, 'scale-up');
    setTimeout(() => {
      Style.set(popupRef, 'display', 'none');
      setTimeout(() => {
        if (accepted.value) {
          setEditedNote({
            bodyValue: null,
            inputValue: null,
            key: null,
          });
          closeForm();
        } else fn();
      }, 170);
    }, 100);
  }, [accepted]);
  return [accepted, setAccepted];
}
