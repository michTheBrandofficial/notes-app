import { ClassList } from '@utils/classes';
import { For } from 'nixix/hoc';
import {
  SetSignalDispatcher,
  SignalObject,
  StoreObject,
  callReaction,
  callRef,
} from 'nixix/primitives';
import { VStack } from 'view-components';

type SelectModalProps = {
  options?: StoreObject<string[]>;
  modalSignal?: [SignalObject<boolean>, SetSignalDispatcher<boolean>];
  callback: (value: string) => void;
};

const SelectModal = (props: SelectModalProps): someView => {
  const modalRef = callRef<HTMLElement>();
  const [modalOpen, closeModal] = props.modalSignal!;
  callReaction(() => {
    if (modalOpen?.value) {
      ClassList.replace(modalRef, 'hidden', 'flex');
      setTimeout(() => {
        ClassList.add(
          modalRef.current?.querySelector('.modal') as any,
          'modalOpen'
        );
      }, 50);
    } else {
      ClassList.replace(modalRef, 'flex', 'hidden');
      ClassList.remove(
        modalRef.current?.querySelector('.modal') as any,
        'modalOpen'
      );
    }
  }, [modalOpen]);
  return (
    <VStack
      className={
        'w-full h-screen absolute bg-[rgba(0,0,0,.2)] hidden flex-col items-center justify-center dark:bg-[rgba(255,255,255,.2)] '
      }
      bind:ref={modalRef}
      on:click={() => {
        closeModal(false);
        props.callback?.(null!);
      }}
    >
      <VStack
        className={
          'modal w-[320px] h-[320px] font-HantenGrotesk relative z-50 bg-[rgba(0,0,0,.2)] rounded-3xl blur-shadow backdrop-blur-2xl flex flex-col overflow-y-scroll no-scroll '
        }
        on:click={(e) => {
          const target = e.target as unknown as HTMLParagraphElement;
          if (target.tagName !== 'P') return closeModal(false);
          closeModal(false);
          props.callback?.(target.textContent!);
        }}
      >
        <For each={props?.options!}>
          {(storeArray, i) => {
            return (
              <p
                className={
                  'w-full h-fit p-6 border-b last:border-b-0 border-b-gray-500 text-center text-slate-900 dark:text-slate-50 text-xl'
                }
              >
                {storeArray[i]}
              </p>
            );
          }}
        </For>
      </VStack>
    </VStack>
  );
};

export default SelectModal;
