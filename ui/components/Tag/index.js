import classnames from 'classnames';
import styles from './style.module.scss';

export default function Tag({ children }) {
  return <span className={classnames('nhsuk-tag', styles.tag)}>{ children }</span>
}
