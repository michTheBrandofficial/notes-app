import { SignalObject, SetSignalDispatcher } from 'nixix/primitives';

export {};

declare global {
  type Null<T> = T | null | undefined;

  type ButtonArray = Array<{
    button: string;
    path: {
      path: string;
      outline: boolean;
    };
  }>;

  type Themes = 'light' | 'dark' | (string & {});
  interface ThemeProps {
    theme: SignalObject<Themes>;
    setTheme: SetSignalDispatcher<Themes>;
  }
  type StorageKey = 'notes' | 'theme' | 'trash' | (string & {});

  type Inputs = [] | [Null<HTMLInputElement>, Null<HTMLTextAreaElement>];

  type TNote = {
    title?: string | FormDataEntryValue | null;
    body: string | FormDataEntryValue | null;
    time?: string;
    createdDate?: string;
  };
  type TNotes = TNote[];

  type TTrash = TNote[];

  interface EditedNote {
    key?: number | null;
    inputValue: TNote['title'];
    bodyValue: TNote['body'];
    collection?: string;
  }
}
