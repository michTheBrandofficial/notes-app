import { callReaction, callStore } from 'nixix/primitives';
import { useStorage } from '@utils/useStorage';

type SidebarType = {
  menu?: number;
  x?: number;
};
export const [sidebar, setSidebar] = callStore<SidebarType>({
  menu: 1,
  x: 0,
});

export const [getStorageNotes, setStorageNotes] = useStorage<TNotes>('notes');
export const [notes, setNotes] = callStore<TNotes>(getStorageNotes() || []);
callReaction(() => {
  setStorageNotes(notes.$$__value);
}, [notes]);

type FormDisplay = {
  transform: 'translateX(0)' | 'translateX(100%)' | 'translateX(-100%)';
  opacity: '0' | '1';
};

export const [formDisplay, setformDisplay] = callStore<FormDisplay>({
  transform: 'translateX(100%)',
  opacity: '0',
});

export const [editedNote, setEditedNote] = callStore<EditedNote>({
  bodyValue: '',
  inputValue: '',
  key: null,
});

export const [selectedNotes, setSelectedNotes] = callStore<number[]>([]);
