import { For } from 'nixix/hoc';
import { effect } from 'nixix/primitives';
import { Note } from './display';
import { notesRef } from '@utils/refs';
import { NotesFallback } from './buttons';
import { notes } from 'store';

const Notes = () => {
  effect(() => {
    if (notes.$$__value.length === 0) {
      notesRef.current?.classList.add('pr-4', 'lg:pr-12');
    }
  });

  return (
    <section className={'w-full h-full flex flex-col content-between '}>
      <h1
        className={
          'text-lg w-fit mt-2 relative after:w-3/4 after:mt-1 after:h-[3px] after:bg-blue-300 after:rounded-full after:absolute after:right-0 after:block dark:after:bg-yellow-300 '
        }
      >
        Notes
      </h1>
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
