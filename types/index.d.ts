import { SignalObject, SetSignalDispatcher } from 'nixix/primitives';
import { MouseEventHandler } from 'nixix/types/eventhandlers';
import { Options } from 'tinygesture';

export {};

declare global {
  type Null<T> = T | null | undefined;

  type Optional<
    T extends { [id: string]: any },
    K extends keyof T = keyof T
  > = {
    [index in K]?: T[K];
  } & {
    [id in keyof Omit<T, K>]: T[id];
  };

  type ButtonArray = Array<{
    button: string;
    path: {
      path: string;
      outline: boolean;
    };
    onclick?: MouseEventHandler<HTMLButtonElement>;
  }>;

  type SwipeOptions = Optional<
    Options,
    | 'diagonalLimit'
    | 'diagonalSwipes'
    | 'disregardVelocityThreshold'
    | 'longPressTime'
    | 'doubleTapTime'
    | 'pressThreshold'
  >;

  type StorageKey = 'notes' | 'theme' | 'trash' | (string & {});

  type Inputs = [Null<HTMLInputElement>, Null<HTMLTextAreaElement>];

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
