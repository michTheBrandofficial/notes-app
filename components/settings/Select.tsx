import { ClassList } from '@utils/classes';
import { lowerCase } from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import { chevronRight } from '@utils/nixix-heroicon/outline';
import { changeSettings } from 'database';
import { HStack } from 'view-components';

type SelectProps = {
  globalSettings: IUserSettings | null;
  'on:click'?: () => Promise<string>;
  text: keyof SelectSettings;
  icon?: {
    path: string;
    outline: boolean;
  };
};

const Select = (props: SelectProps): someView => {
  const { icon, globalSettings, text } = props;
  const set = globalSettings?.[lowerCase(text)];
  return (
    <HStack className={'items-center h-fit py-1 '}>
      {icon && (
        <Icon path={icon} className={'stroke-peach fill-none mr-4'} size={30} />
      )}
      <p className="text-inherit ">{text}</p>
      <HStack
        className={
          'w-fit h-fit items-center ml-auto justify-normal gap-1 stroke-slate-300 text-slate-500 dark:text-inherit '
        }
        on:click={(e) => {
          const querySelector = e.currentTarget.querySelector.bind(
            e.currentTarget
          );
          const p = querySelector('p');
          const svg = querySelector('svg');
          ClassList.add(svg, 'rotate-90');
          props?.['on:click']?.()?.then?.((val) => {
            ClassList.remove(svg, 'rotate-90');
            if (val === null) return;
            p!.textContent = val;
            if (set !== val) {
              const lCase = lowerCase(text);
              globalSettings![lCase] = val as IUserSettings[Lowercase<
                typeof text
              >];
              changeSettings(globalSettings, `get:${lCase}`);
            }
          });
        }}
      >
        <p className="text-inherit text-[17px]">{set}</p>
        <Icon
          tabindex={1}
          className={'stroke-inherit fill-none transition-all duration-500 '}
          path={chevronRight}
          stroke:width={3.5}
          size={22}
        />
      </HStack>
    </HStack>
  );
};

export default Select;
