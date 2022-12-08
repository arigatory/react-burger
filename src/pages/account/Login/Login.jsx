import styles from './login.module.css';
import { Redirect, useHistory } from 'react-router-dom';
import { Input } from '../../../app/components/yandex/dist';
import { Button } from '../../../app/components/yandex/dist';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { useForm } from 'react-hook-form';
import { loginUser } from '../accountSlice';

export default function Login() {
  const { user } = useAppSelector((state) => state.account);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: 'onChange' });

  async function submitForm(data) {
    try {
      await dispatch(loginUser(data));
      history.push('/');
    } catch (error) {
      console.log("Login error:", error);
    }
  }

  if (user) return <Redirect to='/' />

  return (
    <form className={styles.login} onSubmit={handleSubmit(submitForm)}>
      <p className={`text text_type_main-medium ${styles.header}`}>Вход</p>
      <Input
        {...register('email', { required: 'E-mail обязателен' })}
        error={!!errors.email}
        type={'text'}
        placeholder={'Укажите e-mail'}
        errorText={errors?.email?.message}
        size={'default'}
        extraClass={`${styles.input} ml-1`}
      />

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

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={styles.button}
        disabled={!isValid}
      >
        {isSubmitting ? 'Загрузка...' : 'Войти'}
      </Button>

      <div className={styles.line}>
        <span className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
        </span>
        <Button
          htmlType="button"
          onClick={() => history.push('/register')}
          type="secondary"
          size="medium"
        >
          Зарегистрироваться
        </Button>
      </div>
      <div>
        <span className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </span>
        <Button
          type="secondary"
          size="medium"
          htmlType="button"
          onClick={() => history.push('/forgot-password')}
        >
          Восстановить пароль
        </Button>
      </div>
    </form>
  );
}
