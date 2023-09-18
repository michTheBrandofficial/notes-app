import Icon from '@utils/nixix-heroicon';
import { moon, sun } from '@utils/nixix-heroicon/outline';
import { Show } from 'nixix/hoc';
import { SignalObject } from 'nixix/primitives';
import { type MouseEventHandler } from 'nixix/types/eventhandlers';

type ThemeButtonProps = {
  onclick: MouseEventHandler<HTMLButtonElement>;
  themeState: SignalObject<Themes>;
};

const ThemeButton = ({ onclick, themeState }: ThemeButtonProps) => {
  function ThemeIcon({ dark }: { dark?: boolean }) {
    if (dark) {
      return (
        <Icon path={moon} size={25} fill="none" className="stroke-inherit" />
      );
    }
    return <Icon path={sun} size={25} fill="none" className="stroke-inherit" />;
  }

  return (
    <button className="p-0 w-fit ml-auto stroke-blue-500" on:click={onclick}>
      <Show
        when={() => themeState.value === 'light'}
        switch={themeState}
        fallback={<ThemeIcon dark />}
      >
        <ThemeIcon dark={false} />
      </Show>
    </button>
  );
};

export default ThemeButton;
