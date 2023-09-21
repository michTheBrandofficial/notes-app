import Icon from '@utils/nixix-heroicon';
import { informationCircle } from '@utils/nixix-heroicon/solid';
import { displayRefs } from '@utils/refs';
import { notification } from 'store';

// download vite-plugin-pwa and workbox-window
const Notification = () => {
  return (
    <section
      className="h-16 w-full max-w-[370px] px-2 tr-3 absolute top-2 z-30 center "
      style={{
        transform: notification.transform,
      }}
      bind:ref={displayRefs.notificationRef}
    >
      <section
        className={
          'h-full w-full max-w-[370px] bg-white border border-gray-200 shadow-round rounded-[10px] flex items-center px-4 space-x-2 '
        }
      >
        <Icon
          path={informationCircle}
          size={28}
          className={'fill-blue-400 stroke-none '}
        />
        <p className={'text-[#081b336b] mt-[-7px] font-semibold letter-1 '}>
          PlaceHolder
        </p>
      </section>
    </section>
  );
};

export default Notification;
