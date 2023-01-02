import styles from './burger-bun.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement } from '../../../app/components/yandex/dist';
import { Bun } from '../../../app/models/bun';

interface Props {
  bun: Bun;
  type: 'top' | 'bottom';  
}

const BurgerBun = ({ bun, type }: Props) => {
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
