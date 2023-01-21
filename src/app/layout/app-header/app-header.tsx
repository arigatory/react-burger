import styles from './app-header.module.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '../../components/yandex/dist';
import { useAppSelector } from '../../redux/configureStore';

const AppHeader = () => {
  const location = useLocation();
  const { profile } = useAppSelector((state: any) => state.account);

  const getNavLinkClass = (path: string) => {
    return location.pathname === path ? '' : 'text_color_inactive';
  };

  const getNavLinkType = (path: string) => {
    return location.pathname === path ? 'primary' : 'secondary';
  };

  return (
    <header className={`${styles.header}`}>
      <NavLink
        to="constructor"
        end
        className={({ isActive }) =>
          isActive ? styles.active : styles.navItem
        }
      >
        <span className={`${styles.constructorIcon}`}>
          <BurgerIcon type={getNavLinkType('/constructor')} />
        </span>
        <span
          className={`${styles.navItemText}  ${getNavLinkClass(
            '/constructor'
          )} text_type_main-default`}
        >
          Конструктор
        </span>
      </NavLink>

      <NavLink
        to="feed"
        end
        className={({ isActive }) =>
          isActive ? styles.active : styles.navItem
        }
      >
        <span className={`${styles.constructorIcon}`}>
          <ListIcon type={getNavLinkType('/feed')} />
        </span>
        <span
          className={`text text_type_main-default ${getNavLinkClass('/feed')}`}
        >
          Лента заказов
        </span>
      </NavLink>

      <div className={styles.logo}>
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <NavLink
        end
        to="/profile"
        className={({ isActive }) =>
          isActive ? styles.active : styles.navItem
        }
      >
        <span className={`${styles.constructorIcon}`}>
          <ProfileIcon type={getNavLinkType('/profile')} />
        </span>
        <span
          className={`text  ${getNavLinkClass(
            '/profile'
          )} text_type_main-default`}
        >
          {profile ? `${profile.name}` : 'Личный кабинет'}
        </span>
      </NavLink>
    </header>
  );
};

export default AppHeader;
