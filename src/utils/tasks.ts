import { setformDisplay } from '@/src/store/display';
import { showSettings, showTrash } from '@/src/utils/functions';

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
