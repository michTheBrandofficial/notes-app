import { createNewNote } from '@utils/functions';
import Icon from '@utils/nixix-heroicon';
import { plus, search, x } from '@utils/nixix-heroicon/outline';

type QuicktoolsProps = {};

const Quicktools = (props: QuicktoolsProps) => {
  const quicktools = [
    {
      path: search,
      color: 'stroke-purple-400 bg-purple-200',
    },
    {
      path: x,
      color: 'stroke-red-400 bg-red-200',
    },
    {
      path: plus,
      color: 'stroke-blue-400 bg-blue-200',
      onclick: createNewNote,
    },
  ];

  return (
    <section className={'w-full h-fit mt-auto pr-4 lg:pr-12 '}>
      <section className={'w-full h-fit flex items-center gap-6 '}>
        {quicktools.map((tool, i) => {
          const last = i === quicktools.length - 1;
          const { color, path, onclick } = tool;
          return (
            <button
              className={`w-fit h-fit p-3 rounded-[16px] ${color} ${
                last && 'ml-auto'
              } `}
              on:click={onclick || (() => 'jeje')}
            >
              <Icon
                path={path}
                className={'stroke-inherit fill-none rounded-inherit '}
              />
            </button>
          );
        })}
      </section>
    </section>
  );
};

export default Quicktools;
