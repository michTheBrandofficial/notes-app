import Dexie, { Table } from 'dexie';
import {
  UserSettings
} from "./settings";

class NotesrusDB extends Dexie {
  public settings!: Table<IUserSettings, string>;

  public constructor() {
    super('NotesrusDB')
    this.version(1).stores({
      settings: `uuid`
    })
  }
}

const db = new NotesrusDB()

const settingsInstance = new UserSettings(undefined);

export function changeSettings(
  newSettings: IUserSettings | null,
  type: keyof ChangeSettingsEventMap | null,
  store = ''
) {
  return ''
}

export { UserSettings };
