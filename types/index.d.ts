import { SignalObject, SetSignalDispatcher } from 'nixix/primitives';
import { MouseEventHandler } from 'nixix/types/eventhandlers';

export {};

declare global {
  type Null<T> = T | null | undefined;

  type ButtonArray = Array<{
    button: string;
    path: {
      path: string;
      outline: boolean;
    };
    onclick?: MouseEventHandler<HTMLButtonElement>;
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
    noteId: IDBValidKey;
  };
  type TNotes = TNote[];

  type TrashType = Omit<TNote, 'noteId'> & {
    trashId: IDBValidKey;
  };

  type TTrash = TrashType[];

  interface EditedNote {
    key?: number | null;
    inputValue: TNote['title'];
    bodyValue: TNote['body'];
    collection?: string;
  }
}
