import { showSettings, showTrash } from '@utils/functions';
import { setformDisplay } from 'store/display';

type Tasks = ShortcutHandlers;

const tasks: Tasks = {
  'new-note': () => {
    setformDisplay(true);
  },
  'open-settings': () => {
    showSettings();
  },
  'open-trash': () => {
    showTrash();
  },
};

export default tasks;
