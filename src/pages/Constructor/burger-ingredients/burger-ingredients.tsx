import { useInView } from 'react-intersection-observer';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import styles from './burger-ingredients.module.css';
import { useAppSelector } from '../../../app/redux/configureStore';
import { Tab } from '../../../app/components/yandex/dist';
import { ingredientsSelectors } from '../../../app/redux/ingredientsSlice';

const BurgerIngredients = () => {
  const ingredients = useAppSelector(ingredientsSelectors.selectAll);
  const { ingredientsLoaded } = useAppSelector((state) => state.ingredients);
  const { loading } = useAppSelector((state) => state.burgerConstructor);

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

  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauses = ingredients.filter((item) => item.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');

  const onTabClick = (entry: IntersectionObserverEntry | null = null) => {
    entry?.target.scrollIntoView({ behavior: 'smooth' });
  };

  if (!ingredientsLoaded)
    return <h1 className="text text_type_main-large pt-4">Загрузка...</h1>;

  return (
    <div className="text text_type_main-default mr-2">
      <h1 className="text_type_main-large">Соберите бургер</h1>

      <div className={styles.tabs}>
        <Tab value="bun" active={seeBun} onClick={() => onTabClick(entryBun)}>
          Булки
        </Tab>

        <Tab
          value="sauce"
          active={seeSauce}
          onClick={() => onTabClick(entrySauce)}
        >
          Соусы
        </Tab>

        <Tab
          value="main"
          active={seeMain}
          onClick={() => onTabClick(entryMain)}
        >
          Начинки
        </Tab>
      </div>
      {loading && <h3>Загрузка ингредиентов...</h3>}
      {!loading && (
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
