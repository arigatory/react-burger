import PropTypes from 'prop-types';
import styles from './nutrition-item.module.css';

const NutritionItem = ({ title, amount }) => {
  return (
    <li className={styles.li}>
      <p className="text text_type_main-default text_color_inactive">{title}</p>
      <p className={`text text_type_digits-default text_color_inactive`}>
        {amount}
      </p>
    </li>
  );
};

NutritionItem.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default NutritionItem;
