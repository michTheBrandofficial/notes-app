import Icon from '@utils/nixix-heroicon';
import { plus, x } from '@utils/nixix-heroicon/outline';
import { useStorage } from '@utils/useStorage';
import {
  SetSignalDispatcher,
  SignalObject,
  callReaction,
  callRef,
  callSignal,
} from 'nixix/primitives';
import { ThemeButton, MenuButtons } from './buttons';
import { displayRefs } from '@utils/refs';
import { ClassList } from '@utils/classes';

type SidebarProps<T = boolean> = {
  sidebar: SignalObject<T>;
  setSidebar: SetSignalDispatcher<T>;
};

const Sidebar = ({ sidebar, setSidebar }: SidebarProps) => {
  const asideRef = callRef<HTMLElement>();
  callReaction(() => {
    if (sidebar.value) ClassList.add(asideRef.current, 'right');
    else ClassList.remove(asideRef.current, 'right');
  }, [sidebar]);
  const [getTheme, setTheme] = useStorage<'light' | 'dark'>('theme');
  const [themeState, setThemeState] = callSignal<'light' | 'dark'>(
    getTheme() || 'light'
  );
  callReaction(() => {
    setTheme(themeState.value);
  }, [themeState]);
  function switchTheme() {
    document.body.classList.toggle('dark');
    // if the classList contains dark, then dark mode is enabled.
    const darkTheme = document.body.classList.contains('dark');
    setThemeState(darkTheme ? 'dark' : 'light');
  }

  return (
    <aside
      className="w-[25%] min-w-[250px] max-w-[300px] h-screen font-HantenGrotesk flex-col content-between items-center border-r px-6 pt-8 pb-10 absolute top-0 z-20 bg-white dark:bg-darkBlue dark:border-none left-side flex transition-[margin] duration-[900ms] ease-in-out bsm:min-w-[270px] md:ml-0 md:pt-10 "
      bind:ref={asideRef}
    >
      {/* quick menu */}
      <section className="w-full h-fit flex justify-between items-start">
        <MenuButtons />
        <button
          className="w-fit-h-fit border-none md:hidden "
          on:click={() => setSidebar(false)}
        >
          <Icon
            className="stroke-blue-300 fill-none "
            size={28}
            path={x}
          ></Icon>
        </button>
      </section>

      <section className="w-full h-fit flex justify-between items-center mt-auto">
        {/* add collection button */}
        <button className="p-3 w-fit ml-auto rounded-full shadow-lg collections tr-4">
          <Icon path={plus} size={30} className="stroke-inherit "></Icon>
        </button>
        {/* theme switcher button */}
        <ThemeButton onclick={switchTheme} themeState={themeState} />
      </section>
    </aside>
  );
};

export default Sidebar;
