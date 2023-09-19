import Icon from '@utils/nixix-heroicon';
import { clock } from '@utils/nixix-heroicon/outline';

type NoteProps = TNote & {
  key: number;
  createdDate?: string;
};

// pink, lime, blue. shade 200
const colors = [
  'bg-pink-200 dark:bg-pink-500',
  'bg-lime-200 dark:bg-lime-500',
  'bg-blue-300 dark:bg-blue-500',
];
const Note = ({ title, time, body, key, createdDate }: NoteProps) => {
  const color = colors[key % colors.length];

  return (
    <article
      className={`w-[250px] min-w-[250px] h-[300px] flex flex-col py-6 px-5 ${color} rounded-[20px] py-6 text-[15px] text-[#081b336b] last:mr-4 lg:last:mr-12  `}
    >
      <div
        className={
          'w-full relative text-darkBlue after:w-4/5 after:mt-3 after:h-[2px] after:bg-[#081b336b] after:absolute after:right-0 after:rounded-full after:block '
        }
      >
        <h1 className={'text-[#081b336b] text-xs '}>{createdDate}</h1>
        <h1 className={'w-full line-clamp-1 mt-1 text-[19px]'}>{title}</h1>
      </div>

      <div className={'mt-8'}>
        <p>{body}</p>
      </div>

      <div className={'mt-auto w-full h-fit flex items-center gap-2 '}>
        <Icon
          path={clock}
          className={'stroke-[#081b336b] fill-none '}
          size={20}
        />
        <p>{time}</p>
      </div>
    </article>
  );
};

export default Note;
