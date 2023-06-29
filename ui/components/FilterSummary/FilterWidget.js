import styles from './FilterSummary.module.scss';

function FilterWidget({ children, onClick }) {
  return (
    <button
      type="button"
      aria-label={`X, click to remove ${children}`}
      onClick={onClick}
      className={styles.widget}
    >
      X {children}
    </button>
  );
}

export default FilterWidget;
