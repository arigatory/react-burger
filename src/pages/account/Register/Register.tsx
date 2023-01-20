import styles from './register.module.css';
import { Button } from '../../../app/components/yandex/dist';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './registerValidation';
import MyTextInput from '../../../app/components/my-text-input/MyTextInput';
import { useAppDispatch } from '../../../app/redux/configureStore';
import { loginUser } from '../../../app/redux/accountSlice';
import { router } from '../../../app/router/Routes';

export default function Register() {
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const { control, handleSubmit } = methods;
  const dispatch = useAppDispatch();
  async function submitForm(data: FieldValues) {
    try {
      //TODO: registerUser instead of login
      await dispatch(loginUser(data));
      router.navigate('/');
    } catch (error) {
      console.log('Login error:', error);
    }
  }

  return (
    <form className={styles.login} onSubmit={handleSubmit(submitForm)}>
      <p className={`text text_type_main-medium ${styles.header}`}>
        Регистрация
      </p>

      <MyTextInput
        control={control}
        name="name"
        label="Имя"
        styles={styles.input}
      />
      <MyTextInput
        control={control}
        name="email"
        label="E-mail"
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
        size="medium"
        extraClass={styles.button}
        htmlType={'button'}
        disabled={!methods.formState.isValid}
      >
        Зарегистрироваться
      </Button>

      <div>
        <span className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </span>
        <Button
          type="secondary"
          size="medium"
          onClick={() => {
            router.navigate('/login');
          }}
          htmlType={'button'}
        >
          Войти
        </Button>
      </div>
    </form>
  );
}
