import { setSidebar, sidebar } from '@/src/store/display';
import Icon from '@/src/utils//nixix-heroicon';
import { plus, x } from '@/src/utils//nixix-heroicon/outline';
import { Component, bind } from 'nixix/dom';
import {
  MemoSignal,
  concat,
  memo
} from 'nixix/primitives';
import { Aside, Button, HStack, VStack } from 'nixix/view-components';
import { MenuButtons } from '../buttons';
import SwipeGesture from './SwipeGesture';

class Sidebar extends Component {
  translateMemo!: MemoSignal<Sidebar['translateClass'] | ''>

  constructor() {
    super()
    this.translateMemo = memo(() => {
      return sidebar.value ? '' : this.translateClass
    }, [sidebar])
  }

  translateClass = 'translate-x-[-100%]' as const

  @bind hideSidebar() {
    setSidebar(false)
  }

  jsx(): someView {
    return (
      <SwipeGesture on:swipeleft={this.hideSidebar}>
        <Aside
          className={concat`h-screen font-HantenGrotesk absolute top-0 z-20 bg-transparent w-full transition-transform duration-[900ms] ease-in-out ${this.translateMemo} md:max-w-[300px] md:translate-x-0 `}
          on:click={this.hideSidebar}
        >
          <VStack
            on:click_stopPropagation={() => null}
            className={
              'w-[25%] min-w-[250px] max-w-[300px] h-screen flex flex-grow flex-col content-between items-center border-r px-6 pt-8 pb-10 bg-white dark:bg-stone-700 dark:border-none bsm:min-w-[270px] md:w-[100%] md:pt-10 md:ml-0 '
            }
          >
            {/* quick menu */}
            <HStack className="w-full h-fit justify-between items-start">
              <MenuButtons setSidebar={setSidebar} />
              <Button
                className="w-fit h-fit border-none md:hidden bg-black/10 backdrop-blur-2xl p-2 rounded-full "
                on:click={this.hideSidebar}
              >
                
                <Icon
                  className="stroke-peach fill-none "
                  size={28}
                  path={x}
                />
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
      </SwipeGesture>)
  }
};

export default Sidebar;
