import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={`${styles.header}`}>
            <a href="#">

                <div className={styles.navItem}>
                    <span className={`${styles.constructorIcon}`}>
                        <BurgerIcon />
                    </span>
                    <span className={`${styles.navItemText}  text_type_main-default ${styles.active}`}>
                        Конструктор
                    </span>
                </div>
            </a>

            <a href="#">
                <div className={styles.navItem}>
                    <span className={`${styles.constructorIcon}`}>
                        <ListIcon type="secondary" />
                    </span>
                    <span className={`text text_color_inactive text_type_main-default`}>
                        Лента заказов
                    </span>
                </div>
            </a>


            <div className={styles.logo}>
                <Logo />
            </div>

            <a href="#">
                <div className={styles.navItem}>
                    <span className={`${styles.constructorIcon}`}>
                        <ProfileIcon type="secondary" />
                    </span>
                    <span className={`text text_color_inactive text_type_main-default`}>
                        Личный кабинет
                    </span>
                </div>
            </a>

        </header>
    );
};

export default AppHeader;


