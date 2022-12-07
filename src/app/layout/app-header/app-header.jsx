import styles from './app-header.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '../../components/yandex/dist';

const AppHeader = () => {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? '' : 'text_color_inactive';
  };

  const getNavLinkType = (path) => {
    return location.pathname === path ? 'primary' : 'secondary';
  };

  return (
    <header className={`${styles.header}`}>
      <NavLink
        exact
        to="/"
        activeClassName={styles.active}
        className={styles.navItem}
      >
        <span className={`${styles.constructorIcon}`}>
          <BurgerIcon type={getNavLinkType('/')} />
        </span>
        <span
          className={`${styles.navItemText}  ${getNavLinkClass(
            '/'
          )}  text_type_main-default`}
        >
          Конструктор
        </span>
      </NavLink>

      <NavLink
        exact
        to="/orders"
        activeClassName={styles.active}
        className={styles.navItem}
      >
        <span className={`${styles.constructorIcon}`}>
          <ListIcon type={getNavLinkType('/orders')} />
        </span>
        <span
          className={`text text_type_main-default ${getNavLinkClass(
            '/orders'
          )}`}
        >
          Лента заказов
        </span>
      </NavLink>

      <div className={styles.logo}>
        <Logo />
      </div>

      <NavLink
        exact
        to="/profile"
        activeClassName={styles.active}
        className={styles.navItem}
      >
        <span className={`${styles.constructorIcon}`}>
          <ProfileIcon type={getNavLinkType('/profile')} />
        </span>
        <span
          className={`text  ${getNavLinkClass(
            '/profile'
          )} text_type_main-default`}
        >
          Личный кабинет
        </span>
      </NavLink>
    </header>
  );
};

export default AppHeader;
