import { stripPublicDir } from '@/lib';
import { HStack, Heading, VStack } from 'nixix/view-components';

type TrashFallbackProps = {};

const TrashFallback = (props: TrashFallbackProps): someView => {
  return (
    <HStack
      className={
        'w-full h-full flex items-center justify-center bg-white dark:bg-stone-700 '
      }
    >
      <VStack className="w-fit h-fit flex flex-col items-center font-medium text-lg lg:text-2xl ">
        <img
          src={stripPublicDir('/public/images/935d25727c6032e4b85d3e633d5912a1.png')}
          className={'w-fit h-fit dark:mix-blend-color-burn '}
          alt="Empty trash can"
        />
        <Heading>Nothing in Trash</Heading>
      </VStack>
    </HStack>
  );
};

export default TrashFallback;
