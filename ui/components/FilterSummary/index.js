import { useQueryContext } from '../../context/query';
import omit from 'lodash/omit';
import without from 'lodash/without';
import size from 'lodash/size';
import { default as filtersSchema } from '../../schema/filters';

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

  const chosenFilters = omit(
    query,
    'q',
    'page',
    'orderBy',
    'order',
    'mandated'
  );

  if (!size(chosenFilters)) {
    return null;
  }
  const { standard_category } = chosenFilters;
  // trick to resort category to be last,
  // TODO: better sorting needed
  const activeFilters = standard_category
    ? { ...chosenFilters, standard_category }
    : chosenFilters;

  let showConnector = false;

  return (
    <div className={styles.filterSummary}>
      <ul className={styles.filterSection}>
        {Object.keys(activeFilters)
          .filter((key) =>
            schema.dataset_fields.find((f) => f.field_name === key)
          )
          .map((key, index) => {
            let filters = activeFilters[key];
            const settings = schema.dataset_fields.find(
              (f) => f.field_name === key
            );
            if (!Array.isArray(filters)) {
              filters = [filters];
            }
            const isType = settings.label.toLowerCase() === 'standard type';
            return (
              <div key={key}>
                {isType && index >= 1 ? (
                  <h4>
                    <span className="nhsuk-u-visually-hidden">
                      The filters selected are inside this type
                    </span>
                    In
                  </h4>
                ) : null}
                {filters.map((filter, i) => {
                  const connector = (
                    (i > 0 && filtersSchema[key] && filtersSchema[key].type) ||
                    'and'
                  ).toLowerCase();
                  const label = settings.choices.find(
                    (c) => c.value === filter
                  ).label;
                  return (
                    <li key={i}>
                      {showConnector && !isType && (
                        <span className={styles.connector}>{connector}</span>
                      )}
                      {(showConnector = true)}
                      <Widget onClick={() => removeFilter(key, filter)}>
                        {label}
                      </Widget>
                    </li>
                  );
                })}
              </div>
            );
          })}
      </ul>
    </div>
  );
}
