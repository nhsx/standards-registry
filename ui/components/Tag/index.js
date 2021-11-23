import classnames from 'classnames';
import styles from './style.module.scss';

export default function Tag({ children, classes }) {
  return (
    <span className={classnames('nhsuk-tag', styles.tag, styles[classes])}>
      {children}
    </span>
  );
}
