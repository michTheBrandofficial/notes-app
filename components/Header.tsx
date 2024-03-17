import { createNewNote } from '@/src/utils/functions';
import { SetSignalDispatcher, SignalObject, callRef } from 'nixix/primitives';
import { MouseEvent } from 'nixix/types/eventhandlers';
import SwipeGesture from './SwipeGesture';
import { MenuIcon } from './buttons';

type HeaderProps<T = boolean> = {
  toggleMenu: [SignalObject<T>, SetSignalDispatcher<T>];
};

const Header = ({ toggleMenu }: HeaderProps) => {
  const [sidebar, setSidebar] = toggleMenu;
  const gestureRef = callRef<HTMLElement>();
  const filters = ['All', '1h', '2h', 'Work'];
  function filterActive(e: MouseEvent<HTMLButtonElement>) {
    const sectionEl = e.currentTarget.parentElement;
    if (!sectionEl) return;
    sectionEl
      .querySelector('.filterActive')
      ?.classList.replace('filterActive', 'filterNotActive');
    e.currentTarget.classList.replace('filterNotActive', 'filterActive');
  }

  function getFilters() {
    return filters.map((filter, i) => (
      <button
        on:click={filterActive}
        className={`${
          i === 0 ? 'filterActive' : 'filterNotActive'
        } cursor-pointer hidden text-[14px] lg:block `}
      >
        {filter}
      </button>
    ));
  }

  return (
    <SwipeGesture
      on:swipeleft={() => createNewNote()}
      on:swiperight={() => setSidebar(true)}
    >
      <header
        className="w-full h-fit flex items-center pr-4 justify-between lg:pr-12 "
        bind:ref={gestureRef}
      >
        <h1 className=" text-[35px] ">Design</h1>
        {/* filters */}
        <section className="w-fit flex items-center stroke-peach fill-none dark:stroke-peach space-x-2  ">
          <div className={'w-fit flex lg:hidden relative '}>
            <MenuIcon on:click={() => setSidebar(true)} sidebar={sidebar} />
          </div>
          {getFilters()}
        </section>
      </header>
    </SwipeGesture>
  );
};

export default Header;
