export {};

declare global {
  type Shortcuts = 'new-note' | 'open-settings' | 'open-trash';
  type ShortcutHandlers = {
    [key in Shortcuts]: () => void;
  };
}
