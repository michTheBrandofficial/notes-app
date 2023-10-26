import { splice } from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import { refresh, trash as trashIcon } from '@utils/nixix-heroicon/outline';
import { setNotes } from 'store';
import { setTrashStore } from 'store/trash';
import { getStoreValue } from 'nixix/dom';
import { Article, Button, HStack, Paragragh, VStack } from 'view-components';
import { SetStoreDispatcher } from 'nixix/primitives';

type DeletedProps = TNote & {
  key: number;
};

const Deleted = ({ body, createdDate, title, key, time }: DeletedProps) => {
  function permanentDelete() {
    setTrashStore((prev) => {
      splice(prev as TTrash, key);
      return prev as TTrash;
    });
  }
  function restore() {
    (setNotes as unknown as SetStoreDispatcher<TTrash>)((prev) => {
      prev?.unshift({
        body: getStoreValue(body),
        createdDate: getStoreValue(createdDate),
        title: getStoreValue(title),
        time: getStoreValue(time),
        trashId: key,
      });
      return prev as TTrash;
    });
    permanentDelete();
  }

  return (
    <HStack
      tabindex={1}
      className="w-full h-fit flex items-start space-x-5 pl-2 pr-3 pt-2 pb-3 rounded-lg hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-[rgba(216,180,254,.6)] dark:focus:bg-[rgba(216,180,254,.6)] focus:outline-none  cursor-pointer "
    >
      <VStack className="w-fit h-full flex flex-col space-y-3 stroke-yellow-200 dark:stroke-peach ">
        <Button on:click={permanentDelete} className={'border-none '}>
          <Icon path={trashIcon} className={'stroke-inherit  fill-none'} />
        </Button>
        <Button on:click={restore} className={'border-none '}>
          <Icon path={refresh} className={'stroke-inherit  fill-none'} />
        </Button>
      </VStack>

      <Article className="flex-grow h-fit space-y-1 text-[#081b336b] dark:text-slate-300 ">
        <div className="flex w-full h-fit dark:text-slate-100 items-center justify-between">
          <h1
            className={
              'text-darkBlue dark:text-slate-100 text-[17px] font-medium line-clamp-1 '
            }
          >
            {title as any}
          </h1>
          <Paragragh className={'text-xs '}>{createdDate}</Paragragh>
        </div>
        <Paragragh
          className={'text-[14px] h-[21px] w-[90%] line-clamp-1 lg:text-base '}
        >
          {body as any}
        </Paragragh>
      </Article>
    </HStack>
  );
};

export default Deleted;
