import { MouseEvent } from 'nixix/types/eventhandlers';

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
        } cursor-pointer text-[14px]`}
      >
        {filter}
      </button>
    ));
  }

  return (
    <header className="w-full h-fit flex items-center justify-between text-gray-800 dark:text-gray-300">
      <h1 className="text-inherit text-[35px] ">Design</h1>
      {/* filters */}
      <section className="w-fit flex items-center space-x-2">
        {getFilters()}
      </section>
    </header>
  );
};

export default Header;
