import { UserSettings, changeSettings } from '@/database';
import { ClassList } from '@/src/utils/classes';
import { bindMethod } from '@/src/utils/functions';
import { SetStoreDispatcher } from 'nixix/primitives';
import { cloneObject } from 'nixix/primitives/helpers';

export class UserSettingsHandlers {
  settingsInstance: UserSettings;
  setModalOptions: SetStoreDispatcher<string[]>;
  newSetting: any;
  userSettings: IUserSettings;
  setInputOptions: SetStoreDispatcher<string[]>;

  constructor(args: {
    settingsInstance: UserSettings;
    setModalOptions: SetStoreDispatcher<string[]>;
    setInputOptions: SetStoreDispatcher<string[]>;
    newSetting: any;
  }) {
    this.settingsInstance = args.settingsInstance;
    this.setInputOptions = args.setInputOptions;
    this.newSetting = args.newSetting;
    this.userSettings = this.settingsInstance._settings;
    this.setModalOptions = args.setModalOptions;
    this.toggleNotifications = bindMethod(this, 'toggleNotifications');
    this.toggleOfflineReading = bindMethod(this, 'toggleOfflineReading');
    this.selectTheme = bindMethod(this, 'selectTheme');
    this.inputBP = bindMethod(this, 'inputBP');
    this.inputFontSize = bindMethod(this, 'inputFontSize');
    this.togglePermanentDelete = bindMethod(this, 'togglePermanentDelete');
  }

  runBoolCheck<T extends Lowercase<keyof BooleanSettings>>({
    userSettings,
    setting,
    settingValue,
  }: {
    userSettings: IUserSettings;
    setting: T;
    settingValue: IUserSettings[T];
  }) {
    if (settingValue === false) {
      userSettings[setting] = false;
    }
    if (settingValue === true) {
      userSettings[setting] = true;
    }
  }

  toggleOfflineReading() {
    const userSettings = this.userSettings;
    const setting = 'offline reading' as const;
    const offlineSetting = !userSettings?.[setting];
    if (userSettings)
      this.runBoolCheck({
        userSettings,
        setting,
        settingValue: offlineSetting,
      });
    else return;
    changeSettings(userSettings, `get:${setting}`);
  }

  toggleNotifications() {
    const userSettings = this.userSettings;
    const setting = 'notifications';
    const notifiSetting = !userSettings?.[setting];
    if (userSettings)
      this.runBoolCheck({
        userSettings,
        setting,
        settingValue: notifiSetting,
      });
    else return;
    changeSettings(userSettings, `get:${setting}`);
  }

  togglePermanentDelete() {
    const userSettings = this.userSettings;
    const setting = 'permanent deletion';
    const notifiSetting = !userSettings?.[setting];

    if (userSettings)
      this.runBoolCheck({
        userSettings,
        setting,
        settingValue: notifiSetting,
      });
    else return;
    changeSettings(userSettings, `get:${setting}`);
  }

  selectTheme() {
    const themes = ['Light', 'Dark'];
    this.setModalOptions(themes);

    const selectionPromise = new Promise<string>((resolve) => {
      this.newSetting.resolvePromise = resolve;
    });
    selectionPromise.then((val) => {
      if (val === null) return;
      val = val.toLowerCase();
      if (val === 'dark') {
        ClassList.add(document.body, 'dark');
      } else ClassList.remove(document.body, 'dark');
    });
    return selectionPromise;
  }

  inputFontSize() {
    const promise = new Promise<InputSelectType<string>>((resolve) => {
      this.newSetting.resolvePromise = resolve;
    });
    let recentOptions =
      cloneObject(this.userSettings?.['font size']?.recentOptions) || [];
    this.setInputOptions(recentOptions);
    return promise;
  }

  inputBP() {
    const promise = new Promise<InputSelectType<string>>((resolve) => {
      this.newSetting.resolvePromise = resolve;
    });
    let recentOptions =
      cloneObject(this.userSettings?.['bullet points']?.recentOptions) || [];
    this.setInputOptions(recentOptions);
    return promise;
  }
}
