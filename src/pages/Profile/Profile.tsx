import styles from './profile.module.css';
import { useAppDispatch } from '../../app/redux/configureStore';
import { signOut } from '../../app/redux/accountSlice';
import { NavLink, Outlet } from 'react-router-dom';

export default function ResetPassword() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.left}>
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive
                ? 'text text_type_main-medium'
                : 'text text_type_main-medium text_color_inactive'
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive
                ? 'text text_type_main-medium'
                : 'text text_type_main-medium text_color_inactive'
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text text_type_main-medium'
                : 'text text_type_main-medium text_color_inactive'
            }
            onClick={() => dispatch(signOut())}
          >
            Выход
          </NavLink>
        </div>

        <div className={styles.right}>
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
