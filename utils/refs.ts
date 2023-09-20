import { callRef } from 'nixix/primitives';

export const formRef = callRef<HTMLFormElement>();

export const notesRef = callRef<HTMLElement>();

export const displayRefs = {
  asideRef: callRef<HTMLElement>(),
  sectionRef: callRef<HTMLElement>(),
  formRef: callRef<HTMLElement>(),
};
