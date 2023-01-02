import styles from './profile.module.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/redux/configureStore';
import { Input } from '../../app/components/yandex/dist';
import { useForm } from 'react-hook-form';
import { signOut } from '../../app/redux/accountSlice';
import MyTextInput from '../../app/components/my-text-input/MyTextInput';

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

  async function submitForm() {
    history.push('/login');
  }

  return (
    <form className={styles.profile} onSubmit={handleSubmit(submitForm)}>
      <div className={styles.row}>
        <span className="text text_type_main-medium">Профиль</span>
        {/* <MyTextInput
          label="Введите имя"
          {...register('name', { required: 'Введите имя' })}
        /> */}
      </div>

      <div className={styles.row}>
        <span className="text text_type_main-medium text_color_inactive">
          История заказов
        </span>
        {/* <MyTextInput
          label="Введите логин"
          {...register('login', { required: 'Введите логин' })}
        /> */}
      </div>

      <div className={styles.row}>
        <span
          onClick={() => dispatch(signOut())}
          className={`${styles.logOut} text text_type_main-medium text_color_inactive`}
        >
          Выход
        </span>
        {/* <MyTextInput
          label="Введите логин"
          {...register('password', { required: 'Введите пароль' })}
        /> */}
      </div>

      <div>
        <span className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
    </form>
  );
}
