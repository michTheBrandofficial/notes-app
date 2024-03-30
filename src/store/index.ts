import { useStorage } from '@/src/utils/useStorage';
import { reaction, signal, store } from 'nixix/primitives';

// Toggles here 
export const [settingClass, setSettingsClass] = signal<'translate-x-[-100%] opacity-0' | ''>('translate-x-[-100%] opacity-0')


export const [getStorageNotes, setStorageNotes] = useStorage<TNotes>('notes');
export const [notes, setNotes] = store<TNotes>(getStorageNotes() || []);
reaction(() => {
  setStorageNotes(notes);
}, [notes]);

export const [editedNote, setEditedNote] = store<
  Optional<EditedNote, 'bodyValue' | 'inputValue'>
>({
  bodyValue: '',
  inputValue: '',
  key: null,
});

export const [selectedNotes, setSelectedNotes] = store<number[]>([]);
