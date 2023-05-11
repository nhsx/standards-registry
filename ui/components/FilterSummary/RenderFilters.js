import FilterWidget from './FilterWidget';
import styles from './FilterSummary.module.scss';
import RenderInConnector from './RenderInConnector';

const RenderFilters = ({
  chosenFilters,
  filterOrder,
  filtersSchema,
  removeFilter,
  schema,
  showConnector = false,
}) => {
  return filterOrder
    .filter((key) => schema.dataset_fields.find((f) => f.field_name === key))
    .map((key) => {
      let filters = chosenFilters[key];
      const settings = schema.dataset_fields.find((f) => f.field_name === key);
      if (!Array.isArray(filters)) {
        filters = [filters];
      }
      const isStandardType = settings.label.toLowerCase() === 'standard type';

      return (
        <div key={key}>
          {isStandardType ? <RenderInConnector /> : null}
          {filters.map((filter, index) => {
            const connector = (
              (index > 0 && filtersSchema[key] && filtersSchema[key].type) ||
              'and'
            ).toLowerCase();
            const label = settings.choices.find(
              (c) => c.value === filter
            ).label;
            return (
              <li key={index}>
                {showConnector && !isStandardType && (
                  <span className={styles.connector}>{connector}</span>
                )}
                {showConnector && isStandardType && index > 0 && (
                  <span className={styles.connector}>{connector}</span>
                )}
                {(showConnector = true)}
                <FilterWidget onClick={() => removeFilter(key, filter)}>
                  {label}
                </FilterWidget>
              </li>
            );
          })}
        </div>
      );
    });
};

export default RenderFilters;
