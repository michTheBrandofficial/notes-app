import { ClassList, CreateNote, Style } from '@utils/classes';
import {
  closeForm,
  removeValue,
  showNotification,
  splice,
} from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import { check, chevronLeft } from '@utils/nixix-heroicon/outline';
import { notesRef } from '@utils/refs';
import { callReaction, callRef, callSignal, effect } from 'nixix/primitives';
import { FormEvent, TransitionEvent } from 'nixix/types/eventhandlers';
import { editedNote, setEditedNote, setNotes } from 'store';
import { formDisplay } from 'store/display';
import Popup from './Popup';

// props for null
// setEditedNote({bodyValue: null, inputValue: null})
// Nixix not parsing null

const Form = () => {
  const sectionRef = callRef<HTMLElement>();
  callReaction(() => {
    if (formDisplay.value)
      ClassList.remove(sectionRef.current, 'opacity-0', 'translate-x-[100%]');
    else ClassList.add(sectionRef.current, 'opacity-0', 'translate-x-[100%]');
  }, [formDisplay]);

  let inputs: Inputs = [];
  effect(() => {
    inputs[0] = sectionRef?.current?.querySelector('input');
    inputs[1] = sectionRef?.current?.querySelector('textarea');
  }, 'once');

  const popupRef = callRef<HTMLElement>();
  const [accepted, setAccepted] = callSignal<boolean>(false, { equals: true });
  callReaction(() => {
    ClassList.remove(popupRef, 'scale-up');
    setTimeout(() => {
      Style.set(popupRef, 'display', 'none');
      setTimeout(() => {
        if (accepted.value) {
          setEditedNote({
            bodyValue: '',
            inputValue: '',
          });
          closeForm();
        } else focusInput();
      }, 170);
    }, 100);
  }, [accepted]);

  function handleSubmbit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: TNote = {
      title: formData.get('title'),
      body: formData.get('body'),
    };

    if (data.title === '') {
      closeForm();
      return showNotification('Note titles cannot be empty');
    }
    data.time = CreateNote.getUpdateTime();

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
      setEditedNote({
        bodyValue: '',
        inputValue: '',
      });
      closeForm();
    }, 100);
  }

  function focusInput(e?: TransitionEvent<HTMLElement>) {
    e?.stopPropagation();
    if (formDisplay.value === false) return;
    inputs[0]?.focus();
  }

  return (
    <section
      className={
        'w-full h-full bg-white absolute top-0 z-30 tr-1 translate-x-[100%]  opacity-0'
      }
      bind:ref={sectionRef}
      on:transitionend={focusInput}
    >
      <Popup ref={popupRef} setAccepted={setAccepted} />
      <section className={'w-full h-full flex flex-col p-2 lg:px-12 '}>
        <div className={'w-full h-fit flex items-center justify-between '}>
          <button
            on:click={() => {
              if (Boolean(inputs[0]?.value) || Boolean(inputs[1]?.value)) {
                Style.set(popupRef, 'display', 'flex');
                return setTimeout(() => {
                  ClassList.add(popupRef, 'scale-up');
                }, 100);
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
            on:click={() =>
              sectionRef?.current?.querySelector('form')?.requestSubmit()
            }
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
          className={
            'w-full h-full flex flex-col text-darkBlue px-2 pt-2 space-y-2 '
          }
        >
          <input
            type="text"
            value={editedNote.inputValue}
            className={
              'w-full h-12 font-semibold text-lg pl-2 focus:outline-none border-none selection:bg-[#d8b4fe] '
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
              'w-full h-full text-[15px] p-2 font-semibold focus:outline-none selection:bg-[#d8b4fe] '
            }
          ></textarea>
        </form>
      </section>
    </section>
  );
};

export default Form;
