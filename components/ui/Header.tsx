import { ClassList } from '@/src/utils/classes';
import { createNewNote } from '@/src/utils/functions';
import { Component, bind } from 'nixix/dom';
import { SetSignalDispatcher, Signal, callRef } from 'nixix/primitives';
import { MouseEvent } from 'nixix/types/eventhandlers';
import { Button, HStack, Heading } from 'nixix/view-components';
import { MenuIcon } from '../buttons';
import SwipeGesture from './SwipeGesture';

type HeaderProps<T = boolean> = {
  sidebar: Signal<T>
  setSidebar: SetSignalDispatcher<T>
};

class Header extends Component {
  constructor(public props: HeaderProps) {
    super(props);
  }

  activeClass = 'filterActive';

  notActiveClass = 'filterNotActive';

  @bind filterActive({currentTarget}: MouseEvent<HTMLButtonElement>) {
    const sectionEl = currentTarget.parentElement;
    if (!sectionEl) return;
    const activeEl = sectionEl.querySelector<HTMLButtonElement>('.filterActive')
    ClassList.replace(activeEl, this.activeClass, this.notActiveClass);
    ClassList.replace(currentTarget, this.notActiveClass, this.activeClass);
  }

  filters = ['All', '1h', '2h', 'Work'] as const

  gestureRef = callRef<HTMLElement>()

  @bind Filters(): someView {
    return (
      <>
        {
          this.filters.map((filter, i) => (
            <Button
              on:click={this.filterActive}
              className={`${i === 0 ? 'filterActive' : 'filterNotActive'
                } cursor-pointer hidden text-[14px] lg:block `}
            >
              {filter}
            </Button>
          ))
        }
      </>
    )
  }

  @bind showSidebar() {
    this.props.setSidebar(true)
  }

  jsx(): someView {
    return (
      <SwipeGesture
        on:swipeleft={createNewNote}
        on:swiperight={this.showSidebar}
      >
        <header
          className="w-full h-fit flex items-center pr-4 justify-between lg:pr-12 "
          bind:ref={this.gestureRef}
        >
          <Heading className="text-[35px] ">Design</Heading>
          <HStack className="w-fit items-center stroke-peach fill-none dark:stroke-peach space-x-2  ">
            <HStack className={'w-fit lg:hidden relative '}>
              <MenuIcon on:click={this.showSidebar} />
            </HStack>
            <this.Filters />
          </HStack>
        </header>
      </SwipeGesture>
    )
  }
}

export default Header;
