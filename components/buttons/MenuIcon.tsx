import Icon from '@utils/nixix-heroicon';
import { menuAlt_3, x } from '@utils/nixix-heroicon/outline';
import { displayRefs } from '@utils/refs';
import { NixixAttributes } from 'nixix';
import { MutableRefObject } from 'nixix/primitives';
import { setSidebar, sidebar } from 'store/display';

type MenuIconProps = {
  close: boolean;
  xButtonRef?: MutableRefObject<HTMLDivElement | null>;
};

type Props = Pick<NixixAttributes<HTMLDivElement>, 'bind:ref'>;

const MenuIcon = ({ close, xButtonRef }: MenuIconProps) => {
  const opacity = close ? 0 : 1;
  const props: Props = {};
  if (xButtonRef) props['bind:ref'] = xButtonRef;

  return (
    <div
      on:click={(e) => {
        const asideEl = displayRefs.asideRef.current;
        if (!close) {
          asideEl?.classList.replace('hidden', 'flex');
          setTimeout(() => {
            asideEl?.classList.add('right-t');
            setSidebar({
              menu: Number(!opacity),
              x: Number(opacity),
            });
          }, 50);
        } else {
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

        // switch the button;
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
      className={`stroke-inherit fill-inherit tr-4 cursor-pointer  ${
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
    </div>
  );
};
export default MenuIcon;
