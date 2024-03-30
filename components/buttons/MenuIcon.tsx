import Icon from '@/src/utils/nixix-heroicon';
import { menuAlt_3 } from '@/src/utils/nixix-heroicon/outline';
import { MouseEventHandler } from 'nixix/types/eventhandlers';
import { Button } from 'nixix/view-components';

type MenuIconProps = {
  'on:click': MouseEventHandler<HTMLButtonElement>;
};

const MenuIcon = ({"on:click": onClick}: MenuIconProps) => {
  return (
    <Button
      on:click={onClick}
      className={`stroke-inherit border-none fill-inherit tr-4 cursor-pointer bg-black/10 backdrop-blur-2xl p-2 rounded-full `}
    >
      <Icon
        path={menuAlt_3}
        className={`stroke-inherit fill-none `}
        size={28}
        stroke-width={1.5}
      />
    </Button>
  );
};
export default MenuIcon;
