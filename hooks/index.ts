import { ClassList, Style } from '@utils/classes';
import { raise } from '@utils/errors';
import { closeForm } from '@utils/functions';
import {
  MutableRefObject,
  SetSignalDispatcher,
  SignalObject,
  StoreObject,
  callEffect,
  callReaction,
  callSignal,
  callStore,
} from 'nixix/primitives';
import { setEditedNote } from 'store';

export function setInputReadOnly({
  parentRef,
  readOnlySignal,
}: {
  parentRef: MutableRefObject<HTMLElement | null>;
  readOnlySignal: SignalObject<boolean>;
}) {
  callEffect(() => {
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
  formDisplaySignal: SignalObject<boolean>;
  parentRef: MutableRefObject<HTMLElement | null>;
  editedNote: StoreObject<Optional<EditedNote, 'bodyValue' | 'inputValue'>>;
  setReadOnly: SetSignalDispatcher<boolean>;
}) {
  callReaction(() => {
    const key = editedNote.$$__value.key;
    if (formDisplaySignal.value) {
      ClassList.remove(parentRef.current, 'opacity-0', 'translate-x-[100%]');
      if (key === null) {
        setReadOnly(false);
      } else {
        setReadOnly(true);
      }
    } else ClassList.add(parentRef.current, 'opacity-0', 'translate-x-[100%]');
  }, [formDisplaySignal]);
}

export function getPopupPermission(
  popupRef: MutableRefObject<HTMLElement | null>,
  fn: CallableFunction
): [SignalObject<boolean>, SetSignalDispatcher<boolean>] {
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
