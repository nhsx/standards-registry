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

  return (
    <div className={styles.filterSummary}>
      {Object.keys(activeFilters).map((key, index) => {
        let filters = activeFilters[key];
        const settings = schema.dataset_fields.find(
          (f) => f.field_name === key
        );
        if (!Array.isArray(filters)) {
          filters = [filters];
        }
        return (
          <div key={key} className={styles.filterSection}>
            {settings.label.toLowerCase() === 'type' && index >= 1 ? (
              <h4>In</h4>
            ) : null}
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
