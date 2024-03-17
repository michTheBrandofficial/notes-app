import { notification } from '@/src/store/display';
import Icon from '@/src/utils/nixix-heroicon';
import { informationCircle } from '@/src/utils/nixix-heroicon/solid';
import { displayRefs } from '@/src/utils/refs';
import { HStack, Paragragh, VStack } from 'nixix/view-components';

const Notification = (): someView => {
  return (
    <VStack
      className="h-16 w-full max-w-[370px] px-2 tr-3 absolute z-30 no-notifi center "
      bind:ref={displayRefs.notificationRef}
    >
      <HStack
        className={
          'h-full w-full max-w-[370px] bg-white border border-gray-200 shadow-round rounded-[10px] flex items-center px-4 space-x-2 '
        }
      >
        <Icon
          path={informationCircle}
          size={28}
          className={'fill-peach stroke-none '}
        />
        <Paragragh
          className={'text-[#081b336b] mt-[-7px] font-semibold letter-1 '}
        >
          {notification.message}
        </Paragragh>
      </HStack>
    </VStack>
  );
};

export default Notification;
