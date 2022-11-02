import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";

const BurgerConstructorList = ({ ingredients }) => {
  return (
    <>
      {ingredients &&
        ingredients.length > 0 &&
        ingredients.map((item, index) => {
          return (
            <BurgerConstructorItem
              key={item.dragId}
              name={item.name}
              image={item.image}
              price={item.price}
              index={index}
              id={item._id}
            />
          );
        })}
    </>
  );
};

export default BurgerConstructorList;