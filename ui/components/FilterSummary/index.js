import { useQueryContext } from '../../context/query';
import omit from 'lodash/omit';
import without from 'lodash/without';
import size from 'lodash/size';

import styles from './FilterSummary.module.scss';

function Widget({ children, onClick }) {
  return (
    <button
      aria-label={`X, click to remove ${children}`}
      onClick={onClick}
      className={styles.widget}
    >
      X {children}
    </button>
  );
}

export function FilterSummary({ schema }) {
  const { query, updateQuery } = useQueryContext();

  function removeFilter(key, value) {
    const newQuery = {
      ...query,
      [key]: without(query[key], value),
    };
    updateQuery(newQuery);
  }

  const chosenFilters = omit(query, 'q', 'page', 'sort', 'mandated');

  if (!size(chosenFilters)) {
    return null;
  }
  const { standard_category } = chosenFilters;
  // trick to resort category to be last,
  // TODO: better sorting needed
  const activeFilters = standard_category
    ? { ...chosenFilters, standard_category }
    : chosenFilters;

  let showAnd = false;

  return (
    <div className={styles.filterSummary}>
      <ul className={styles.filterSection}>
        {Object.keys(activeFilters).map((key, index) => {
          let filters = activeFilters[key];
          const settings = schema.dataset_fields.find(
            (f) => f.field_name === key
          );
          if (!Array.isArray(filters)) {
            filters = [filters];
          }
          const isType = settings.label.toLowerCase() === 'standard type';
          return (
            <>
              {isType && index >= 1 ? <h4>In</h4> : null}
              {filters.map((filter, i) => {
                return (
                  <li key={i}>
                    {showAnd && !isType && (
                      <span className={styles.and}>and</span>
                    )}
                    {(showAnd = true)}
                    <Widget onClick={() => removeFilter(key, filter)}>
                      {filter}
                    </Widget>
                  </li>
                );
              })}
            </>
          );
        })}
      </ul>
    </div>
  );
}
