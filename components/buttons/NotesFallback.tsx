import Icon from '@utils/nixix-heroicon';
import { pencilAlt } from '@utils/nixix-heroicon/outline';
import { createNewNote } from '@utils/functions';

type NotesFallbackProps = {};

const NotesFallback = (props: NotesFallbackProps) => {
  return (
    <button
      className={
        'mx-auto h-[120px] w-[120px] border-[2px]  border-dashed border-[#081b336b] rounded-[20px] self-center flex flex-col items-center justify-center gap-2  '
      }
      on:click={createNewNote}
    >
      <Icon path={pencilAlt} className={'stroke-[#0c2037e9] fill-none '} />
      <p>New Note</p>
    </button>
  );
};

export default NotesFallback;
