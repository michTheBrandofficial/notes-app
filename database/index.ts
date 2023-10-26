import {
  createObjectStore,
  getIndexBase,
  getRecord,
  objectStore,
  setRecord,
} from '@utils/indexbase';
import type { IBaseVersionChangeEvent } from '@utils/indexbase/types';
import {
  ChangeSettingsEvent,
  UserSettings,
  defaultUserSettings,
} from './settings';

async function defineSchema(e: IBaseVersionChangeEvent) {
  const db = e.currentTarget?.result!;
  createObjectStore(db, 'notes', {
    keyPath: 'noteId',
  });
  createObjectStore(db, 'trash', {
    keyPath: 'trashId',
  });
  createObjectStore(db, 'settings', {
    keyPath: 'settingsId',
  }).then((val) => {
    changeSettings(defaultUserSettings, null, val);
  });
}

export const DB = await getIndexBase(
  'notes-app',
  {
    defineSchema,
  },
  1
);
const settingsStore = await objectStore<IUserSettings, 'settingsId'>(
  DB,
  'settings',
  {
    keyPath: 'settingsId',
  }
)
  .then((val) => val)
  .catch((err) => err);

export let settings: IUserSettings = await getRecord<IUserSettings>(
  settingsStore,
  'settings'
);

const settingsInstance = new UserSettings(settings);

export function changeSettings(
  newSettings: IUserSettings | null,
  type: keyof ChangeSettingsEventMap | null,
  store = settingsStore
) {
  if (newSettings) {
    setRecord(store, {
      ...newSettings,
      settingsId: 'settings',
    }).then(
      () =>
        type && settingsInstance?.dispatchEvent(new ChangeSettingsEvent(type))
    );
  }
}

export { UserSettings };
