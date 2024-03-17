import { useStorage } from '@/src/utils/useStorage';
import { reaction, store } from 'nixix/primitives';

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
