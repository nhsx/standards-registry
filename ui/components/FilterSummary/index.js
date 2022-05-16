import { useQueryContext } from '../../context/query';
import omit from 'lodash/omit';
import without from 'lodash/without';
import size from 'lodash/size';

import styles from './FilterSummary.module.scss';

function Widget({ children, onClick }) {
  return (
    <div onClick={onClick} className={styles.widget}>
      X {children}
    </div>
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

  const activeFilters = omit(query, 'q', 'page', 'sort');

  if (!size(activeFilters)) {
    return null;
  }

  return (
    <div className={styles.filterSummary}>
      {Object.keys(activeFilters)
        .filter((key) => key !== 'mandated') // don't show mandated widget
        .map((key, index) => {
          let filters = activeFilters[key];
          const settings = schema.dataset_fields.find(
            (f) => f.field_name === key
          );
          if (!Array.isArray(filters)) {
            filters = [filters];
          }
          return (
            <div key={key} className={styles.filterSection}>
              <h4>
                {index > 0 && 'and '}
                {settings.label}
              </h4>
              {filters.map((filter, i) => {
                return (
                  <span key={i}>
                    {i > 0 && <span className={styles.and}>and</span>}
                    <Widget onClick={() => removeFilter(key, filter)}>
                      {filter}
                    </Widget>
                  </span>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
