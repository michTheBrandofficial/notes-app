import Icon from '@utils/nixix-heroicon';
import {
  inbox,
  star,
  calendar,
  check,
  trash,
} from '@utils/nixix-heroicon/outline';

const MenuButtons = () => {
  const menuButtons: ButtonArray = [
    { button: 'Inbox', path: inbox },
    { button: 'Today', path: star },
    { button: 'Upcoming', path: calendar },
    { button: 'Completed', path: check },
    { button: 'Trash', path: trash },
  ];

  return (
    <section className="h-fit w-full text-gray-800 stroke-gray-800 space-y-6 ">
      {menuButtons.map((menuButton) => (
        <div className="btn h-fit w-full flex items-center space-x-2 text-lg cursor-pointer stroke-black dark:stroke-gray-200 dark:text-gray-200 ">
          <Icon
            path={menuButton.path}
            className="stroke-inherit fill-none "
          ></Icon>
          <p>{menuButton.button}</p>
        </div>
      ))}
    </section>
  );
};

export default MenuButtons;
