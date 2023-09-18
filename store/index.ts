import { callSignal, callReaction, callStore } from 'nixix/primitives';
import { useStorage } from '@utils/useStorage';

type SidebarType = {
  sidebar: number;
  menu?: number;
  display?: 'flex' | 'none';
};
const isSmallScreen = window.innerWidth <= 375;
export const [sidebar, setSidebar] = callStore<SidebarType>({
  sidebar: isSmallScreen ? 0 : 1,
  menu: 1,
  display: isSmallScreen ? 'none' : 'none',
});

export const [getStorageNotes, setStorageNotes] = useStorage<TNotes>('notes');
export const [notes, setNotes] = callStore<TNotes>(getStorageNotes() || []);
callReaction(() => {
  setStorageNotes(notes.$$__value);
}, [notes]);

export const [formDisplay, setFormDisplay] = callSignal<boolean>(false);
