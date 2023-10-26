import { ClassList } from '@utils/classes';
import Icon from '@utils/nixix-heroicon';
import { MouseEventHandler } from 'nixix/types/eventhandlers';
import { Button, HStack, Paragragh } from 'view-components';

type ToggleProps = {
  'on:click'?: MouseEventHandler<HTMLButtonElement>;
  toggle?: boolean;
  text: keyof BooleanSettings;
  icon?: {
    path: string;
    outline: boolean;
  };
};

const transition = 'transition-all duration-500';
const translate = 'translate-x-full';
const Toggle = (props: ToggleProps): someView => {
  let on = props?.toggle;
  return (
    <HStack className={'items-center h-fit py-1 '}>
      {props?.icon && (
        <Icon
          path={props?.icon}
          className={'stroke-peach fill-none mr-4'}
          size={30}
        />
      )}
      <Paragragh className="text-inherit ">{props?.text}</Paragragh>
      <Button
        className={`w-[44px] h-fit ml-auto ${transition} flex active:outline-none active:bg-transparent focus:outline-none rounded-full p-[2px] ${
          on ? 'bg-peach' : 'bg-slate-300'
        } lg:w-[40px] lg:p-[2px] `}
        on:click={(e) => {
          const querySelector = e.currentTarget.querySelector.bind(
            e.currentTarget
          );
          if (on) {
            ClassList.replace(e.currentTarget, 'bg-peach', 'bg-slate-300');
            ClassList.remove(querySelector('div'), translate);
            on = false;
          } else {
            ClassList.replace(e.currentTarget, 'bg-slate-300', 'bg-peach');
            ClassList.add(querySelector('div'), translate);
            on = true;
          }

          props?.['on:click']?.(e);
        }}
      >
        <div
          className={`h-[20px] w-[20px] ${transition} ${
            on && translate
          } bg-white shadow-lg rounded-full lg:h-[18px] lg:w-[18px] `}
        ></div>
      </Button>
    </HStack>
  );
};

export default Toggle;
