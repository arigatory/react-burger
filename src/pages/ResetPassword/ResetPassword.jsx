import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import styles from './resetPassword.module.css';
import { useHistory } from 'react-router-dom';

export default function ResetPassword() {
  const history = useHistory();
  const [newPassword, setNewPasswordValue] = useState('');
  const [code, setCode] = useState('');
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  return (
    <div className={styles.login}>
      <p className={`text text_type_main-medium ${styles.header}`}>
        Восстановление пароля
      </p>
      <Input
        type={'password'}
        placeholder="Введите новый пароль"
        onChange={(e) => setNewPasswordValue(e.target.value)}
        value={newPassword}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass={`${styles.input} ml-1`}
        icon={'ShowIcon'}
      />
      <Input
        type='text'
        extraClass={`${styles.input} ml-1`}
        placeholder='Введите код из письма'
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <Button
        htmlType='submit'
        type="primary" size="medium" extraClass={styles.button}>
        Сохранить
      </Button>

      <div>
        <span className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </span>
        <Button
          htmlType='button'
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
