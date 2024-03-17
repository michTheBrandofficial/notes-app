import { callRef } from 'nixix/primitives';

export const formRef = callRef<HTMLFormElement>();

export const notesRef = callRef<HTMLElement>();

export const displayRefs = {
  sectionRef: callRef<HTMLElement>(),
  formRef: callRef<HTMLElement>(),
  notificationRef: callRef<HTMLElement>(),
  trashRef: callRef<HTMLElement>(),
  settingsRef: callRef<HTMLElement>(),
};
