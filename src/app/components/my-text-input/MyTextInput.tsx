import { UseControllerProps, useController } from 'react-hook-form';
import { Input } from '../yandex/dist';

interface Props extends UseControllerProps {
  label: string;
  styles?: string;
  type?: "text" | "email" | "password";
  value?: string
}

export default function MyTextInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: props.value || '' });
  return (
    <Input
      type={props.type || 'text'}
      placeholder={props.label}
      extraClass={props.styles || ''}
      {...props}
      {...field}
      error={!!fieldState.error}
      errorText={fieldState.error ? fieldState.error.message : ''}
    />
  );
}
