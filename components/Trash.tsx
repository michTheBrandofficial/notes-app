import Icon from '@utils/nixix-heroicon';
import { trash as trashIcon } from '@utils/nixix-heroicon/outline';
import { TrashButton } from './buttons';
import { For } from 'nixix/hoc';
import { trashStore } from 'store/trash';
import Deleted from './display/Deleted';
import { displayRefs } from '@utils/refs';

/**
 * @todo remove trash, home screen button empty all trash
 */
const Trash = () => {
  return (
    <section
      className={
        'w-full h-full flex flex-col font-HantenGrotesk bg-white tr-d-3 no-trash absolute top-0 md:w-[calc(100vw-300px)] md:right-0 '
      }
      bind:ref={displayRefs.trashRef}
    >
      <section className="w-full h-fit mb-auto bg-white space-y-2 flex flex-col pb-4 border-b pl-4 pr-2 py-4 md:pl-2 lg:px-12 lg:pb-8 lg:space-y-6 ">
        <h1 className=" text-[35px] ">Trash</h1>
        <section className="flex justify-between items-start w-full px-3 h-fit lg:justify-normal ">
          <div className={'w-fit h-fit pr-3'}>
            <Icon
              path={trashIcon}
              className={'stroke-blue-300 fill-none'}
              size={24}
            />
          </div>
          <section className="space-y-4 w-full h-fit">
            <p className={'text-[#081b336b] text-[15px] lg:text-[17px] '}>
              Items that have been in Trash more than 30 days will be
              automatically deleted.
            </p>
            <TrashButton on:click={() => ''}>Empty trash now</TrashButton>
          </section>
        </section>
      </section>
      <section
        className={
          'w-full flex-grow bg-white space-y-2 px-4 py-4 md:pl-2 lg:px-12 lg:space-y-6 '
        }
      >
        <For each={trashStore}>
          {(item: typeof trashStore, i: number) => {
            return <Deleted {...item[i]} />;
          }}
        </For>
      </section>
    </section>
  );
};

export default Trash;
