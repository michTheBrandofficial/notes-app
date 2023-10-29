import { removeUnusedProps } from '@utils/functions';
import {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'nixix';

export const HStack = (props: ViewComponentType): someView => {
  const { children } = removeUnusedProps<Children>(props, 'children');

  return (
    <section
      {...props}
      className={`flex ${props.className ? props.className : ''}`}
    >
      {children}
    </section>
  );
};

export const VStack = (props: ViewComponentType): someView => {
  const { children } = removeUnusedProps<Children>(props, 'children');

  return (
    <section {...props} className={props.className ?? ''}>
      {children}
    </section>
  );
};

export const Article = (props: ViewComponentType): someView => {
  const { children } = removeUnusedProps<Children>(props, 'children');

  return <article {...props}>{children}</article>;
};

export const Aside = (props: ViewComponentType): someView => {
  const { children } = removeUnusedProps<Children>(props, 'children');

  return (
    <aside {...props} className={props.className ?? ''}>
      {children}
    </aside>
  );
};

export const FormField = (
  props: ViewComponentType<FormHTMLAttributes<HTMLFormElement>>
): someView => {
  const { children } = removeUnusedProps<Children>(props, 'children');

  return <form {...props}>{children}</form>;
};

export const TextField = (
  props: ViewComponentType<InputHTMLAttributes<HTMLInputElement>>
): someView => {
  removeUnusedProps<Children>(props, 'children');

  return (
    <input spellcheck autocapitalize={'sentences'} type={'text'} {...props} />
  );
};

export const TextArea = (
  props: ViewComponentType<TextareaHTMLAttributes<HTMLTextAreaElement>>
): someView => {
  const { children } = removeUnusedProps<Children>(props, 'children');

  return (
    <textarea spellcheck autocapitalize={'sentences'} {...props}>
      {children}
    </textarea>
  );
};

export const Button = (
  props: ViewComponentType<ButtonHTMLAttributes<HTMLButtonElement>>
): someView => {
  const { children } = removeUnusedProps<Children>(props, 'children');

  return (
    <button style={{ cursor: 'pointer' }} {...props}>
      {children}
    </button>
  );
};

export const Paragragh = (
  props: ViewComponentType<HTMLAttributes<HTMLParagraphElement>>
): someView => {
  const { children } = removeUnusedProps<Children>(props, 'children');

  return <p {...props}>{children || []}</p>;
};
