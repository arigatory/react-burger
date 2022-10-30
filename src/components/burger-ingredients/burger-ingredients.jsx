import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = () => {
  const { ref: refBun, inView: seeBun, entry: entryBun } = useInView({
    threshold: 0.2,
  });
  const { ref: refMain, inView: seeMain, entry: entryMain } = useInView({
    threshold: 0.2,
  });
  const { ref: refSauce, inView: seeSauce, entry: entrySauce } = useInView({
    threshold: 0.2,
  });
  const { loadIngredients, closeIngredient } = useActions();
  const { ingredients, error, loading, currentIngredient } = useSelector(
    (state) => state.ingredients
  );

  const buns = ingredients.buns;
  const mains = ingredients.mains;
  const sauses = ingredients.sauces;

  useEffect(() => {
    loadIngredients();
    // eslint-disable-next-line
  }, []);

  const onTabClick = (entry) => {
    entry.target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="text text_type_main-default mr-2">
      {currentIngredient && (
        <Modal onClose={closeIngredient}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      <h1 className="text_type_main-large">Соберите бургер</h1>

      <div className={styles.tabs}>
        <Tab active={seeBun} onClick={()=> onTabClick(entryBun)}>
          Булки
        </Tab>

        <Tab active={seeSauce} onClick={()=> onTabClick(entrySauce)}>
          Соусы
        </Tab>

        <Tab active={seeMain} onClick={()=> onTabClick(entryMain)}>
          Начинки
        </Tab>
      </div>
      {error && <h3>{error}</h3>}
      {loading && <h3>Загрузка ингредиентов...</h3>}
      {!error && !loading && (
        <div className={styles.categories}>
          <div ref={refBun}>
            <BurgerIngredientCategory
              title={'Булки'}
              id="bun"
              ingredients={buns}
            />
          </div>

          <div ref={refSauce}>
            <BurgerIngredientCategory
              title={'Соусы'}
              id="sauce"
              ingredients={sauses}
            />
          </div>

          <div ref={refMain}>
            <BurgerIngredientCategory
              title={'Начинки'}
              id="main"
              ingredients={mains}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerIngredients;
