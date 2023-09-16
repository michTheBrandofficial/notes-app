import Icon from '@utils/nixix-heroicon';
import {
  calendar,
  check,
  inbox,
  moon,
  plus,
  star,
  sun,
  trash,
} from '@utils/nixix-heroicon/outline';
import { useStorage } from '@utils/useStorage';
import { Show } from 'nixix/hoc';
import { callReaction, callSignal } from 'nixix/primitives';
import { MouseEvent } from 'nixix/types/eventhandlers';

function ThemeIcon({ dark }: { dark?: boolean }) {
  if (dark) {
    return (
      <Icon path={moon} size={25} fill="none" className="stroke-inherit" />
    );
  }
  return <Icon path={sun} size={25} fill="none" className="stroke-inherit" />;
}

const Sidebar = () => {
  const menuButtons: ButtonArray = [
    { button: 'Inbox', path: inbox },
    { button: 'Today', path: star },
    { button: 'Upcoming', path: calendar },
    { button: 'Completed', path: check },
    { button: 'Trash', path: trash },
  ];

  function getMenuButtons() {
    return menuButtons.map((menuButton) => (
      <div className="btn h-fit w-full flex items-center space-x-2 text-lg cursor-pointer stroke-black dark:stroke-gray-200 dark:text-gray-200 ">
        <Icon
          path={menuButton.path}
          className="stroke-inherit fill-none "
        ></Icon>
        <p>{menuButton.button}</p>
      </div>
    ));
  }

  const [getTheme, setTheme] = useStorage<'light' | 'dark'>('theme');

  const [themeState, setThemeState] = callSignal<'light' | 'dark'>(
    getTheme() || 'light'
  );
  callReaction(() => {
    setTheme(themeState.value);
  }, [themeState]);

  function switchTheme(e: MouseEvent<HTMLButtonElement>) {
    document.body.classList.toggle('dark');
    // if the classList contains dark, then dark mode is enabled.
    const darkTheme = document.body.classList.contains('dark');
    setThemeState(darkTheme ? 'dark' : 'light');
  }

  return (
    <aside className=" w-[25%] min-w-[300px] max-w-[300px] h-full font-HantenGrotesk flex flex-col content-between items-center border-r px-6 py-10 tr-3 dark:bg-darkBlue dark:border-none ">
      {/* quick menu */}
      <section className="h-fit w-full text-gray-800 stroke-gray-800 space-y-6 dark:bg-darkBlue tr-3 ">
        {getMenuButtons()}
      </section>

      <section className="w-full h-fit flex justify-between items-center mt-auto">
        {/* add collection button */}
        <button className="p-3 w-fit ml-auto rounded-full shadow-lg theme-switcher ">
          <Icon path={plus} size={30} className="stroke-inherit "></Icon>
        </button>
        {/* theme switcher button */}
        <button
          className="p-0 w-fit ml-auto stroke-blue-500"
          on:click={switchTheme}
        >
          <Show
            when={() => themeState.value === 'light'}
            switch={themeState}
            fallback={<ThemeIcon dark />}
          >
            <ThemeIcon dark={false} />
          </Show>
        </button>
      </section>
    </aside>
  );
};

export default Sidebar;
