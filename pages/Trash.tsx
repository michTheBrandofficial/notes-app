import SwipeGesture from '@/components/SwipeGesture';
import { TrashButton } from '@/components/buttons';
import { Deleted, TrashFallback } from '@/components/display';
import { setTrashStore, trashStore } from '@/src/store/trash';
import { showHome } from '@/src/utils/functions';
import Icon from '@/src/utils/nixix-heroicon';
import { chevronLeft, trash as trashIcon } from '@/src/utils/nixix-heroicon/outline';
import { displayRefs } from '@/src/utils/refs';
import { For } from 'nixix/hoc';
import { reaction, signal } from 'nixix/primitives';
import { Button, HStack, Paragragh, VStack } from 'nixix/view-components';

const Trash = async (): Promise<someView> => {
  const [disabled, setDisabled] = signal<boolean>(false);
  reaction(() => {
    setDisabled(!Boolean(trashStore.length));
  }, [trashStore]);
  function goHome() {
    showHome(displayRefs.trashRef, {
      classes: ['opacity-0', 'translate-x-[100%]'],
    });
  }

  return (
    <SwipeGesture on:swiperight={goHome}>
      <VStack
        className={
          'w-full h-full flex flex-col font-HantenGrotesk bg-white dark:bg-peach tr-1 absolute top-0 z-30 md:w-[calc(100vw-300px)] translate-x-[100%] opacity-0 md:right-0 '
        }
        bind:ref={displayRefs.trashRef}
      >
        <VStack className="w-full h-fit mb-auto bg-inherit space-y-2 flex flex-col pb-4 border-b pl-4 pr-2 py-4 stroke-peach dark:stroke-stone-900 md:pl-2 lg:px-12 lg:pb-8 lg:space-y-6 ">
          <HStack
            className={
              'w-full h-fit flex justify-normal space-x-5 items-center '
            }
          >
            <Button
              on:click={goHome}
              className="w-fit h-fit border-none lg:hidden "
            >
              <Icon
                className="stroke-inherit fill-none"
                path={chevronLeft}
                stroke-width={2.4}
              ></Icon>
            </Button>
            <h1 className=" text-[32px] ">Trash</h1>
          </HStack>
          <HStack className="flex justify-between items-start w-full px-3 h-fit lg:justify-normal ">
            <VStack className={'w-fit h-fit pr-3'}>
              <Icon
                path={trashIcon}
                className={'stroke-inherit fill-none'}
                size={24}
              />
            </VStack>
            <VStack className="space-y-4 w-full h-fit">
              <Paragragh
                className={'text-[#081b336b] text-[15px] lg:text-[17px] '}
              >
                Items that have been in Trash more than 30 days will be
                automatically deleted.
              </Paragragh>
              <TrashButton
                on:click={() => setTrashStore([])}
                disabled={disabled}
              >
                Empty trash now
              </TrashButton>
            </VStack>
          </HStack>
        </VStack>
        <VStack
          className={
            'w-full flex-grow bg-white dark:bg-stone-700 space-y-2 px-4 py-4 md:pl-2 lg:px-12 lg:space-y-6 no-scroll overflow-y-scroll '
          }
        >
          <For each={trashStore} fallback={<TrashFallback />}>
            {(item, i) => {
              // @ts-ignore
              return <Deleted {...item[i]} key={i} />;
            }}
          </For>
        </VStack>
      </VStack>
    </SwipeGesture>
  );
};

export default Trash;
