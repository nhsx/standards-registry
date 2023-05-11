import { useQueryContext } from '../../context/query';
import omit from 'lodash/omit';
import without from 'lodash/without';
import size from 'lodash/size';
import { default as filtersSchema } from '../../schema/filters';
import RenderFilters from './RenderFilters';
import arrayShift from '../../helpers/arrayShift';

import styles from './FilterSummary.module.scss';

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
    'mandated',
    'is_published_standard'
  );

  if (!size(chosenFilters)) {
    return null;
  }

  const filterOrder = Object.keys(chosenFilters);
  if (filterOrder.length > 0) {
    arrayShift(filterOrder, 'standard_category', 'end');
  }

  let showConnector = false;

  return (
    <div className={styles.filterSummary}>
      <ul className={styles.filterSection}>
        <RenderFilters
          chosenFilters={chosenFilters}
          filterOrder={filterOrder}
          filtersSchema={filtersSchema}
          removeFilter={removeFilter}
          schema={schema}
          showConnector={showConnector}
        />
      </ul>
    </div>
  );
}
