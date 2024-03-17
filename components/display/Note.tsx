import ClickAndHold from '@/src/utils/clickandhold';
import { createNewNote } from '@/src/utils/functions';
import Icon from '@/src/utils/nixix-heroicon';
import { clock } from '@/src/utils/nixix-heroicon/outline';
import { callRef, effect } from 'nixix/primitives';
import { type MouseEvent } from 'nixix/types/eventhandlers';
import { Article, Paragragh, TextArea, VStack } from 'nixix/view-components';
import { selectedNotes, setEditedNote, setSelectedNotes } from '~/store';
import { selectOp, setSelectOp } from '~/store/display';

type NoteProps = TNote & {
  key: number;
  createdDate?: string;
};

const colors = [
  'bg-pink-200 dark:bg-pink-500',
  'bg-lime-200 dark:bg-lime-500',
  'bg-blue-300 dark:bg-blue-500',
];
const openForm = createNewNote;
const Note = ({ title, time, body, key, createdDate }: NoteProps) => {
  const color = colors[key % colors.length];
  function handleClick(e: MouseEvent<HTMLElement>) {
    if (Boolean(selectedNotes.length)) {
      return selectNote();
    }
    setEditedNote({
      inputValue: title,
      bodyValue: body,
      key
    });
    openForm();
  }
  const articleRef = callRef<HTMLElement>();
  function selectNote() {
    const article = articleRef?.current;
    article?.parentElement?.classList.add('selected');
    if (selectOp.value === '0') {
      setSelectOp('1');
    }
    setSelectedNotes((prev) => {
      prev = [...(prev as any), key];
      return prev as number[];
    });
  }

  effect(() => {
    const clickandhold = new ClickAndHold(selectNote, 700, handleClick);
    clickandhold.apply(articleRef.current!);
  });

  return (
    <VStack
      tabindex={1}
      on:keyup={(e) => {
        if (e.key === 'Enter')
          articleRef.current?.dispatchEvent(new MouseEvent('click'));
      }}
      className={
        'w-[250px] min-w-[250px] h-[300px] relative rounded-[20px] after:transition-all after:duration-700 last:mr-3 '
      }
    >
      <Article
        bind:ref={articleRef}
        className={`h-full w-full min-w-full cursor-pointer flex flex-col py-6 px-5 ${color} rounded-[20px] py-6 text-[15px] text-[#081b336b] last:mr-4 lg:last:mr-12  `}
      >
        <VStack
          className={
            'w-full relative text-darkBlue after:w-4/5 after:mt-3 after:h-[2px] after:bg-[#081b336b] after:absolute after:right-0 after:rounded-full after:block '
          }
        >
          <h1 className={'text-[#081b336b] text-xs '}>{createdDate}</h1>
          <h1 className={'w-full line-clamp-1 mt-1 text-[19px]'}>
            {title as any}
          </h1>
        </VStack>

        <VStack
          className={
            'mt-8 flex-grow w-full flex flex-col relative overlay after:bg-transparent after:select-none '
          }
        >
          <TextArea
            name={'body'}
            className={
              'line-clamp-6 flex-grow w-full cursor-pointer bg-inherit focus:outline-none '
            }
            readonly
          >
            {body as any}
          </TextArea>
        </VStack>

        <VStack className={'w-full h-fit mt-2 flex items-center gap-2 '}>
          <Icon
            path={clock}
            className={'stroke-[#081b336b] fill-none '}
            size={20}
          />
          <Paragragh>{time}</Paragragh>
        </VStack>
      </Article>
    </VStack>
  );
};

export default Note;
