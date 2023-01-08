import styles from './login.module.css';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../../app/components/yandex/dist';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../app/redux/configureStore';
import { FieldValues, useForm } from 'react-hook-form';
import { loginUser } from '../../../app/redux/accountSlice';
import MyTextInput from '../../../app/components/my-text-input/MyTextInput';
import { validationSchema } from './loginValidation';

export default function Login() {
  const { user } = useAppSelector((state) => state.account);
  const history = useHistory();
  const location = useLocation<any>();
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const { control, handleSubmit } = methods;

  const dispatch = useAppDispatch();

  async function submitForm(data: FieldValues) {
    console.log(data);
      await dispatch(loginUser(data));
      history.push('/');
  }

  if (user) return <Redirect to={location?.state?.from || '/'} />;

  return (
    <form className={styles.login} onSubmit={handleSubmit(submitForm)}>
      <p className={`text text_type_main-medium ${styles.header}`}>Вход</p>

      <MyTextInput
        control={control}
        name="email"
        label="Email"
        styles={styles.input}
      />
      <MyTextInput
        control={control}
        name="password"
        label="Пароль"
        styles={styles.input}
        type="password"
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={styles.button}
        disabled={!methods.formState.isValid}
      >
        {methods.formState.isSubmitting ? 'Загрузка...' : 'Войти'}
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
