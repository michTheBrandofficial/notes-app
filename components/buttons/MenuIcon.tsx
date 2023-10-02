import { ClassList } from '@utils/classes';
import Icon from '@utils/nixix-heroicon';
import { menuAlt_3 } from '@utils/nixix-heroicon/outline';
import { SignalObject, callReaction, callRef } from 'nixix/primitives';
import { MouseEventHandler } from 'nixix/types/eventhandlers';

type MenuIconProps = {
  'on:click': MouseEventHandler<HTMLButtonElement>;
  sidebar: SignalObject<boolean>;
};

const MenuIcon = (menuIconProps: MenuIconProps) => {
  let sidebar = menuIconProps.sidebar;
  const buttonRef = callRef<HTMLButtonElement>();
  callReaction(() => {
    if (sidebar.value) ClassList.add(buttonRef.current, 'opacity-0');
    else {
      ClassList.remove(buttonRef.current, 'opacity-0');
      buttonRef.current?.focus();
    }
  }, [menuIconProps.sidebar]);
  return (
    <button
      on:click={menuIconProps['on:click']}
      bind:ref={buttonRef}
      className={`stroke-inherit border-none fill-inherit tr-4 cursor-pointer`}
      on:keyup={(e) => {
        if (e.key === 'Enter') {
          e.currentTarget.click();
        }
      }}
    >
      <Icon
        path={menuAlt_3}
        className={`stroke-inherit fill-none `}
        size={28}
        tabindex={1}
        stroke:width={1.5}
      />
    </button>
  );
};
export default MenuIcon;
