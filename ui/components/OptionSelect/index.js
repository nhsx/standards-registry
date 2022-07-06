import classnames from 'classnames';
import styles from './styles.module.scss';

export default function OptionSelect({ children, fullHeight }) {
  return (
    <div className={classnames('option-select', styles.optionSelect, { [styles.fullHeight]: fullHeight } )}>
      {children}
    </div>
  );
}
