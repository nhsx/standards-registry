import { Children } from 'react';
import styles from './style.module.scss';

export default function PanelList({ children }) {
  return (
    <ul className={styles.list}>
      {Children.map(children, (child, index) => (
        <li key={index} className={styles.item}>
          {child}
        </li>
      ))}
    </ul>
  );
}
