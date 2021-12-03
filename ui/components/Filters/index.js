import { useQueryContext } from '../../context/query';
import { useState, useEffect } from 'react';
import { CheckboxGroup, OptionSelect, Details, PanelList } from '../';

// TODO:
// [x] call http://a864b7b77f8e140858ab710899b7ed73-1561736528.eu-west-2.elb.amazonaws.com:5000/api/3/action/scheming_dataset_schema_show?type=dataset
// [x] filter by dataset_fields > field_name: status etc
// [x] 16px font, more space
// [x] State management
// [ ] Figure out filter/facet search calls
// [ ] Push/pull history query
// [ ] CORS issue

function Filter({ label, choices, onChange, field_name: fieldName }) {
  return (
    <Details summary={label} className="nhsuk-filter">
      <OptionSelect>
        <CheckboxGroup
          onChange={onChange}
          options={choices}
          parent={fieldName}
          small
        />
      </OptionSelect>
    </Details>
  );
}

export default function Filters({ schema }) {
  const [selections, setSelections] = useState({});
  const { dataset_fields: fields } = schema;
  const { query, updateQuery } = useQueryContext();

  const pick = (names) =>
    names.map((name) => fields.find((val) => val.field_name === name));
  const filters = pick(['business_use', 'care_setting']);

  const setItem = (event) => {
    const { checked, value } = event.target;

    const parent = event.target.getAttribute('parent');
    if (checked) {
      setSelections({
        ...selections,
        ...{
          [parent]: selections[parent]
            ? [...selections[parent], value]
            : [value],
        },
      });
    } else {
      setSelections({
        ...selections,
        ...{
          [parent]: selections[parent].filter((i) => i !== value),
        },
      });
    }
  };

  useEffect(() => {
    updateQuery({ selections });
  }, [selections]);

  const onCheckboxChange = (e) => setItem(e);

  return (
    <div className="nhsuk-filters">
      <h3>Filters</h3>
      <PanelList>
        {filters.map((filter, index) => (
          <Filter key={index} {...filter} onChange={onCheckboxChange} />
        ))}
      </PanelList>
    </div>
  );
}
