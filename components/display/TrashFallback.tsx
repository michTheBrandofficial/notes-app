import EmptyTrash from '@assets/images/935d25727c6032e4b85d3e633d5912a1.png';
import { HStack, VStack } from 'view-components';

type TrashFallbackProps = {};

const TrashFallback = (props: TrashFallbackProps): someView => {
  return (
    <HStack
      className={'w-full h-full flex items-center justify-center bg-white '}
    >
      <VStack className="w-fit h-fit flex flex-col items-center font-medium text-lg lg:text-2xl ">
        <img
          src={EmptyTrash}
          className={'w-fit h-fit '}
          alt="Empty trash can"
        />
        <h1>Nothing in Trash</h1>
      </VStack>
    </HStack>
  );
};

export default TrashFallback;
