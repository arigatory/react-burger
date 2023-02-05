import styles from './profile.module.css';
import { useAppDispatch } from '../../app/redux/configureStore';
import { useForm } from 'react-hook-form';
import { signOut } from '../../app/redux/accountSlice';
import { Link, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import About from './About';
import History from './History';

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
