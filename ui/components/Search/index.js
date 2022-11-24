import { useState } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useQueryContext } from '../../context/query';
import styles from './style.module.scss';

export default function Search({
  placeholder,
  label = true,
  labelText = 'Search published standards',
  location = null,
  navigate = null,
  homepage,
}) {
  const router = useRouter();
  const { query, updateQuery } = useQueryContext();
  const [value, setValue] = useState(query.q);

  function toggleSearch() {
    const el = document.querySelector('#wrap-search');
    if (Array.from(el.classList).includes('js-show')) {
      el.classList.remove('js-show');
    } else {
      el.classList.add('js-show');
    }
  }

  function onFormSubmit(e) {
    e.preventDefault();
    delete query.page; // remove page depth from query when submitting a new search
    if (navigate || location === 'nav') {
      router.push(`/search-results?q=${value || ''}`);
    } else {
      updateQuery({ ...query, q: value });
    }
    return false;
  }

  return (
    <div
      className={classnames('nhsuk-header__search', styles.search, {
        [styles['full-width']]: location !== 'nav',
      })}
    >
      {location === 'nav' && (
        <button
          className="nhsuk-header__search-toggle"
          id="toggle-search"
          aria-controls="search"
          aria-label="Open search"
          onClick={toggleSearch}
        >
          <svg
            className="nhsuk-icon nhsuk-icon__search"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            width="27"
            height="27"
          >
            <path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
          </svg>
          <span className="nhsuk-u-visually-hidden">Search</span>
        </button>
      )}

      <div className="nhsuk-header__search-wrap" id="wrap-search">
        <form
          className={classnames('nhsuk-header__search-form', {
            'nhsuk-header__search-form--search-results': location !== 'nav',
          })}
          id="search"
          onSubmit={onFormSubmit}
          role="search"
        >
          {label && (
            <label className="nhsuk-u-visually-hidden" htmlFor="search-field">
              {labelText}
            </label>
          )}

          <input
            className={classnames('nhsuk-search__input', { homepage })}
            id="search-field"
            name="q"
            type="search"
            placeholder={placeholder}
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className={classnames('nhsuk-search__submit', { green: !homepage })}
            type="submit"
          >
            <svg
              className="nhsuk-icon nhsuk-icon__search"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              width="27"
              height="27"
            >
              <path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
            </svg>
            <span className="nhsuk-u-visually-hidden">Search</span>
          </button>
          <button
            className="nhsuk-search__close"
            id="close-search"
            type="submit"
          >
            <svg
              className="nhsuk-icon nhsuk-icon__close"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              width="27"
              height="27"
            >
              <path d="M13.41 12l5.3-5.29a1 1 0 1 0-1.42-1.42L12 10.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"></path>
            </svg>
            <span className="nhsuk-u-visually-hidden">Close search</span>
          </button>
        </form>
      </div>
    </div>
  );
}
