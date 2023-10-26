export const defaultUserSettings: IUserSettings = {
  'bullet points': {
    default: 'none',
    recentOptions: [],
  },
  'font size': {
    default: '16px',
    recentOptions: [],
  },
  'offline reading': true,
  'text color': {
    default: '#000',
    recentOptions: [],
  },
  'theme mode': 'Light',
  notifications: true,
  'permanent deletion': false,
};

export class ChangeSettingsEvent {
  type: keyof ChangeSettingsEventMap;
  constructor(type: keyof ChangeSettingsEventMap) {
    this.type = type;
  }
}

export class UserSettings {
  public _settings!: IUserSettings;
  private _listeners!: {
    type: `get:${keyof IUserSettings}`;
    handler: ChangeSettingsEventMap[keyof ChangeSettingsEventMap] | null;
  }[];
  constructor(settings?: IUserSettings) {
    // @ts-ignore
    if (!window.$$__userSettings) {
      this._settings = settings as any;
      this._listeners = [];
      // @ts-ignore
      window.$$__userSettings = this;
      return this as UserSettings;
    } else {
      // @ts-ignore
      return window.$$__userSettings as UserSettings | null;
    }
  }
  addEventListener<E extends keyof ChangeSettingsEventMap>(
    type: E,
    handler: ChangeSettingsEventMap[E] | null
  ) {
    this._listeners.push({
      type,
      handler,
    });
  }
  dispatchEvent(ev: ChangeSettingsEvent) {
    const type = ev.type.replace('get:', '') as keyof IUserSettings;
    this._listeners.forEach((lis) => {
      if (!(type in this._settings))
        throw new Error(`${type} event does not exist on UserSetting object`);
      if (lis.type !== ev.type) return;
      const setting = this._settings[type];
      lis.handler?.(setting as never);
    });
  }
}
