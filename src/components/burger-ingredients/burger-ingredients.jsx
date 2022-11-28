import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { closeIngredient, loadIngredientsAsync } from './ingredientsSlice';

const BurgerIngredients = () => {
  const { ingredientsLoaded, ingredients, error, loading, currentIngredient } =
    useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();

  const {
    ref: refBun,
    inView: seeBun,
    entry: entryBun,
  } = useInView({
    threshold: 0.5,
  });
  const {
    ref: refSauce,
    inView: seeSauce,
    entry: entrySauce,
  } = useInView({
    threshold: 0.8,
  });
  const {
    ref: refMain,
    inView: seeMain,
    entry: entryMain,
  } = useInView({
    threshold: 0.2,
  });

  const buns = ingredients.buns;
  const mains = ingredients.mains;
  const sauses = ingredients.sauces;

  useEffect(() => {
    if (!ingredientsLoaded) dispatch(loadIngredientsAsync());
    // eslint-disable-next-line
  }, [dispatch, ingredientsLoaded]);

  const onTabClick = (entry) => {
    entry.target.scrollIntoView({ behavior: 'smooth' });
  };

  if (!ingredientsLoaded)
    return <h1 className="text text_type_main-large pt-4">Загрузка...</h1>;

  return (
    <div className="text text_type_main-default mr-2">
      {currentIngredient && (
        <Modal onClose={() => dispatch(closeIngredient())}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      <h1 className="text_type_main-large">Соберите бургер</h1>

      <div className={styles.tabs}>
        <Tab active={seeBun} onClick={() => onTabClick(entryBun)}>
          Булки
        </Tab>

        <Tab active={seeSauce} onClick={() => onTabClick(entrySauce)}>
          Соусы
        </Tab>

        <Tab active={seeMain} onClick={() => onTabClick(entryMain)}>
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
