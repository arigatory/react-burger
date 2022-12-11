import styles from './profile.module.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/redux/configureStore';
import { Input } from '../../app/components/yandex/dist';
import { useForm } from 'react-hook-form';
import { signOut } from '../../app/redux/accountSlice';

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
    history.push('/login');
  }

  return (
    <form className={styles.profile} onSubmit={handleSubmit(submitForm)}>
      <div className={styles.row}>
        <span className="text text_type_main-medium">Профиль</span>
        <Input
          {...register('name', { required: 'Введите имя' })}
          error={!!errors.name}
          errorText={errors?.name?.message}
          type="text"
          placeholder="Имя"
          size={'default'}
          extraClass={`${styles.input} ml-1`}
          icon={'EditIcon'}
        />
      </div>

      <div className={styles.row}>
        <span className="text text_type_main-medium text_color_inactive">
          История заказов
        </span>
        <Input
          {...register('login', { required: 'Введите логин' })}
          error={!!errors.login}
          errorText={errors?.login?.message}
          type="text"
          extraClass={`${styles.input} ml-1`}
          placeholder="Логин"
          icon={'EditIcon'}
        />
      </div>

      <div className={styles.row}>
        <span
          onClick={() => dispatch(signOut())}
          className={`${styles.logOut} text text_type_main-medium text_color_inactive`}
        >
          Выход
        </span>
        <Input
          {...register('password', { required: 'Введите пароль' })}
          error={!!errors.password}
          errorText={errors?.password?.message}
          type="password"
          extraClass={`${styles.input} ml-1`}
          placeholder="Пароль"
          icon={'EditIcon'}
        />
      </div>

      <div>
        <span className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
    </form>
  );
}
