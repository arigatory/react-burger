import styles from './login.module.css';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Input } from '../../../app/components/yandex/dist';
import { Button } from '../../../app/components/yandex/dist';
import { useAppDispatch, useAppSelector } from '../../../app/redux/configureStore';
import { FieldValues, useForm } from 'react-hook-form';
import { loginUser } from '../../../app/redux/accountSlice';
import MyTextInput from '../../../app/components/my-text-input/MyTextInput';

export default function Login() {
  const { user } = useAppSelector((state) => state.account);
  const history = useHistory();
  const location = useLocation<any>();

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: 'onChange' });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(loginUser(data));
      history.push('/');
    } catch (error) {
      console.log("Login error:", error);
    }
  }

  if (user) return <Redirect to={location?.state?.from || '/'} />

  return (
    <form className={styles.login} onSubmit={handleSubmit(submitForm)}>
      <p className={`text text_type_main-medium ${styles.header}`}>Вход</p>
      {/* <MyTextInput
        {...register('email', { required: 'E-mail обязателен' })}
        label="Email"
      />

      <MyTextInput
        {...register('password', { required: 'Введите новый пароль' })}
        label="Password"
      /> */}

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
