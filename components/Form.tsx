import { ClassList, CreateNote } from '@utils/classes';
import { closeForm, removeValue, splice } from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import { check, chevronLeft } from '@utils/nixix-heroicon/outline';
import { displayRefs, formRef, notesRef } from '@utils/refs';
import { callReaction, callRef, callSignal, effect } from 'nixix/primitives';
import { FormEvent, TransitionEvent } from 'nixix/types/eventhandlers';
import { editedNote, setEditedNote, setNotes } from 'store';
import { formDisplay } from 'store/display';
import Popup from './Popup';

/**
 * isPopup state for changing state
 */
// on:submit function
const Form = () => {
  let inputs: Inputs = [];
  effect(() => {
    inputs[0] = formRef?.current?.querySelector('input');
    inputs[1] = formRef?.current?.querySelector('textarea');
  }, 'once');

  const popupRef = callRef<HTMLElement>();
  const [accepted, setAccepted] = callSignal<boolean>(false, { equals: true });
  callReaction(() => {
    ClassList.remove(popupRef, 'scale-up');
    setTimeout(() => {
      if (accepted.value) {
        closeForm();
        removeValue(...(inputs as any));
      } else focusInput();
    }, 170);
  }, [accepted]);

  function handleSubmbit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: TNote = {
      title: formData.get('title'),
      body: formData.get('body'),
    };

    if (data.title === '') return closeForm();
    else {
      data.time = CreateNote.getUpdateTime();
    }

    const key = editedNote.$$__value.key;
    if (key === null) {
      data.createdDate = CreateNote.getCreationDate();
    }
    setNotes((prev) => {
      if (typeof key === 'number') {
        const update = splice(prev as TNotes, key);
        editedNote.$$__value.key = null;
        if (update) {
          update.body = data.body;
          update.title = data.title;
          update.time = data.time;
        }
        prev?.unshift(update as TNote);
        return prev as TNotes;
      }
      prev?.unshift(data);
      return prev as TNotes;
    });
    notesRef.current?.scroll({
      behavior: 'smooth',
      left: 0,
    });
    setTimeout(() => {
      removeValue(...(inputs as any));
      closeForm();
    }, 100);
  }

  function focusInput(e?: TransitionEvent<HTMLElement>) {
    if (formDisplay.$$__value.opacity === '0') return;
    inputs[0]?.focus();
  }

  return (
    <section
      className={'w-full h-screen bg-white absolute top-0 z-30 tr-1 '}
      on:transitionend={focusInput}
      style={{
        display: 'none',
        transform: formDisplay.transform,
        opacity: formDisplay.opacity,
      }}
      bind:ref={displayRefs.formRef}
    >
      <Popup ref={popupRef} setAccepted={setAccepted} />
      <section className={'w-full h-full flex flex-col p-2 lg:px-12 '}>
        <div className={'w-full h-fit flex items-center justify-between '}>
          <button
            on:click={() => {
              if (Boolean(inputs[0]?.value) || Boolean(inputs[1]?.value)) {
                ClassList.add(popupRef, 'scale-up');
                return;
              }
              closeForm();
            }}
          >
            <Icon
              className={'stroke-blue-400 fill-none  '}
              path={chevronLeft}
              size={28}
              stroke:width={2.5}
            />
          </button>
          <p className="text-blue-400 text-[20px] font-bold ">Design</p>

          <button
            className={'ml-auto '}
            on:click={() => formRef?.current?.requestSubmit()}
          >
            <Icon
              className={'stroke-blue-400 fill-none stroke-[3px] '}
              path={check}
              size={28}
              stroke:width={2.5}
            />
          </button>
        </div>
        <form
          on:submit={handleSubmbit}
          bind:ref={formRef}
          className={
            'w-full h-full flex flex-col text-darkBlue px-2 pt-2 space-y-2 '
          }
        >
          <input
            type="text"
            value={editedNote.inputValue}
            className={
              'w-full h-12 font-semibold text-lg pl-2 focus:outline-none border-none '
            }
            autocapitalize={'sentences'}
            spellcheck
            name={'title'}
            placeholder={'Title'}
          />
          <textarea
            spellcheck
            value={editedNote.bodyValue as any}
            autocapitalize={'sentences'}
            name="body"
            cols={30}
            rows={10}
            placeholder={'Take a note...'}
            className={
              'w-full h-full text-[15px] p-2 font-semibold focus:outline-none '
            }
          ></textarea>
        </form>
      </section>
    </section>
  );
};

export default Form;
