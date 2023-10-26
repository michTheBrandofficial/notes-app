/// <reference types="vite/client" />
import Sidebar from '@components/Sidebar';
import { Notification } from '@components/display';
import Body from '@pages/Body';
import Form from '@pages/Form';
import Settings from '@pages/Settings';
import Trash from '@pages/Trash';
import { UserSettings } from 'database';
import { Suspense } from 'nixix/hoc';
import { callSignal, effect } from 'nixix/primitives';
import { VStack } from 'view-components';

const View = (): someView => {
  const userSettings = new UserSettings()._settings;

  effect(() => {
    const theme = userSettings?.['theme mode']?.toLowerCase();
    document.body.classList.add(theme || 'light');
  }, 'once');

  const [sidebar, setSidebar] = callSignal<boolean>(false, {
    equals: true,
  });
  return (
    <VStack className={'w-screen h-screen relative overflow-clip lg:flex'}>
      <Sidebar {...{ sidebar, setSidebar }} />
      <Suspense>
        <Body toggleMenu={[sidebar, setSidebar]} />
        <Notification />
        <Settings />
        <Trash />
      </Suspense>
      <Form />
    </VStack>
  );
};

export default View;
