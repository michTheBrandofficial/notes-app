import { callStore } from 'nixix/primitives';
import Header from './Header';
import { useStorage } from '@utils/useStorage';
import { For } from 'nixix/hoc';

const Body = () => {
  const [getNotes] = useStorage<'notes', [string, string][]>('notes');
  const [notes, setNotes] = callStore<[string, string][]>(
    getNotes() || [['name', 'name']]
  );
  console.log(notes);
  return (
    <section className="flex-1 w-[75%] h-full flex flex-col px-12 py-5 font-HantenGrotesk bg-white tr-3 dark:bg-darkBlue ">
      <Header />
      <For each={notes}>
        {(e: typeof notes, i: number) => {
          return (
            <section className={'dark:text-gray-300'}>
              <h1> {e[i][0]} </h1>
              <p> {e[i][1]} </p>
            </section>
          );
        }}
      </For>
    </section>
  );
};

export default Body;
