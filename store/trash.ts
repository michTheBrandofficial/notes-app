import { useStorage } from '@utils/useStorage';
import { callStore } from 'nixix/primitives';

export const [getTrash, setTrash] = useStorage<TTrash>('trash');
export const [trashStore, setTrashStore] = callStore<TTrash>(getTrash() || []);
