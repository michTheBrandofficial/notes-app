import {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'nixix';

function removeUnusedProps<T extends Children, K extends keyof T>(
  props: T,
  ...propNames: K[]
) {
  const newProps: { [index: string]: any } = {};
  for (const propName of propNames) {
    newProps[propName as string] = props[propName];
    delete props[propName];
  }
  return newProps as {
    [index in K]: T[index];
  };
}

export const HStack = (props: ViewComponentType): someView => {
  const { children } = removeUnusedProps(props, 'children');

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
  const { children } = removeUnusedProps(props, 'children');

  return (
    <section {...props} className={props.className ?? ''}>
      {children}
    </section>
  );
};

export const Article = (props: ViewComponentType): someView => {
  const { children } = removeUnusedProps(props, 'children');

  return <article {...props}>{children}</article>;
};

export const Aside = (props: ViewComponentType): someView => {
  const { children } = removeUnusedProps(props, 'children');

  return (
    <aside {...props} className={props.className ?? ''}>
      {children}
    </aside>
  );
};

export const FormField = (
  props: ViewComponentType<FormHTMLAttributes<HTMLFormElement>>
): someView => {
  const { children } = removeUnusedProps(props, 'children');

  return <form {...props}>{children}</form>;
};

export const TextField = (
  props: ViewComponentType<InputHTMLAttributes<HTMLInputElement>>
): someView => {
  removeUnusedProps(props, 'children');

  return (
    <input spellcheck autocapitalize={'sentences'} type={'text'} {...props} />
  );
};

export const TextArea = (
  props: ViewComponentType<TextareaHTMLAttributes<HTMLTextAreaElement>>
): someView => {
  const { children } = removeUnusedProps(props, 'children');

  return (
    <textarea
      spellcheck
      autocapitalize={'sentences'}
      rows={10}
      cols={30}
      {...props}
    >
      {children}
    </textarea>
  );
};

export const Button = (
  props: ViewComponentType<ButtonHTMLAttributes<HTMLButtonElement>>
): someView => {
  const { children } = removeUnusedProps(props, 'children');

  return <button {...props}>{children}</button>;
};

export const Paragragh = (
  props: ViewComponentType<HTMLAttributes<HTMLParagraphElement>>
): someView => {
  const { children } = removeUnusedProps(props, 'children');

  return <p {...props}>{children || []}</p>;
};
