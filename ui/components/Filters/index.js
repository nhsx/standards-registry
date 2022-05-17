import { useState, useEffect } from 'react';
import { useQueryContext } from '../../context/query';
import omit from 'lodash/omit';
import { CheckboxGroup, OptionSelect, Expander, Select } from '../';

import styles from './Filters.module.scss';

function Filter({
  label,
  choices,
  onChange,
  field_name: fieldName,
  open,
  useSelect,
  numActive = 0,
}) {
  const { query, updateQuery } = useQueryContext();
  const summary = (
    <p className={styles.filterHeader}>
      {label}

      {!useSelect && <span>{numActive} selected</span>}
    </p>
  );

  function onSelectChange(val) {
    updateQuery({ ...query, [fieldName]: val || [] });
  }

  return useSelect ? (
    <>
      {summary}
      <Select
        options={choices}
        onChange={onSelectChange}
        showAll={true}
        value={query[fieldName] || ''}
      />
    </>
  ) : (
    <Expander
      summary={summary}
      className="nhsuk-filter"
      open={open}
    >
      <OptionSelect>
        <CheckboxGroup
          onChange={onChange}
          options={choices}
          parent={fieldName}
          small
        />
      </OptionSelect>
    </Expander>
  );
}

const pick = (names, fields) =>
  names.map((name) => fields.find((val) => val.field_name === name));

export default function Filters({ schema }) {
  const { dataset_fields: fields } = schema;
  const { getSelections, updateQuery } = useQueryContext();
  const [openFilters, setOpenFilters] = useState([]);
  const selections = getSelections();
  const categories = ['care_setting', 'topic', 'standard_category'];
  const filters = pick(categories, fields);

  const addFilter = (filter) => {
    const selections = getSelections();
    for (const key of categories) {
      selections[key] = [
        ...new Set(
          [selections[key]]
            .filter((f) => f)
            .concat([filter[key]].filter((f) => f))
            .flatMap((f) => f)
        ),
      ];
    }
    updateQuery(selections);
  };

  const removeFilter = (filter) => {
    const selections = getSelections();
    for (const key of categories) {
      selections[key] = [
        ...new Set(
          [selections[key]].flatMap((f) => f).filter((i) => i !== filter[key])
        ),
      ];
    }
    updateQuery(selections);
  };

  const setItem = (event) => {
    const { checked, value } = event.target;
    const parent = event.target.getAttribute('parent');
    const filter = { [parent]: value };
    return checked ? addFilter(filter) : removeFilter(filter);
  };

  useEffect(() => setOpenFilters(Object.keys(selections)), []);

  const activeFilters = omit(selections, 'q', 'page', 'sort');

  return (
    <div className="nhsuk-filters">
      <h3>Filters</h3>
      <div className="nhsuk-expander-group">
        {filters.map(filter => {
          let fieldFilters = activeFilters[filter.field_name] || [];
          if (!Array.isArray(fieldFilters)) {
            fieldFilters = [fieldFilters];
          }
          const numActive = fieldFilters.length;
          // TODO: should be set in schema, hack until we change it
          if (filter.label === 'Type of standard') {
            filter.label = 'Type';
          }
          filter.choices = filter.choices.map(opt => ({ ...opt, checked: fieldFilters.includes(opt.value) }));

          return (
            <Filter
              key={filter.field_name}
              {...filter}
              open={openFilters.includes(filter.field_name)}
              onChange={setItem}
              numActive={numActive}
              // TODO: this should be configured in schema
              useSelect={filter.field_name === 'standard_category'}
            />
          );
        })}
      </div>
    </div>
  );
}
