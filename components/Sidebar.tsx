import { ClassList } from '@utils/classes';
import Icon from '@utils/nixix-heroicon';
import { plus, x } from '@utils/nixix-heroicon/outline';
import {
  SetSignalDispatcher,
  SignalObject,
  callReaction,
  callRef,
} from 'nixix/primitives';
import { Aside, Button, HStack, VStack } from 'view-components';
import SwipeGesture from './SwipeGesture';
import { MenuButtons } from './buttons';

type SidebarProps<T = boolean> = {
  sidebar: SignalObject<T>;
  setSidebar: SetSignalDispatcher<T>;
};

const Sidebar = ({ sidebar, setSidebar }: SidebarProps): someView => {
  const asideRef = callRef<HTMLElement>();
  callReaction(() => {
    if (sidebar.value) {
      ClassList.remove(asideRef.current, 'translate-x-[-100%]');
    } else ClassList.add(asideRef.current, 'translate-x-[-100%]');
  }, [sidebar]);

  return (
    <SwipeGesture on:swipeleft={() => setSidebar(false)}>
      <Aside
        className=" h-screen font-HantenGrotesk absolute top-0 z-20 bg-transparent translate-x-[-100%] w-full transition-transform duration-[900ms] ease-in-out md:max-w-[300px] md:translate-x-0 "
        on:click={(e) => {
          setSidebar(false);
        }}
        bind:ref={asideRef}
      >
        <VStack
          on:click={(e) => e.stopPropagation()}
          className={
            'w-[25%] min-w-[250px] max-w-[300px] h-screen flex flex-grow flex-col content-between items-center border-r px-6 pt-8 pb-10 bg-white dark:bg-stone-700 dark:border-none bsm:min-w-[270px] md:w-[100%] md:pt-10 md:ml-0 '
          }
        >
          {/* quick menu */}
          <HStack className="w-full h-fit justify-between items-start">
            <MenuButtons {...{ setSidebar }} />
            <Button
              className="w-fit-h-fit border-none md:hidden  x-icon "
              on:click={() => setSidebar(false)}
            >
              <Icon
                className="stroke-peach fill-none "
                size={28}
                path={x}
              ></Icon>
            </Button>
          </HStack>

          <HStack className="w-full h-fit justify-between items-center mt-auto">
            {/* add collection button */}
            <Button className="p-3 w-fit m-auto rounded-full shadow-lg collections tr-4">
              <Icon path={plus} size={30} className="stroke-inherit "></Icon>
            </Button>
          </HStack>
        </VStack>
      </Aside>
    </SwipeGesture>
  );
};

export default Sidebar;
