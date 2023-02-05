import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppSelector } from '../../app/redux/configureStore';
import { validationSchema } from './inputValidation';
import MyTextInput from '../../app/components/my-text-input/MyTextInput';

export default function About() {
  const { profile: user } = useAppSelector((state) => state.account);
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const { control, handleSubmit } = methods;

  async function submitForm(data: FieldValues) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <MyTextInput
        control={control}
        name="name"
        label="Имя"
        value={user?.name}
        styles="mb-6"
      />

      <MyTextInput
        control={control}
        name="login"
        label="Логин"
        styles="mb-6"
        value={user?.email}
      />
      <MyTextInput
        control={control}
        name="password"
        label="Пароль"
        styles="mb-6"
        type="password"
        value={user?.email}
      />
    </form>
  );
}
