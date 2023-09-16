import Body from '@components/Body';
import Sidebar from '@components/Sidebar';
import { initDB } from '@utils/indexDB';
import { useStorage } from '@utils/useStorage';
import { effect } from 'nixix/primitives';

const App = () => {
  let db: IDBDatabase | null = null;
  const openRequest = initDB('theme', 1);
  openRequest.onupgradeneeded = (e) => {
    db = (e.target as IDBRequest<IDBDatabase>).result;
    console.log(db);
  };
  openRequest.onsuccess = (e) => {
    db = (e.target as IDBRequest<IDBDatabase>).result;
    console.log(db);
  };

  console.log(openRequest.readyState);

  // state for theme.
  const [getTheme] = useStorage<'light' | 'dark'>('theme');
  effect(() => {
    const theme = getTheme();
    if (theme) document.body.classList.add(theme);
  }, 'once');

  return (
    <>
      <Sidebar />
      <Body />
    </>
  );
};

export default App;
