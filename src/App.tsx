import Body from '@components/Body';
import Form from '@components/Form';
import Sidebar from '@components/Sidebar';
import Trash from '@components/Trash';
import { Notification } from '@components/display';
import { useStorage } from '@utils/useStorage';
import { migrateDatabase } from 'database';
import { effect } from 'nixix/primitives';

const App = () => {
  // state for theme.
  const [getTheme] = useStorage<string>('theme');

  effect(() => {
    const theme = getTheme();
    if (theme) document.body.classList.add(theme);
  }, 'once');
  // Ask the user to migrate the database is there is any
  migrateDatabase();

  return (
    <>
      <Sidebar />
      <Notification />
      <Body />
      <Trash />
      <Form />
    </>
  );
};

export default App;
