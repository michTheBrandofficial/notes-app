import Icon from '@utils/nixix-heroicon';
import { plus } from '@utils/nixix-heroicon/outline';
import { useStorage } from '@utils/useStorage';
import { callReaction, callRef, callSignal } from 'nixix/primitives';
import { sidebar } from 'store';
import { ThemeButton, MenuButtons } from './buttons';

const Sidebar = () => {
  const [getTheme, setTheme] = useStorage<'light' | 'dark'>('theme');

  const [themeState, setThemeState] = callSignal<'light' | 'dark'>(
    getTheme() || 'light'
  );
  callReaction(() => {
    setTheme(themeState.value);
  }, [themeState]);
  const asdieRef = callRef<HTMLElement>();
  callReaction(() => {
    if (sidebar.$$__value.sidebar === 0) {
      asdieRef.current?.classList.replace('z-20', 'z-0');
    } else {
      asdieRef.current?.classList.replace('z-0', 'z-20');
    }
  }, [sidebar]);

  function switchTheme() {
    document.body.classList.toggle('dark');
    // if the classList contains dark, then dark mode is enabled.
    const darkTheme = document.body.classList.contains('dark');
    setThemeState(darkTheme ? 'dark' : 'light');
  }

  return (
    <aside
      className="w-[25%] min-w-[250px] max-w-[300px] h-full font-HantenGrotesk flex flex-col content-between items-center border-r px-6 py-10 tr-4 absolute z-0 bg-white dark:bg-darkBlue dark:border-none bsm:min-w-[270px] lg:static"
      style={{
        opacity: sidebar.sidebar,
      }}
      bind:ref={asdieRef}
    >
      {/* quick menu */}
      <MenuButtons />

      <section className="w-full h-fit flex justify-between items-center mt-auto">
        {/* add collection button */}
        <button className="p-3 w-fit ml-auto rounded-full shadow-lg theme-switcher tr-4">
          <Icon path={plus} size={30} className="stroke-inherit "></Icon>
        </button>
        {/* theme switcher button */}
        <ThemeButton onclick={switchTheme} themeState={themeState} />
      </section>
    </aside>
  );
};

export default Sidebar;
