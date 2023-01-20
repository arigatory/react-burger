import styles from './profile.module.css';
import { useAppDispatch } from '../../app/redux/configureStore';
import { useForm } from 'react-hook-form';
import { signOut } from '../../app/redux/accountSlice';
import { router } from '../../app/router/Routes';
import { Link, Route, Routes } from 'react-router-dom';
import About from './About';
import History from './History';

export default function ResetPassword() {
  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm({
    mode: 'onChange',
  });

  async function submitForm() {
    router.navigate('/login');
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.left}>
          <Link to="about" className="text text_type_main-medium">
            Профиль
          </Link>
          <Link to="history" className="text text_type_main-medium">
            История заказов
          </Link>
          <Link
            to="/"
            className="text text_type_main-medium"
            onClick={() => dispatch(signOut())}
          >
            Выход
          </Link>

          
        </div>

        <div className={styles.right}>
          <Routes>
            <Route path="about" element={<About />} />
            <Route path="history" element={<History />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
