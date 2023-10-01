import Icon from '@utils/nixix-heroicon';
import { menuAlt_3, x } from '@utils/nixix-heroicon/outline';
import { displayRefs } from '@utils/refs';
import { NixixAttributes } from 'nixix';
import { MutableRefObject } from 'nixix/primitives';
import { MouseEventHandler } from 'nixix/types/eventhandlers';
import { setSidebar, sidebar } from 'store/display';

type MenuIconProps = {
  close?: boolean;
  xButtonRef?: MutableRefObject<HTMLButtonElement | null>;
};

type Props = Pick<NixixAttributes<HTMLButtonElement>, 'bind:ref'>;

const TRANSITION_TIME = 900;

function scheduleDisable(el: HTMLButtonElement, close?: boolean) {
  const elementToDisable = !close
    ? (el.previousElementSibling as HTMLButtonElement)
    : (el.nextElementSibling as HTMLButtonElement);
  elementToDisable.disabled = true;
  return new Promise<HTMLButtonElement>((resolve) => {
    setTimeout(() => {
      resolve(elementToDisable);
    }, TRANSITION_TIME);
  });
}

// <MenuIcon close /> X
// <MenuIcon /> Menu
const MenuIcon = (menuIconProps: MenuIconProps) => {
  const { xButtonRef, close } = menuIconProps || {};
  const opacity = close ? 0 : 1;
  const props: Props = {};
  if (xButtonRef) props['bind:ref'] = xButtonRef;

  return (
    <button
      on:click={(e) => {
        const asideEl = displayRefs.asideRef.current;
        const thisButton = e.currentTarget;
        if (!close) {
          asideEl?.classList.replace('hidden', 'flex');
          setTimeout(() => {
            asideEl?.classList.add('right-t');
            scheduleDisable(thisButton!).then((val) => (val.disabled = false));
            setSidebar({
              menu: Number(!opacity),
              x: Number(opacity),
            });
          }, 50);
        } else {
          scheduleDisable(thisButton!, true).then(
            (val) => (val.disabled = false)
          );
          // this is the close button
          asideEl?.classList.remove('right-t');
          setSidebar({
            menu: Number(!opacity),
            x: Number(opacity),
          });
          setTimeout(() => {
            asideEl?.classList.replace('flex', 'hidden');
          }, 1500);
        }

        // transition the button;
        const el = e.currentTarget;
        const contains = el.classList.contains('absolute');
        const classes = ['absolute', 'z-10'];
        if (close) {
          el.nextElementSibling?.classList.add(...classes);
          contains && el.classList.remove(...classes);
        } else {
          el.previousElementSibling?.classList.add(...classes);
          contains && el.classList.remove(...classes);
        }
      }}
      className={`stroke-inherit border-none fill-inherit tr-4 cursor-pointer  ${
        !close ? 'absolute left-0 z-10' : 'right-0'
      } `}
      style={{
        opacity: close ? sidebar.x : sidebar.menu,
      }}
      on:keyup={(e) => {
        if (e.key === 'Enter') {
          e.currentTarget.click();
          (e.currentTarget.nextElementSibling as HTMLDivElement)?.focus();
        }
      }}
      {...props}
    >
      <Icon
        path={close ? x : menuAlt_3}
        className={`stroke-inherit fill-none `}
        size={28}
        tabindex={1}
        stroke:width={1.5}
      />
    </button>
  );
};
export default MenuIcon;
