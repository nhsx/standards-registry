import { useState } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useQueryContext } from '../../context/query';
import styles from './style.module.scss';

const SearchIcon = () => (
  <svg
    className={classnames(
      'nhsuk-icon nhsuk-icon__search nhsuk-u-font-size-16',
      styles.icon
    )}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      role="img"
      alt="magnifying glass"
      d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"
    ></path>
  </svg>
);

const SearchButton = ({ style, children }) => (
  <button
    aria-label="search button"
    className={classnames('nhsuk-search__submit', style)}
  >
    {children}
  </button>
);

export default function Search({
  placeholder,
  label = true,
  labelText = 'Search current standards',
  location = null,
  navigate = null,
}) {
  const router = useRouter();
  const { query, updateQuery } = useQueryContext();
  const [value, setValue] = useState(query.q);

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
      className={classnames(
        'nhsuk-form-group',
        location === 'nav' && styles.searchFormInNavWrapper
      )}
    >
      <form
        className={classnames(
          'nhsuk-search',
          styles.search,
          location === 'nav' && styles.searchInNav
        )}
        method="GET"
        action="/search-results"
        onSubmit={onFormSubmit}
      >
        <label
          className={classnames(
            'nhsuk-label',
            styles.searchLabel,
            location === 'nav' && styles.labelInNav
          )}
        >
          {label && labelText}
          <input
            type="text"
            className={classnames(
              'nhsuk-input',
              location === 'browse' ? styles.inputBrowse : styles.input
            )}
            placeholder={placeholder}
            name="q"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>

        {location === 'nav' ? (
          <SearchButton style={styles.button}>
            <SearchIcon />
          </SearchButton>
        ) : (
          <SearchButton style={styles.buttonText}>Search</SearchButton>
        )}
      </form>
    </div>
  );
}
