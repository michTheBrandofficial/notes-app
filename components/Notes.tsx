import { notes, selectedNotes, setSelectedNotes } from '@/src/store';
import { selectOp, setSelectOp } from '@/src/store/display';
import { ClassList } from '@/src/utils/classes';
import { createNewNote, deselectNotes } from '@/src/utils/functions';
import Icon from '@/src/utils/nixix-heroicon';
import { x } from '@/src/utils/nixix-heroicon/outline';
import { notesRef } from '@/src/utils/refs';
import { For } from 'nixix/hoc';
import { SetSignalDispatcher, callEffect, callRef } from 'nixix/primitives';
import { HStack, VStack } from 'nixix/view-components';
import SwipeGesture from './SwipeGesture';
import { NotesFallback } from './buttons';
import { Note } from './display';

const Notes = ({
  setSidebar,
}: {
  setSidebar: SetSignalDispatcher<boolean>;
}) => {
  callEffect(() => {
    if (notes.$$__value.length === 0) {
      ClassList.add(notesRef.current, 'pr-4', 'lg:pr-12');
      ClassList.replace(notesRef.current, 'h-fit', 'h-full');
      ClassList.remove(gestureRef.current, 'swipe-area');
    } else {
      ClassList.replace(notesRef.current, 'h-full', 'h-fit');
      ClassList.add(gestureRef.current, 'swipe-area');
    }
  }, [notes]);

  function deselect() {
    setSelectedNotes(() => {
      deselectNotes(selectedNotes.$$__value);
      setSelectOp('0');
      return [];
    });
  }
  const gestureRef = callRef<HTMLElement>();

  return (
    <VStack className={'w-full h-full flex flex-col content-between '}>
      <HStack className="items-center justify-between w-full pr-4 h-fit lg:pr-12">
        <h1
          className={
            'text-lg w-fit mt-2 relative after:w-3/4 after:mt-1 after:h-[3px] after:bg-blue-300 after:rounded-full after:absolute after:right-0 after:block dark:after:bg-peach '
          }
        >
          Notes
        </h1>
        <Icon
          path={x}
          className={'stroke-peach tr-3 fill-none '}
          on:click={deselect}
          style={{
            opacity: selectOp,
          }}
        />
      </HStack>
      <HStack
        className={'w-full h-fit mt-8 gap-3 overflow-x-scroll no-scroll  '}
        style={{
          userSelect: 'none',
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
        }}
        bind:ref={notesRef}
      >
        <For each={notes} fallback={<NotesFallback />}>
          {(item: typeof notes, i: number) => {
            const note = item[i];
            return <Note {...note} createdDate={note.createdDate} key={i} />;
          }}
        </For>
      </HStack>
      <SwipeGesture
        on:swipeleft={() => createNewNote()}
        on:swiperight={() => setSidebar(true)}
      >
        <VStack
          className="swipe-area w-full flex-grow "
          bind:ref={gestureRef}
        ></VStack>
      </SwipeGesture>
    </VStack>
  );
};

export default Notes;
