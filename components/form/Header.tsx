import Icon from '@utils/nixix-heroicon';
import { check, chevronLeft, pencil } from '@utils/nixix-heroicon/outline';
import { Button, HStack, Paragragh } from 'view-components';

type HeaderProps = {
  goHome: VoidFunction;
  edit: VoidFunction;
  save: VoidFunction;
};

const Header = (props: HeaderProps): someView => {
  return (
    <HStack className={'w-full h-fit flex items-center justify-between '}>
      <Button on:click={props.goHome}>
        <Icon
          className={'stroke-peach fill-none  '}
          path={chevronLeft}
          size={28}
          stroke:width={2.5}
        />
      </Button>
      <Paragragh className="text-peach text-[20px] font-bold ">
        Design
      </Paragragh>

      <Button className={'ml-auto edit-btn hidden'} on:click={props.edit}>
        <Icon
          className={'stroke-peach fill-none stroke-[3px] '}
          path={pencil}
          size={28}
          stroke:width={2.5}
        />
      </Button>
      <Button className={'ml-auto '} on:click={props.save}>
        <Icon
          className={'stroke-peach fill-none stroke-[3px] '}
          path={check}
          size={28}
          stroke:width={2.5}
        />
      </Button>
    </HStack>
  );
};

export default Header;
