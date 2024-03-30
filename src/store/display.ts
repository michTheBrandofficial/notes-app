import { signal, store } from 'nixix/primitives';

export const [sidebar, setSidebar] = signal<boolean>(false);

export const [formDisplay, setformDisplay] = signal<boolean>(false, {
  equals: true,
});

export const [selectOp, setSelectOp] = signal<'0' | '1'>('0');

type Notification = {
  message?: string;
};

export const [notification, setNotification] = store<Notification>({
  message: '',
});
