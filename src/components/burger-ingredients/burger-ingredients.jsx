import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = () => {
  const { ref: refBun, inView: seeBun } = useInView({
    threshold: 0.2,
  });
  const { ref: refMain, inView: seeMain } = useInView({
    threshold: 0.2,
  });
  const { ref: refSauce, inView: seeSauce } = useInView({
    threshold: 0.2,
  });
  const { loadIngredients, closeIngredient } = useActions();
  const { ingredients, error, loading, currentIngredient } = useSelector(
    (state) => state.ingredients
  );

  const [current, setCurrent] = useState('bun');

  const buns = ingredients.buns;
  const mains = ingredients.mains;
  const sauses = ingredients.sauces;

  useEffect(() => {
    loadIngredients();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="text text_type_main-default mr-2">
      {currentIngredient && (
        <Modal onClose={closeIngredient}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      <h1 className="text_type_main-large">Соберите бургер</h1>

      <div className={styles.tabs}>
        <Tab
          value="bun"
          active={seeBun}
          onClick={setCurrent}
          className={styles.tab}
        >
          Булки
        </Tab>

        <Tab value="sauce" active={seeSauce} onClick={setCurrent}>
          Соусы
        </Tab>

        <Tab value="main" active={seeMain} onClick={setCurrent}>
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
