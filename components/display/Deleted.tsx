import { splice } from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import { refresh, trash as trashIcon } from '@utils/nixix-heroicon/outline';
import { setNotes } from 'store';
import { setTrashStore } from 'store/trash';
import { getStoreValue } from 'nixix/dom';

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
    setNotes((prev) => {
      prev?.unshift({
        body: getStoreValue(body),
        createdDate: getStoreValue(createdDate),
        title: getStoreValue(title),
        time: getStoreValue(time),
      });
      return prev as TNotes;
    });
    permanentDelete();
  }

  return (
    <section className="w-full h-fit flex items-start space-x-5 pl-2 pr-3 pt-2 pb-3 rounded-lg hover:bg-slate-100 cursor-pointer ">
      <section className="w-fit h-full flex flex-col space-y-3">
        <button on:click={permanentDelete} className={'border-none '}>
          <Icon path={trashIcon} className={'stroke-yellow-200  fill-none'} />
        </button>
        <button on:click={restore} className={'border-none '}>
          <Icon path={refresh} className={'stroke-yellow-200  fill-none'} />
        </button>
      </section>

      <article className="flex-grow h-fit space-y-1 ">
        <div className="flex w-full h-fit text-darkBlue items-center justify-between">
          <h1 className={'text-[17px] font-medium line-clamp-1 '}>{title}</h1>
          <p className={'text-[#081b336b] text-xs '}>{createdDate}</p>
        </div>
        <p
          className={
            'text-[#081b336b] text-[14px] h-[21px] w-[90%] line-clamp-1 lg:text-base '
          }
        >
          {body}
        </p>
      </article>
    </section>
  );
};

export default Deleted;
