import { callSignal, callStore } from 'nixix/primitives';

type FormDisplay = {
  transform: 'translateX(0)' | 'translateX(100%)' | 'translateX(-100%)';
  opacity: '0' | '1';
};

export const [formDisplay, setformDisplay] = callStore<FormDisplay>({
  transform: 'translateX(100%)',
  opacity: '0',
});

export const [selectOp, setSelectOp] = callSignal<'0' | '1'>('0');

type Notification = {
  message?: string;
};

export const [notification, setNotification] = callStore<Notification>({
  message: '',
});
