import styles from './resetPassword.module.css';
import { useAppDispatch } from '../../../app/redux/configureStore';
import { Button } from '../../../app/components/yandex/dist';
import { FieldValues, useForm } from 'react-hook-form';
import { resetPassword } from '../../../app/redux/accountSlice';
import MyTextInput from '../../../app/components/my-text-input/MyTextInput';
import { validationSchema } from './resetPasswordValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from '../../../app/router/Routes';

export default function ResetPassword() {
  // const location = useLocation<any>();
  const dispatch = useAppDispatch();
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const { control, handleSubmit } = methods;

  async function submitForm(data: FieldValues) {
    dispatch(resetPassword(data));
    router.navigate('/login');
  }

  // if (location?.state?.from?.pathname !== '/forgot-password')
  //   return history.push('/forgot-password');

  return (
    <form className={styles.login} onSubmit={handleSubmit(submitForm)}>
      <p className={`text text_type_main-medium ${styles.header}`}>
        Восстановление пароля
      </p>

      <MyTextInput
        control={control}
        name="password"
        label="Введите новый пароль"
        styles={styles.input}
      />

      <MyTextInput
        control={control}
        name="token"
        label="Введите код из письма"
        styles={styles.input}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={styles.button}
        disabled={!methods.formState.isValid}
      >
        Сохранить
      </Button>

      <div>
        <span className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </span>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => router.navigate('/login')}
        >
          Войти
        </Button>
      </div>
    </form>
  );
}
