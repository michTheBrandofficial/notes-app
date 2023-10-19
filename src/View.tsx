import Body from '@components/Body';
import Form from '@components/Form';
import Sidebar from '@components/Sidebar';
import Trash from '@components/Trash';
import { Notification } from '@components/display';
import { useStorage } from '@utils/useStorage';
import { Suspense } from 'nixix/hoc';
import { callSignal, effect } from 'nixix/primitives';

const View = (): someView => {
  effect(() => {
    // state for theme.
    const [getTheme] = useStorage<string>('theme');
    const theme = getTheme();
    document.body.classList.add(theme || 'light');
  }, 'once');
  const [sidebar, setSidebar] = callSignal<boolean>(false, {
    equals: true,
  });

  return (
    <>
      <Sidebar {...{ sidebar, setSidebar }} />
      <Notification />
      <Body toggleMenu={[sidebar, setSidebar]} />
      <Suspense>
        <Trash />
      </Suspense>
      <Form />
    </>
  );
};

export default View;
