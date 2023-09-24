import { useStorage } from '@utils/useStorage';
import { callReaction, callStore } from 'nixix/primitives';

export const [getStorageNotes, setStorageNotes] = useStorage<TNotes>('notes');
export const [notes, setNotes] = callStore<TNotes>(getStorageNotes() || []);
callReaction(() => {
  setStorageNotes(notes.$$__value);
}, [notes]);

export const [editedNote, setEditedNote] = callStore<EditedNote>({
  bodyValue: '',
  inputValue: '',
  key: null,
});

export const [selectedNotes, setSelectedNotes] = callStore<number[]>([]);
