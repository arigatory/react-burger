import { useState, useRef } from 'react';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';
import { Input } from '../../../app/components/yandex/dist';
import { Button } from '../../../app/components/yandex/dist';

export default function Login() {
  const history = useHistory();
  const [value, setValue] = useState('value');
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  return (
    <div className={styles.login}>
      <p className={`text text_type_main-medium ${styles.header}`}>Вход</p>
      <Input
        type={'text'}
        placeholder={'E-mail'}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass={`${styles.input} ml-1`}
      />

      <Input
        type={'password'}
        placeholder={'Пароль'}
        onChange={(e) => setValue(e.target.value)}
        icon={'ShowIcon'}
        value={value}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass={`${styles.input} ml-1`}
      />

      <Button type="primary" size="medium" extraClass={styles.button}>
        Войти
      </Button>
      <div className={styles.line}>
        <span className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
        </span>
        <Button
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
          onClick={() => history.push('/forgot-password')}
        >
          Восстановить пароль
        </Button>
      </div>
    </div>
  );
}
