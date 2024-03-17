import { Signal } from 'nixix/primitives';
import { MouseEventHandler } from 'nixix/types/eventhandlers';

type TrashButtonProps = {
  'on:click': MouseEventHandler<HTMLButtonElement>;
  children?: any;
  disabled?: Signal<boolean>;
};

const TrashButton = (props: TrashButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      on:click={props['on:click']}
      className={
        'w-fit h-fit border-none text-base text-peach dark:text-stone-900 disabled:text-gray-300 lg:text-lg'
      }
    >
      {props.children}
    </button>
  );
};

export default TrashButton;
