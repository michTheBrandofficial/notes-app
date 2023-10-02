import Body from '@components/Body';
import Form from '@components/Form';
import Sidebar from '@components/Sidebar';
import Trash from '@components/Trash';
import { Notification } from '@components/display';
import { useStorage } from '@utils/useStorage';
import { callSignal, effect } from 'nixix/primitives';

const App = () => {
  // state for theme.
  const [getTheme] = useStorage<string>('theme');
  effect(() => {
    const theme = getTheme();
    if (theme) document.body.classList.add(theme);
  }, 'once');
  const [sidebar, setSidebar] = callSignal<boolean>(false, {
    equals: true,
  });

  return (
    <>
      <Sidebar {...{ sidebar, setSidebar }} />
      <Notification />
      <Body toggleMenu={[sidebar, setSidebar]} />
      <Trash />
      <Form />
    </>
  );
};

export default App;
