import styles from './resetPassword.module.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/configureStore';
import { Button, Input } from '../../../app/components/yandex/dist';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../accountSlice';

export default function ResetPassword() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  async function submitForm(data) {
    dispatch(resetPassword(data));
    history.push('/login');
  }

  if (history?.location?.state?.from !== 'forgot-password')
    return history.push('/forgot-password');

  return (
    <form className={styles.login} onSubmit={handleSubmit(submitForm)}>
      <p className={`text text_type_main-medium ${styles.header}`}>
        Восстановление пароля
      </p>
      <Input
        {...register('password', { required: 'Введите новый пароль' })}
        error={!!errors.password}
        errorText={errors?.password?.message}
        type="password"
        placeholder="Введите новый пароль"
        size={'default'}
        extraClass={`${styles.input} ml-1`}
        icon={'ShowIcon'}
      />
      <Input
        {...register('token', { required: 'Введите код из email' })}
        error={!!errors.token}
        errorText={errors?.token?.message}
        type="text"
        extraClass={`${styles.input} ml-1`}
        placeholder="Введите код из письма"
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={styles.button}
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
          onClick={() => history.push('/login')}
        >
          Войти
        </Button>
      </div>
    </form>
  );
}
