import EmptyTrash from '@assets/images/935d25727c6032e4b85d3e633d5912a1.png';

type TrashFallbackProps = {};

const TrashFallback = (props: TrashFallbackProps) => {
  return (
    <section
      className={'w-full h-full flex items-center justify-center bg-white '}
    >
      <div className="w-fit h-fit flex flex-col items-center font-medium text-lg lg:text-2xl ">
        <img
          src={EmptyTrash}
          className={'w-fit h-fit '}
          alt="Empty trash can"
        />
        <h1>Nothing in Trash</h1>
      </div>
    </section>
  );
};

export default TrashFallback;
