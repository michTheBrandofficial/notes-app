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

  interface ThemeProps {
    theme: SignalObject<'dark' | 'light'>;
    setTheme: SetSignalDispatcher<'dark' | 'light'>;
  }

  interface DisplayType {
    moon: 'none' | 'block';
    sun: 'none' | 'block';
  }
}
