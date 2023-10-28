import Icon from '@utils/nixix-heroicon';
import { chevronLeft } from '@utils/nixix-heroicon/outline';
import { Button, VStack } from 'view-components';

type HeaderProps = {
  goHome: () => void;
};

const Header = (props: HeaderProps): someView => {
  return (
    <VStack className={'w-full h-44 p-4 bg-peach '}>
      <VStack
        className={
          'w-full h-full p-3 flex flex-col space-x-2 space-y-6 justify-between'
        }
      >
        <Button
          on:click={props.goHome}
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
