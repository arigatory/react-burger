import styles from './burger-bun.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerBun = ({ bun, type }) => {
  const topOrButtom =
    type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '';

  return (
    <div className={`${styles.bun}`}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={bun.name + topOrButtom}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );
};

BurgerBun.propTypes = {
    type: PropTypes.oneOf(['top', 'bottom']),
    bun: PropTypes.object,
};
export default BurgerBun;
