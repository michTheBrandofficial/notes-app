import { showHome } from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import { chevronLeft, trash as trashIcon } from '@utils/nixix-heroicon/outline';
import { displayRefs } from '@utils/refs';
import { For } from 'nixix/hoc';
import { callEffect, callSignal } from 'nixix/primitives';
import { setTrashStore, trashStore } from 'store/trash';
import { TrashButton } from './buttons';
import Deleted from './display/Deleted';
import TrashFallback from './display/TrashFallback';
import { Button, HStack, Paragrapgh, VStack } from 'view-components';

const Trash = (): someView => {
  const [disabled, setDisabled] = callSignal<boolean>(false, { equals: true });
  callEffect(() => {
    setDisabled(!Boolean(trashStore.$$__value.length));
  }, [trashStore]);

  return (
    <VStack
      className={
        'w-full h-full flex flex-col font-HantenGrotesk bg-white tr-1 absolute top-0 z-30 md:w-[calc(100vw-300px)] translate-x-[100%] opacity-0 md:right-0 '
      }
      bind:ref={displayRefs.trashRef}
    >
      <VStack className="w-full h-fit mb-auto bg-white space-y-2 flex flex-col pb-4 border-b pl-4 pr-2 py-4 md:pl-2 lg:px-12   lg:pb-8 lg:space-y-6 ">
        <HStack
          className={'w-full h-fit flex justify-normal space-x-5 items-center '}
        >
          <Button
            on:click={showHome}
            className="w-fit h-fit border-none lg:hidden "
          >
            <Icon
              className="stroke-blue-300 fill-none"
              path={chevronLeft}
              stroke:width={2.4}
            ></Icon>
          </Button>
          <h1 className=" text-[32px] ">Trash</h1>
        </HStack>
        <HStack className="flex justify-between items-start w-full px-3 h-fit lg:justify-normal ">
          <VStack className={'w-fit h-fit pr-3'}>
            <Icon
              path={trashIcon}
              className={'stroke-blue-300 fill-none'}
              size={24}
            />
          </VStack>
          <VStack className="space-y-4 w-full h-fit">
            <Paragrapgh
              className={'text-[#081b336b] text-[15px] lg:text-[17px] '}
            >
              Items that have been in Trash more than 30 days will be
              automatically deleted.
            </Paragrapgh>
            <TrashButton on:click={() => setTrashStore([])} disabled={disabled}>
              Empty trash now
            </TrashButton>
          </VStack>
        </HStack>
      </VStack>
      <VStack
        className={
          'w-full flex-grow bg-white space-y-2 px-4 py-4 md:pl-2 lg:px-12 lg:space-y-6 '
        }
      >
        <For each={trashStore} fallback={<TrashFallback />}>
          {(item: typeof trashStore, i: number) => {
            return <Deleted {...item[i]} key={i} />;
          }}
        </For>
      </VStack>
    </VStack>
  );
};

export default Trash;
