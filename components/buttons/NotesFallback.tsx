import { createNewNote } from '@/src/utils/functions';
import Icon from '@/src/utils/nixix-heroicon';
import { pencilAlt } from '@/src/utils/nixix-heroicon/outline';

const NotesFallback = () => {
  return (
    <button
      className={
        'mx-auto h-[120px] w-[120px] border-[2px] border-solid border-[#081b336b] rounded-[28px] self-center flex flex-col items-center justify-center gap-2 lg:w-[190px] lg:h-[190px] lg:border-[3px] lg:text-[20px] lg:rounded-[40px] '
      }
      on:click={createNewNote}
    >
      <Icon
        path={pencilAlt}
        stroke-width={2.3}
        className={'stroke-[#0c2037e9] fill-none lg:h-[35px] lg:w-[35px] '}
      />
      <p>New Note</p>
    </button>
  );
};

export default NotesFallback;
