import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={`${styles.header}`}>
            <div className={styles.navItem}>
                <span className={`${styles.constructorIcon}`}>
                    <BurgerIcon />
                </span>
                <span className={`${styles.navItemText}  text_type_main-default ${styles.active}`}>
                    Конструктор
                </span>
            </div>

            <div className={styles.navItem}>
                <span className={`${styles.constructorIcon}`}>
                    <ListIcon type="secondary" />
                </span>
                <span className={`text text_color_inactive text_type_main-default`}>
                    Лента заказов
                </span>
            </div>

            <div className={styles.logo}>
                <Logo />
            </div>

            <div className={styles.navItem}>
                <span className={`${styles.constructorIcon}`}>
                    <ProfileIcon type="secondary" />
                </span>
                <span className={`text text_color_inactive text_type_main-default`}>
                    Личный кабинет
                </span>
            </div>

            <span className="text text_type_main-default"></span>
        </header>
    );
};

export default AppHeader;


