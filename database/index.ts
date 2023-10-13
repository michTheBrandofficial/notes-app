import {
  createObjectStore,
  getIndexBase,
  getRecords,
  objectStore,
} from '@utils/indexbase';
import type { IBaseVersionChangeEvent } from '@utils/indexbase/types';

async function defineSchema(e: IBaseVersionChangeEvent) {
  const db = e.currentTarget?.result!;
  // notes OS
  const notesStore = await createObjectStore(db, 'notes', {
    keyPath: 'noteId',
  });
  // trash OS
  const trashStore = await createObjectStore(db, 'trash', {
    keyPath: 'trashId',
  });
}

// create db and define schema on version 1.
/*
  Data model: 
    Notes objectStore: where each value is an object containing the note info.
    Trash objectStore: where each value is an object containing a deleted note info.
*/
export const DB = await getIndexBase('notes-app', {
  defineSchema,
});

const notesStore = await objectStore<TNote, 'noteId'>(DB, 'notes', {
  keyPath: 'noteId',
});
// trash OS

export async function migrateDatabase() {}
