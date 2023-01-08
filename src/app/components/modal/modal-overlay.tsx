import styles from './modal-overlay.module.css';

interface Props {
  onClick: () => void;
}

const ModalOverlay = ({ onClick }: Props) => {
  return <div className={styles.overlay} onClick={onClick} />;
};

export default ModalOverlay;
