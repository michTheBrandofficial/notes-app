import { MouseEventHandler } from 'nixix/types/eventhandlers';

type TrashButtonProps = {
  'on:click': MouseEventHandler<HTMLButtonElement>;
  children?: any;
};

const TrashButton = (props: TrashButtonProps) => {
  return (
    <button
      on:click={props['on:click']}
      className={'w-fit h-fit border-none text-base text-blue-300 lg:text-lg'}
    >
      {props.children}
    </button>
  );
};

export default TrashButton;
