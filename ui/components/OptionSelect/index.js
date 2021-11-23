import classnames from 'classnames';
import styles from './styles.module.scss';

export default function OptionSelect({ children }) {
  return (
    <div className={classnames('option-select', styles.optionSelect)}>
      {children}
    </div>
  );
}
