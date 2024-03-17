import SwipeGesture from '@/components/SwipeGesture';
import {
  Header,
  InputField,
  InputSelect,
  Select,
  SelectModal,
  SettingsGroup,
  Toggle,
} from '@/components/settings';
import { UserSettingsHandlers } from '@/components/settings/settings';
import { UserSettings } from '@/database';
import { isNull, showHome } from '@/src/utils/functions';
import {
  bell,
  bookOpen,
  sun,
  trash
} from '@/src/utils/nixix-heroicon/outline';
import { displayRefs } from '@/src/utils/refs';
import { callReaction, callSignal, callStore, effect } from 'nixix/primitives';
import { VStack } from 'nixix/view-components';

type NewSetting = {
  resolvePromise: StringResolver | InputStringResolver | null;
};

const Settings = async (): Promise<someView> => {
  const settingsInstance = new UserSettings();
  const userSettings = settingsInstance._settings;
  let newSetting: NewSetting = {
    resolvePromise: null,
  };
  const [modalOptions, setModalOptions] = callStore<string[]>([], {
    equals: true,
  });
  const modalSignal = callSignal<boolean>(false);
  const [inputOptions, setInputOptions] = callStore<string[]>([], {
    equals: true,
  });
  const inputSignal = callSignal<boolean>(false);
  const {
    toggleNotifications,
    toggleOfflineReading,
    togglePermanentDelete,
    selectTheme,
    inputBP,
    inputFontSize,
  } = new UserSettingsHandlers({
    settingsInstance,
    setModalOptions,
    newSetting,
    setInputOptions,
  });

  effect(function setupReaction() {
    callReaction(() => {
      modalSignal[1]?.(true);
    }, [modalOptions]);
    callReaction(() => {
      inputSignal?.[1]?.(true);
    }, [inputOptions]);
  });

  function goHome() {
    showHome(displayRefs.settingsRef, {
      classes: ['translate-x-[-100%]', 'opacity-0'],
    });
  }

  return (
    <SwipeGesture on:swipeleft={goHome}>
      <VStack
        className={
          'h-screen w-full flex flex-col top-0 z-50 translate-x-[-100%] opacity-0 transition-all duration-1000 ease-in-out absolute font-HantenGrotesk bg-white '
        }
        bind:ref={displayRefs.settingsRef}
      >
        <VStack
          className={'h-screen w-full flex flex-col relative top-0 bg-white '}
        >
          <SelectModal
            options={modalOptions}
            callback={(e) => {
              (newSetting.resolvePromise as StringResolver)!(e);
            }}
            modalSignal={modalSignal}
          />
          <InputField
            callback={(e) => {
              (newSetting.resolvePromise as InputStringResolver)!(e!);
            }}
            inputSignal={inputSignal}
            inputOptions={inputOptions}
          />
          <Header goHome={goHome} />
          <VStack
            className={
              'w-full flex-grow flex flex-col px-8 bg-white pt-4 pb-6 space-y-5 overflow-y-scroll no-scroll text-slate-400 dark:text-slate-50 dark:bg-stone-700 '
            }
          >
            <SettingsGroup name="Option">
              <Toggle
                text="Notifications"
                icon={bell}
                toggle={userSettings?.notifications}
                on:click={toggleNotifications}
              />
              <Select
                text="Theme mode"
                icon={sun}
                globalSettings={userSettings}
                on:click={selectTheme}
              />
              <Toggle
                text="Offline reading"
                icon={bookOpen}
                toggle={userSettings?.['offline reading']}
                on:click={toggleOfflineReading}
              />
              <Toggle
                toggle={isNull(userSettings?.['permanent deletion'], false)}
                icon={trash}
                text="Permanent deletion"
                on:click={togglePermanentDelete}
              />
            </SettingsGroup>
            <SettingsGroup name="Typography">
              <InputSelect
                globalSettings={userSettings}
                text="Font size"
                on:click={inputFontSize}
                suffix="px"
              />
              <InputSelect
                globalSettings={userSettings}
                text="Bullet points"
                on:click={inputBP}
              />
            </SettingsGroup>
          </VStack>
        </VStack>
      </VStack>
    </SwipeGesture>
  );
};

export default Settings;
