import Popup from '@components/Popup';
import { getPopupPermission, setFormEffect, setInputReadOnly } from '@hooks';
import { ClassList, CreateNote, Style } from '@utils/classes';
import {
  closeForm,
  createLesserSize,
  showNotification,
  splice,
} from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import { check, chevronLeft, pencil } from '@utils/nixix-heroicon/outline';
import { notesRef } from '@utils/refs';
import { UserSettings } from 'database';
import { callRef, callSignal, effect } from 'nixix/primitives';
import {
  FormEvent,
  KeyboardEvent,
  TransitionEvent,
} from 'nixix/types/eventhandlers';
import { editedNote, setEditedNote, setNotes } from 'store';
import { formDisplay } from 'store/display';
import {
  Button,
  FormField,
  HStack,
  Paragragh,
  TextArea,
  TextField,
  VStack,
} from 'view-components';

const Form = (): someView => {
  const settingsInstance = new UserSettings();
  const userSettings: IUserSettings | null = settingsInstance?._settings;
  const baseSize = userSettings?.['font size']?.default || '18px';
  let sizes = [baseSize, createLesserSize(baseSize)];
  let bp = userSettings?.['bullet points']?.default || 'none';
  settingsInstance?.addEventListener('get:font size', (e) => {
    inputs[0]!.style.fontSize = e.default;
    inputs[1]!.style.fontSize = createLesserSize(e.default);
  });

  settingsInstance?.addEventListener('get:bullet points', (e) => {
    bp = e.default;
    if (bp === 'none' || bp === 'None') {
      inputs[1]?.removeEventListener('keyup', addBP as any);
    }
  });

  // ui
  const sectionRef = callRef<HTMLElement>();
  const popupRef = callRef<HTMLElement>();
  const [readOnly, setReadOnly] = callSignal<boolean>(true);
  const inputs: Inputs = [] as any;
  effect(() => {
    const qs = sectionRef?.current?.querySelector.bind(sectionRef.current);
    inputs.push(...[qs?.('input'), qs?.('textarea')]);
    if (bp !== 'none' && bp !== 'None') {
      inputs[1]?.addEventListener('keyup', addBP as any);
    }
  }, 'once');

  const [, setAccepted] = getPopupPermission(popupRef, focusInput);

  setFormEffect({
    formDisplaySignal: formDisplay,
    editedNote,
    parentRef: sectionRef,
    setReadOnly,
  });
  setInputReadOnly({ parentRef: sectionRef, readOnlySignal: readOnly });

  // func

  function handleSubmbit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // @ts-ignore
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
        bodyValue: null,
        inputValue: null,
        key: null,
      });
      closeForm();
    }, 100);
  }

  function addBP(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.currentTarget.value = `${e.currentTarget.value.trimEnd()}\n\n${bp} `;
    }
  }

  function focusInput(e?: TransitionEvent<HTMLElement>) {
    e?.stopPropagation();
    if (formDisplay.value === false) return;
    inputs[0]?.focus();
  }

  return (
    <VStack
      className={
        'w-full h-full font-HantenGrotesk bg-white dark:bg-stone-700 absolute top-0 z-30 tr-1 translate-x-[100%]  opacity-0'
      }
      bind:ref={sectionRef}
      on:transitionend={focusInput}
    >
      <Popup ref={popupRef} setAccepted={setAccepted} />
      <VStack className={'h-full p-2 lg:px-12 '}>
        <HStack className={'w-full h-fit flex items-center justify-between '}>
          <Button
            on:click={() => {
              if (readOnly.value) {
                setEditedNote({
                  bodyValue: null,
                  inputValue: null,
                  key: null,
                });
                return closeForm();
              }
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
              className={'stroke-peach fill-none  '}
              path={chevronLeft}
              size={28}
              stroke:width={2.5}
            />
          </Button>
          <Paragragh className="text-peach text-[20px] font-bold ">
            Design
          </Paragragh>

          <Button
            className={'ml-auto edit-btn hidden'}
            on:click={() => {
              setReadOnly(false);
              inputs[0]?.focus();
            }}
          >
            <Icon
              className={'stroke-peach fill-none stroke-[3px] '}
              path={pencil}
              size={28}
              stroke:width={2.5}
            />
          </Button>
          <Button
            className={'ml-auto '}
            on:click={() => {
              sectionRef?.current?.querySelector('form')?.requestSubmit();
            }}
          >
            <Icon
              className={'stroke-peach fill-none stroke-[3px] '}
              path={check}
              size={28}
              stroke:width={2.5}
            />
          </Button>
        </HStack>
        <FormField
          on:submit={handleSubmbit}
          className={
            'w-full h-full flex flex-col text-darkBlue dark:text-slate-300 p-2 pb-10 space-y-2 '
          }
        >
          <TextField
            value={editedNote.inputValue}
            className={
              'w-full h-12 font-HantenGrotesk font-semibold dark:bg-inherit text-lg pl-2 focus:outline-none border-none selection:bg-peach '
            }
            style={{
              fontSize: sizes[0],
            }}
            readonly={readOnly}
            name={'title'}
            placeholder={'Title'}
          />
          <TextArea
            readonly={readOnly}
            value={editedNote.bodyValue as any}
            name="body"
            style={{ fontSize: sizes[1] }}
            placeholder={'Take a note...'}
            className={
              'w-full h-full font-HantenGrotesk text-[15px] dark:bg-inherit p-2 font-semibold focus:outline-none selection:bg-peach '
            }
          />
        </FormField>
      </VStack>
    </VStack>
  );
};

export default Form;
