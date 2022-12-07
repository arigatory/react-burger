import styles from './forgotPassword.module.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/configureStore';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../accountSlice';
import { Input } from '../../../app/components/yandex/dist';
import { Button } from '../../../app/components/yandex/dist';

export default function ForgotPassword() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  async function submitForm(data) {
    await dispatch(forgotPassword(data));
    history.push('/reset-password');
  }

  return (
    <div className={styles.login}>
      <p className={`text text_type_main-medium ${styles.header}`}>
        Восстановление пароля
      </p>
      <form method="post" onSubmit={handleSubmit(submitForm)}>
        <Input
          {...register('email', { required: 'E-mail обязателен' })}
          error={!!errors.email}
          type={'text'}
          placeholder={'Укажите e-mail'}
          errorText={errors?.email?.message}
          size={'default'}
          extraClass={`${styles.input} ml-1`}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.button}
          disabled={!isValid}
        >
          {isSubmitting ? 'Загрузка...' : 'Восстановить'}
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
