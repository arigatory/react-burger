import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import styles from './register.module.css';
import { useHistory } from 'react-router-dom';

export default function Register() {
  const history = useHistory();
  const [value, setValue] = useState('value');
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  return (
    <div className={styles.login}>
      <p className={`text text_type_main-medium ${styles.header}`}>
        Регистрация
      </p>
      <Input
        type={'text'}
        placeholder="Имя"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name="name"
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass={`${styles.input} ml-1`}
      />

      <Input
        type="email"
        placeholder="E-mail"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name="password"
        error={false}
        ref={inputRef}
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
        name="password"
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass={`${styles.input} ml-1`}
      />

      <Button type="primary" size="medium" extraClass={styles.button}>
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
            history.push('/login');
          }}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}
