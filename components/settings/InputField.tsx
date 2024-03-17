import { ClassList } from '@/src/utils/classes';
import { removeLast } from '@/src/utils/functions';
import { For, Show } from 'nixix/hoc';
import {
    SetSignalDispatcher,
    SignalObject,
    StoreObject,
    callReaction,
    callRef,
    memo
} from 'nixix/primitives';
import {
    Article,
    FormField,
    Paragragh,
    TextField,
    VStack,
} from 'nixix/view-components';

type InputFieldProps = {
  inputSignal?: [SignalObject<boolean>, SetSignalDispatcher<boolean>];
  callback?: (value: InputSelectType<`${string}px` | string> | null) => void;
  inputOptions: StoreObject<string[]>;
};
const InputField = (props: InputFieldProps): someView => {
  const inputRef = callRef<HTMLElement>();
  const [inputOpen, setInputOpen] = props.inputSignal!;
  callReaction(() => {
    const querySelector = inputRef.current?.querySelector?.bind?.(
      inputRef.current
    );
    if (inputOpen.value) {
      ClassList.replace(inputRef, 'hidden', 'flex');
      setTimeout(() => {
        ClassList.replace(querySelector?.('form')!, 'scale-50', 'scale-100');
      }, 10);
    } else {
      ClassList.replace(inputRef, 'flex', 'hidden');
      ClassList.replace(querySelector?.('form')!, 'scale-100', 'scale-50');
    }
  }, [inputOpen]);
  const { inputOptions } = props;
  const length = memo(() => {
    return inputOptions?.$$__value?.length;
  }, [inputOptions]);

  return (
    <VStack
      className={
        'w-full h-screen absolute bg-[rgba(0,0,0,.2)] hidden flex-col items-center justify-center dark:bg-[rgba(255,255,255,.2)] '
      }
      on:click={() => {
        props.callback?.(null);
        setInputOpen(false);
      }}
      bind:ref={inputRef}
    >
      <FormField
        className={
          'modal w-[320px] h-[320px] font-HantenGrotesk p-8 relative z-50 bg-[rgba(0,0,0,.2)] rounded-3xl backdrop-blur-2xl blur-shadow flex flex-col overflow-y-scroll transition-all duration-500 ease-in-out scale-50 no-scroll '
        }
        on:click={(e) => {
          e.stopPropagation();
        }}
        on:submit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget).get(
            'inputOption'
          ) as string;
          if (formData) {
            const recentOptions = structuredClone(inputOptions.$$__value);
            if (recentOptions.includes(formData) === false) {
              recentOptions.unshift(formData);
            }
            props.callback?.({
              default: formData,
              // @ts-ignore
              recentOptions: removeLast(recentOptions),
            });
            e.currentTarget.querySelector('input')!.value = null as any;
            setInputOpen(false);
          }
        }}
        on:keyup={(e) => {
          function removeFocus() {
            e.currentTarget.querySelector?.('input')?.blur();
            e.currentTarget.click();
          }
          e.key === 'Escape' && removeFocus();
        }}
        on:transitionend={(e) => {
          if (inputOpen.value) {
            const input = e.currentTarget.querySelector('input')!;
            input.focus();
          }
        }}
      >
        <TextField
          className={
            'w-full h-14  bg-[rgba(255,255,255,.3)] pl-8 text-lg focus:outline-none caret-slate-900 rounded-[12px]'
          }
          name={'inputOption'}
          autocomplete={'off'}
        />
        <Show when={() => length.value > 0} switch={inputOptions}>
          <Paragragh className={'text-[rgba(255,255,255,.9)] text-xl l py-3 '}>
            Recent Options
          </Paragragh>
        </Show>
        <VStack
          className={'w-full flex-grow rounded-[12px] space-y-2 flex flex-col '}
          on:click={(e) => {
            if (!length.value) return;
            const form = inputRef.current?.querySelector?.('form');
            const input = form?.querySelector('input');
            const option = (e.target as HTMLElement).textContent!;
            input!.value = option;
            form?.requestSubmit();
          }}
        >
          <For each={inputOptions}>
            {(store, i) => {
              return (
                <Article
                  className={
                    'flex-grow flex justify-center items-center w-full bg-[rgba(255,255,255,.3)] focus:bg-[rgba(255,255,255,.7)] rounded-[12px] text-xl max-h-[46.69px] '
                  }
                  tabindex={1}
                >
                  <Paragragh>{store[i]}</Paragragh>
                </Article>
              );
            }}
          </For>
        </VStack>
      </FormField>
    </VStack>
  );
};

export default InputField;
