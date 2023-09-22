import Icon from '@utils/nixix-heroicon';
import { check, chevronLeft } from '@utils/nixix-heroicon/outline';
import { editedNote, formDisplay, setEditedNote, setNotes } from 'store';
import { displayRefs, formRef } from '@utils/refs';
import { FormEvent, TransitionEvent } from 'nixix/types/eventhandlers';
import {
  closeForm,
  getCreationDate,
  getUpdateTime,
  removeValue,
  splice,
} from '@utils/functions';
import { effect } from 'nixix/primitives';

// on:submit function
const Form = () => {
  let inputs: Inputs = [];
  effect(() => {
    inputs[0] = formRef?.current?.querySelector('input');
    inputs[1] = formRef?.current?.querySelector('textarea');
  }, 'once');

  function handleSubmbit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: TNote = {
      title: formData.get('title'),
      body: formData.get('body'),
    };

    if (data.title === '') return closeForm();
    else {
      data.time = getUpdateTime();
    }

    const key = editedNote.$$__value.key;
    if (key === null) {
      data.createdDate = getCreationDate();
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
    removeValue(...(inputs as any));
    closeForm();
  }

  /**
   * focuses on the input element only after the form is transitioned into the dom.
   */
  function focusInput(e: TransitionEvent<HTMLElement>) {
    // if the form opacity is 0, return;
    if (formDisplay.$$__value.opacity === '0') return;
    const form = formRef.current;
    form?.querySelector('input')?.focus();
  }

  return (
    <section
      className={
        'w-full h-screen bg-white absolute top-0 z-30 tr-1 p-2 lg:px-12 '
      }
      on:transitionend={focusInput}
      style={{
        display: 'none',
        transform: formDisplay.transform,
        opacity: formDisplay.opacity,
      }}
      bind:ref={displayRefs.formRef}
    >
      <section className={'w-full h-full flex flex-col '}>
        <div className={'w-full h-fit flex items-center justify-between '}>
          <button
            on:click={() => {
              if (Boolean(inputs[0]?.value) || Boolean(inputs[1]?.value)) {
                const check = confirm('Do you want to discard');
                if (check) {
                  setEditedNote({
                    bodyValue: '',
                    inputValue: '',
                    key: null,
                  });
                  closeForm();
                } else {
                  return inputs[0]?.focus();
                }
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
              'w-full h-12 font-semibold  text-lg pl-2 focus:outline-none border-none '
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
            className={'w-full h-full p-2 font-semibold focus:outline-none '}
          ></textarea>
        </form>
      </section>
    </section>
  );
};

export default Form;
