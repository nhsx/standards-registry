import { useState, useEffect } from 'react';
import { useQueryContext } from '../../context/query';
import { CheckboxGroup, OptionSelect, Expander } from '../';

import styles from './Filters.module.scss';

function Filter({
  label,
  choices,
  onChange,
  field_name: fieldName,
  open,
  onToggle
}) {
  const toggle = e => {
    e.preventDefault();
    onToggle(fieldName, e.target.open);
  };
  return (
    <Expander summary={label} className="nhsuk-filter" open={open} onToggle={toggle}>
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
  const [ openItems, setOpenItems ] = useState([]);
  const selections = getSelections();
  const categories = [
    'care_setting',
    'topic',
    'standard_category'
  ];
  const filters = pick(categories, fields);
  const allOpen = openItems.length === filters.length;

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

  const setSelections = () => {
    const open = new Set(openItems);
    for (const filter of filters) {
      const key = filter.field_name;
      const list = selections[key];
      filter.choices.map((choice) => {
        choice.checked = false;
        if (list && list.includes(choice.value)) {
          open.add(key);
          choice.checked = true;
        }
        return choice;
      });
    }
    setOpenItems([...open]);
  };
  useEffect(setSelections, [selections]);

  const openAll = event => {
    event.preventDefault();
    setOpenItems(filters.map(f => f.field_name));
  };

  const closeAll = event => {
    event.preventDefault();
    setOpenItems([]);
  }

  const toggle = (name, isOpen) => {
    const open = new Set(openItems);
    isOpen ? open.add(name) : open.delete(name);
    setOpenItems([...open]);
  };

  return (
    <div className="nhsuk-filters">
      <h3>Filters</h3>
      <p className={styles.toggleAll}>
        {
          allOpen ? <a href="#" onClick={closeAll}>Close all</a> : <a href="#" onClick={openAll}>Open all</a>
        }
      </p>
      <div className="nhsuk-expander-group">
        {filters.map((filter, index) => (
          <Filter key={index} {...filter} open={openItems.includes(filter.field_name)} onChange={setItem} onToggle={toggle} />
        ))}
      </div>
    </div>
  );
}
