import Body from '@components/Body';
import Sidebar from '@components/Sidebar';
import { useStorage } from '@utils/useStorage';
import { effect } from 'nixix/primitives';
import Form from '@components/Form';
import { Notification } from '@components/display';

const App = () => {
  // state for theme.
  const [getTheme] = useStorage<string>('theme');

  effect(() => {
    const theme = getTheme();
    if (theme) document.body.classList.add(theme);
  }, 'once');

  return (
    <>
      <Sidebar />
      <Notification />
      <Body />
      <Form />
    </>
  );
};

export default App;
