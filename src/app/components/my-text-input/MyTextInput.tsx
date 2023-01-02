import { UseControllerProps, useController } from 'react-hook-form';
import { Input } from '../yandex/dist';

interface Props extends UseControllerProps {
  label: string;
}

export default function MyTextInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });
  return (
    <Input
      {...props}
      {...field}
      error={!!fieldState.error}
      errorText={fieldState.error ? fieldState.error.message : ''}
    />
  );
}
