import classnames from 'classnames';
import { Button } from '../';
import styles from './style.module.scss';

export default function Search({ placeholder, button }) {
  return (
    <form className="nhsuk-search">
      <label className="nhsuk-label">Search</label>
      <input type="text" className={classnames('nhsuk-input', styles.input)} placeholder={placeholder} />
      <button className={classnames('nhsuk-search__submit', styles.button)}>
        <svg className="nhsuk-icon nhsuk-icon__search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
        </svg>
      </button>
    </form>
  );
}
