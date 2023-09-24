import { showTrash } from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import { calendar, check, trash } from '@utils/nixix-heroicon/outline';

const MenuButtons = () => {
  const menuButtons: ButtonArray = [
    { button: 'Upcoming', path: calendar },
    { button: 'Completed', path: check },
    { button: 'Trash', path: trash, onclick: showTrash },
  ];

  return (
    <section className="h-fit w-full text-gray-800 stroke-gray-800 space-y-6 ">
      {menuButtons.map((menuButton) => (
        <button
          className="btn h-fit border-none w-full flex items-center space-x-2 text-lg cursor-pointer stroke-black dark:stroke-gray-200 dark:text-gray-200 "
          on:click={menuButton.onclick || (() => '')}
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
