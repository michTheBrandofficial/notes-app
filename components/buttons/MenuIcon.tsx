import Icon from '@utils/nixix-heroicon';
import { x, menuAlt_3 } from '@utils/nixix-heroicon/outline';
import { setSidebar, sidebar } from 'store';

const MenuIcon = ({ close }: { close: boolean }) => {
  const opacity = close ? 0 : 1;
  const display = close ? 'none' : 'flex';

  return (
    <div
      on:click={(e) => {
        setSidebar({
          sidebar: opacity,
          menu: Number(!opacity),
          display: display,
        });
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
        opacity: close ? sidebar.sidebar : sidebar.menu,
      }}
      on:keyup={(e) => {
        if (e.key === 'Enter') {
          e.currentTarget.click();
          (e.currentTarget.nextElementSibling as HTMLDivElement)?.focus();
        }
      }}
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
