import { ClassList } from '@utils/classes';
import { lowerCase } from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import { chevronRight } from '@utils/nixix-heroicon/outline';
import { changeSettings } from 'database';
import { HStack } from 'view-components';

type InputSelectProps = {
  globalSettings: IUserSettings | null;
  'on:click'?: () => Promise<
    IUserSettings[Lowercase<InputSelectProps['text']>]
  >;
  text: keyof InputSelectSettings;
  icon?: {
    path: string;
    outline: boolean;
  };
  prefix?: string;
  suffix?: 'px';
};

const InputSelect = (props: InputSelectProps): someView => {
  const { icon, globalSettings, text, prefix, suffix } = props;
  const set = globalSettings?.[lowerCase(text)];
  return (
    <HStack className={'items-center h-fit py-1 '}>
      {icon && (
        <Icon path={icon} className={'stroke-peach fill-none mr-4'} size={30} />
      )}
      <p className="text-inherit text-xl">{text}</p>
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
            if (suffix)
              val.default.endsWith(suffix) ? null : (val.default += suffix);
            if (prefix)
              val.default.startsWith(prefix)
                ? null
                : (val.default = prefix.concat(val.default));
            p!.textContent = val.default;
            const lCase = lowerCase(text);
            // @ts-ignore;
            globalSettings![lCase] = val;
            changeSettings(globalSettings, `get:${lCase}`);
          });
        }}
      >
        <p className="text-inherit text-[17px]">{set?.default}</p>
        <Icon
          tabindex={1}
          className={'stroke-inherit fill-none transition-all duration-500 '}
          path={chevronRight}
          stroke:width={3.5}
        />
      </HStack>
    </HStack>
  );
};

export default InputSelect;
