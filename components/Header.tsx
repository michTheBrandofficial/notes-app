import { MouseEvent } from 'nixix/types/eventhandlers';
import { MenuIcon } from './buttons';

const Header = () => {
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
    <header className="w-full h-fit flex items-center pr-4 justify-between lg:pr-12 ">
      <h1 className=" text-[35px] ">Design</h1>
      {/* filters */}
      <section className="w-fit flex items-center stroke-blue-300 fill-none dark:stroke-blue-500 space-x-2  ">
        <div className={'w-fit flex lg:hidden relative '}>
          <MenuIcon close />
          <MenuIcon close={false} />
        </div>
        {getFilters()}
      </section>
    </header>
  );
};

export default Header;