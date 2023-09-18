import { setFormDisplay } from 'store';
import { formRef } from './refs';
// make the form to be tied to localStorage
export const createNewNote = () => {
  setFormDisplay(true);

  const form = formRef.current;
  form?.querySelector('input')?.focus?.();
};
