import { useStorage } from '@/src/utils/useStorage';
import { callReaction, callStore } from 'nixix/primitives';

export const [getTrash, setTrash] = useStorage<TTrash>('trash');
export const [trashStore, setTrashStore] = callStore<TTrash>(getTrash() || []);
callReaction(() => {
  setTrash(trashStore.$$__value);
}, [trashStore]);
