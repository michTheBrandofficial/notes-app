import { For } from 'nixix/hoc';
import { effect } from 'nixix/primitives';
import { Note } from './display';
import { notesRef } from '@utils/refs';
import { NotesFallback } from './buttons';
import { notes, selectOp, setSelectOp } from 'store';
import Icon from '@utils/nixix-heroicon';
import { x } from '@utils/nixix-heroicon/outline';
import { deselectNotes } from '@utils/functions';
import { selectedNotes, setSelectedNotes } from 'store';

const Notes = () => {
  effect(() => {
    if (notes.$$__value.length === 0) {
      notesRef.current?.classList.add('pr-4', 'lg:pr-12');
    }
  });

  function deselect() {
    setSelectedNotes(() => {
      deselectNotes(selectedNotes.$$__value);
      setSelectOp('0');
      return [];
    });
  }

  return (
    <section className={'w-full h-full flex flex-col content-between '}>
      <section className="flex items-center justify-between w-full pr-4 h-fit lg:pr-12">
        <h1
          className={
            'text-lg w-fit mt-2 relative after:w-3/4 after:mt-1 after:h-[3px] after:bg-blue-300 after:rounded-full after:absolute after:right-0 after:block dark:after:bg-yellow-300 '
          }
        >
          Notes
        </h1>
        <Icon
          path={x}
          className={'stroke-blue-400 tr-3 fill-none '}
          on:click={deselect}
          style={{
            opacity: selectOp,
          }}
        />
      </section>
      <section
        className={'w-full h-full flex mt-8 gap-3 overflow-x-scroll no-scroll '}
        bind:ref={notesRef}
      >
        <For each={notes} fallback={<NotesFallback />}>
          {(item: typeof notes, i: number) => {
            const note = item[i];
            return <Note {...note} createdDate={note.createdDate} key={i} />;
          }}
        </For>
      </section>
    </section>
  );
};

export default Notes;
