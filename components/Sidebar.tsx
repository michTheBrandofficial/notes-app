import { ClassList } from '@utils/classes';
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
import { MenuButtons, ThemeButton } from './buttons';
import SwipeGesture from './SwipeGesture';

type SidebarProps<T = boolean> = {
  sidebar: SignalObject<T>;
  setSidebar: SetSignalDispatcher<T>;
};

const Sidebar = ({ sidebar, setSidebar }: SidebarProps) => {
  const asideRef = callRef<HTMLElement>();
  callReaction(() => {
    if (sidebar.value) {
      ClassList.remove(asideRef.current, 'translate-x-[-100%]');
    } else ClassList.add(asideRef.current, 'translate-x-[-100%]');
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
    <SwipeGesture gestureRef={asideRef} on:swipeleft={() => setSidebar(false)}>
      <aside
        className=" h-screen font-HantenGrotesk absolute top-0 z-20 bg-transparent translate-x-[-100%] w-full transition-transform duration-[900ms] ease-in-out md:max-w-[300px] md:translate-x-0 "
        on:click={(e) => {
          setSidebar(false);
        }}
        bind:ref={asideRef}
      >
        <section
          on:click={(e) => e.stopPropagation()}
          className={
            'w-[25%] min-w-[250px] max-w-[300px] h-screen flex flex-grow flex-col content-between items-center border-r px-6 pt-8 pb-10 bg-white dark:bg-darkBlue dark:border-none bsm:min-w-[270px] md:w-[100%] md:pt-10 md:ml-0 '
          }
        >
          {/* quick menu */}
          <section className="w-full h-fit flex justify-between items-start">
            <MenuButtons {...{ setSidebar }} />
            <button
              className="w-fit-h-fit border-none md:hidden x-icon "
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
        </section>
      </aside>
    </SwipeGesture>
  );
};

export default Sidebar;
