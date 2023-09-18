import Icon from '@utils/nixix-heroicon';
import { check, chevronLeft } from '@utils/nixix-heroicon/outline';
import { callRef } from 'nixix/primitives';
import { setFormDisplay } from 'store';
import { formRef } from '@utils/refs';

type FormProps = {
  data?: TNote & {
    key?: number;
  };
};

// on:submit function
const Form = (props: FormProps) => {
  return (
    <section className={'w-full tr-3 h-full bg-white p-2 lg:px-12 '}>
      <section className={'w-full h-full flex flex-col '}>
        <div className={'w-full h-fit flex items-center justify-between '}>
          <button
            on:click={() => {
              setFormDisplay(false);
            }}
          >
            <Icon
              className={'stroke-blue-400 fill-none  '}
              path={chevronLeft}
              size={28}
              stroke:width={2.5}
            />
          </button>
          <p className="text-blue-400 text-[20px] font-bold ">Design</p>

          <button className={'ml-auto '}>
            <Icon
              className={'stroke-blue-400 fill-none stroke-[3px] '}
              path={check}
              size={28}
              stroke:width={2.5}
            />
          </button>
        </div>
        <form
          bind:ref={formRef}
          className={
            'w-full h-full flex flex-col text-darkBlue px-2 pt-2 space-y-2 '
          }
        >
          <input
            type="text"
            className={
              'w-full h-12 font-semibold  text-lg pl-2 focus:outline-none border-none '
            }
            autocapitalize={'sentences'}
            on:select={(e) => {
              console.log(e.type);
            }}
            spellcheck
            name={'title'}
            placeholder={'Title'}
          />
          <textarea
            spellcheck
            autocapitalize={'sentences'}
            name="body"
            cols={30}
            rows={10}
            placeholder={'Take a note...'}
            className={'w-full h-full p-2 font-semibold focus:outline-none '}
          ></textarea>
        </form>
      </section>
    </section>
  );
};

export default Form;
