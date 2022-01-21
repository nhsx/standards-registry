import classnames from 'classnames';
import styles from './style.module.scss';

export default function Flex({ children, className }) {
  return (
    <div
      className={classnames(
        'nhsuk-flex',
        styles.flex,
        className,
        styles.noBottom
      )}
    >
      {children}
    </div>
  );
}
