import Body from '@components/Body';
import Sidebar from '@components/Sidebar';
import { useStorage } from '@utils/useStorage';
import { Show } from 'nixix/hoc';
import { effect } from 'nixix/primitives';
import { formDisplay } from '../store';
import Form from '@components/Form';

const App = () => {
  // state for theme.
  const [getTheme] = useStorage<string>('theme');

  effect(() => {
    const theme = getTheme();
    if (theme) document.body.classList.add(theme);
  }, 'once');

  return (
    <>
      <Show
        when={() => formDisplay.value === false}
        fallback={<Form />}
        switch={formDisplay}
      >
        <Sidebar />
        <Body />
      </Show>
    </>
  );
};

export default App;
