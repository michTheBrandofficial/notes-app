import { MutableRefObject, SetSignalDispatcher } from 'nixix/primitives';
import { MouseEvent, TransitionEvent } from 'nixix/types/eventhandlers';

type PopupProps = {
  ref: MutableRefObject<HTMLElement | null>;
  setAccepted: SetSignalDispatcher<boolean>;
};

const Popup = ({ ref, setAccepted }: PopupProps) => {
  function buttonFocus(e: TransitionEvent<HTMLElement>) {
    const button = e.currentTarget.querySelector('button');
    button?.focus();
  }
  function choose(acceptOrDecline: boolean) {
    return (e: MouseEvent<HTMLButtonElement>) => {
      setAccepted(acceptOrDecline);
    };
  }
  return (
    <section
      className={
        'w-full h-full flex items-center justify-center absolute top-0 z-[60] opa-black '
      }
      on:transitionend={buttonFocus}
      bind:ref={ref}
    >
      <div
        className={
          'w-[300px] bg-blue-300 opacity-[1] rounded-sm flex flex-col justify-between text-white font-HantenGrotesk shadow-sm py-4 px-6 '
        }
      >
        <h1 className={'text-2xl font-semibold '}>Discard Note?</h1>
        <p className="w-full h-fit mt-2 mb-4 font-medium">
          You can keep editing this note.
        </p>
        <div className={'w-full h-fit flex items-center font-semibold '}>
          <button
            className={'border-none ml-auto mr-4 '}
            on:click={choose(false)}
          >
            Cancel
          </button>
          <button className={'border-none '} on:click={choose(true)}>
            Ok
          </button>
        </div>
      </div>
    </section>
  );
};

export default Popup;
