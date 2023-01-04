import styles from './forgotPassword.module.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../app/redux/configureStore';
import { FieldValues, useForm } from 'react-hook-form';
import { forgotPassword } from '../../../app/redux/accountSlice';
import { Input } from '../../../app/components/yandex/dist';
import { Button } from '../../../app/components/yandex/dist';
import { yupResolver } from '@hookform/resolvers/yup';
import MyTextInput from '../../../app/components/my-text-input/MyTextInput';
import { validationSchema } from './forgotPasswordValidation';

export default function ForgotPassword() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const { control, handleSubmit } = methods;

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(forgotPassword(data));
      history.push('/reset-password', { from: 'forgot-password' });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.login}>
      <p className={`text text_type_main-medium ${styles.header}`}>
        Восстановление пароля
      </p>
      <form method="post" onSubmit={handleSubmit(submitForm)}>
        <MyTextInput
          control={control}
          name="email"
          label="Email"
          styles={styles.input}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.button}
          disabled={!methods.formState.isValid}
        >
          {methods.formState.isSubmitting ? 'Загрузка...' : 'Восстановить'}
        </Button>
      </form>

      <div>
        <span className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </span>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => history.push('/login')}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}
