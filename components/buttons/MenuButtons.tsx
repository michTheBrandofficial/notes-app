import { showHome, showSettings, showTrash } from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import {
  calendar,
  check,
  cog,
  home,
  trash,
} from '@utils/nixix-heroicon/outline';
import { SetSignalDispatcher } from 'nixix/primitives';

type MenuButtonsProps = {
  setSidebar: SetSignalDispatcher<boolean>;
};

const MenuButtons = ({ setSidebar }: MenuButtonsProps) => {
  const menuButtons: ButtonArray = [
    { button: 'Home', path: home, onclick: showHome },
    { button: 'Upcoming', path: calendar },
    { button: 'Completed', path: check },
    { button: 'Trash', path: trash, onclick: showTrash },
    { button: 'Settings', path: cog, onclick: showSettings },
  ];

  return (
    <section className="h-fit w-full text-gray-800 stroke-gray-800 space-y-6 ">
      {menuButtons.map((menuButton) => (
        <button
          className={`btn h-fit border-none w-full flex items-center space-x-2 text-lg cursor-pointer stroke-black dark:stroke-gray-200 dark:text-gray-200 ${
            menuButton.button === 'Home' ? 'hidden lg:flex ' : ''
          } `}
          on:click={
            menuButton.onclick
              ? (e) => {
                  setSidebar(false);
                  menuButton.onclick?.(e);
                }
              : () => undefined
          }
        >
          <Icon
            path={menuButton.path}
            className="stroke-inherit fill-none "
          ></Icon>
          <p>{menuButton.button}</p>
        </button>
      ))}
    </section>
  );
};

export default MenuButtons;
