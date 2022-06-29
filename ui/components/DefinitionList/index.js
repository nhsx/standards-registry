import styles from './style.module.scss';

export function Dl({ children }) {
  return <dl className={styles.dl}>{ children }</dl>
}

export function Dt({ children, ...props }) {
  return <dt className={styles.dt} {...props}>{ children }</dt>
}

export function Dd({ children, ...props }) {
  return <dd className={styles.dd} {...props}>{ children }</dd>
}