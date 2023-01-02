import styles from './nutrition-item.module.css';

interface Props {
  title: string;
  amount: number;
}

const NutritionItem = ({ title, amount }: Props) => {
  return (
    <li className={styles.li}>
      <p className="text text_type_main-default text_color_inactive">{title}</p>
      <p className={`text text_type_digits-default text_color_inactive`}>
        {amount}
      </p>
    </li>
  );
};

export default NutritionItem;
