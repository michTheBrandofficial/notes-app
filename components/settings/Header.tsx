import { showHome } from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import { chevronLeft } from '@utils/nixix-heroicon/outline';
import { displayRefs } from '@utils/refs';
import { Button, VStack } from 'view-components';

const Header = (): someView => {
  return (
    <VStack className={'w-full h-44 p-4 bg-peach '}>
      <VStack
        className={
          'w-full h-full p-3 flex flex-col space-x-2 space-y-6 justify-between'
        }
      >
        <Button
          on:click={() => {
            showHome(displayRefs.settingsRef, {
              classes: ['translate-x-[-100%]', 'opacity-0'],
            });
          }}
          className="w-fit h-fit border-none lg:hidden active:outline-none active:bg-transparent "
        >
          <Icon
            className="stroke-black dark:stroke-stone-900 fill-none"
            path={chevronLeft}
            size={30}
            stroke:width={2.4}
          ></Icon>
        </Button>
        <h1 className="text-[35px] dark:text-stone-900 ">Settings</h1>
      </VStack>
    </VStack>
  );
};

export default Header;
