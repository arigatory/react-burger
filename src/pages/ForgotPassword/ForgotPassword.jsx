import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import styles from './forgotPassword.module.css';
import { useHistory } from 'react-router-dom';

export default function ForgotPassword() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    setEmail("");
    history.push('/reset-password');
  };

  return (
    <div className={styles.login}>
      <p className={`text text_type_main-medium ${styles.header}`}>
        Восстановление пароля
      </p>
      <form method="post" onSubmit={onSubmit}>
        <Input
          type={'text'}
          placeholder={'Укажите e-mail'}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={`${styles.input} ml-1`}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.button}
        >
          Восстановить
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
