import { SignalObject, SetSignalDispatcher } from 'nixix/primitives';

export {};

declare global {
  type ButtonArray = Array<{
    button: string;
    path: {
      path: string;
      outline: boolean;
    };
  }>;

  type Themes = 'light' | 'dark' | (string & {});
  type StorageKey = 'notes' | 'theme' | (string & {});
  type TNote = {
    title?: string | FormDataEntryValue | null;
    body: string | FormDataEntryValue | null;
    time?: string;
    createdDate?: string;
  };
  type TNotes = TNote[];

  interface ThemeProps {
    theme: SignalObject<Themes>;
    setTheme: SetSignalDispatcher<Themes>;
  }
}
