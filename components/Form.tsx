import Icon from '@utils/nixix-heroicon';
import { check, chevronLeft } from '@utils/nixix-heroicon/outline';
import { setNotes } from 'store';
import { formRef, sectionRef } from '@utils/refs';
import { FormEvent } from 'nixix/types/eventhandlers';
import { getCreationDate, getUpdateTime, removeValue } from '@utils/functions';

// on:submit function
const Form = () => {
  function handleSubmbit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: TNote = {
      title: formData.get('title'),
      body: formData.get('body'),
    };

    if (data.title === '') return;
    else {
      data.time = getUpdateTime();
      data.createdDate = getCreationDate();
    }
    const inputs = [
      e.currentTarget.querySelector('input'),
      e.currentTarget.querySelector('textarea'),
    ];
    setNotes((prev) => {
      prev?.unshift(data);
      return prev as TNotes;
    });
    sectionRef.current?.classList.remove('right-t');
    removeValue(...(inputs as any));
  }

  return (
    <section
      className={
        'w-full tr-3 h-full bg-white absolute left-t z-50 tr-6 p-2 lg:px-12 '
      }
      bind:ref={sectionRef}
    >
      <section className={'w-full h-full flex flex-col '}>
        <div className={'w-full h-fit flex items-center justify-between '}>
          <button
            on:click={() => {
              sectionRef.current?.classList.remove('right-t');
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

          <button
            className={'ml-auto '}
            on:click={() => formRef?.current?.requestSubmit()}
          >
            <Icon
              className={'stroke-blue-400 fill-none stroke-[3px] '}
              path={check}
              size={28}
              stroke:width={2.5}
            />
          </button>
        </div>
        <form
          on:submit={handleSubmbit}
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
