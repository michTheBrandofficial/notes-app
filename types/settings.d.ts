export {};

declare global {
  type StringResolver = (value: string | PromiseLike<string>) => void;

  type InputStringResolver = (
    value: InputSelectType<string> | PromiseLike<InputSelectType<string>>
  ) => void;

  type InputSelectType<T extends any> = {
    default: T;
    recentOptions: [string, string, string] | [];
  };

  interface BooleanSettings<T = boolean> {
    Notifications: T;
    'Offline reading': T;
    'Permanent deletion': T;
  }

  interface SelectSettings {
    'Theme mode': Capitalize<'light' | 'dark'>;
  }

  interface InputSelectSettings {
    'Font size': InputSelectType<`${string}px`>;
    'Text color': InputSelectType<string>;
    'Bullet points': InputSelectType<string>;
  }

  interface CapitalizedUserSettings
    extends BooleanSettings,
      InputSelectSettings,
      SelectSettings {}

  type IUserSettings = {
    [key in Lowercase<
      keyof CapitalizedUserSettings
    >]: CapitalizedUserSettings[Capitalize<key>];
  };

  type ChangeSettingsEventHandler<T extends any> = (setting: T) => void;

  type ChangeSettingsEventMap = {
    'get:theme mode': (setting: IUserSettings['theme mode']) => void;
    'get:offline reading': (setting: IUserSettings['offline reading']) => void;
    'get:bullet points': (setting: IUserSettings['bullet points']) => void;
    'get:notifications': (setting: IUserSettings['notifications']) => void;
    'get:font size': (setting: IUserSettings['font size']) => void;
    'get:text color': (setting: IUserSettings['text color']) => void;
    'get:permanent deletion': (
      settings: IUserSettings['permanent deletion']
    ) => void;
  };
}
