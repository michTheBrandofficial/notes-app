import { showSettings, showTrash } from '@/src/utils//functions';
import Icon from '@/src/utils//nixix-heroicon';
import {
  calendar,
  check,
  cog,
  collection,
  home,
  trash,
} from '@/src/utils//nixix-heroicon/outline';
import { For } from 'nixix/hoc';
import { SetSignalDispatcher } from 'nixix/primitives';
import { Button, Paragragh, VStack } from 'nixix/view-components';

type MenuButtonsProps = {
  setSidebar: SetSignalDispatcher<boolean>;
};

const MenuButtons = ({ setSidebar }: MenuButtonsProps) => {
  const menuButtons: ButtonArray = [
    { button: 'Home', path: home, onclick: () => null, desktop: true },
    { button: 'Upcoming', path: calendar },
    { button: 'Completed', path: check },
    { button: 'Trash', path: trash, onclick: showTrash },
    { button: 'Settings', path: cog, onclick: showSettings },
    { button: 'Collections', path: collection, onclick: showSettings },
  ];

  return (
    <VStack className="h-fit w-full text-gray-800 stroke-gray-800 space-y-6 ">
      <For each={menuButtons} >
        {({button, onclick, path}) => (
          <Button
            className={`btn h-fit border-none w-full flex items-center space-x-2 text-lg cursor-pointer stroke-black/60 dark:stroke-gray-200 dark:text-gray-200 ${button === 'Home' ? 'hidden lg:flex ' : ''
              } `}
            on:click={(e) => {
              setSidebar(false);
              onclick?.(e);
            }}
          >
            <Icon
              path={path}
              className="stroke-inherit fill-none "
            ></Icon>
            <Paragragh>{button}</Paragragh>
          </Button>
        )}
      </For>
    </VStack>
  );
};

export default MenuButtons;
