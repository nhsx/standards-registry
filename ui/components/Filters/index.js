import { useQueryContext } from '../../context/query';
import { CheckboxGroup, OptionSelect, Details, PanelList } from '../';
// import { queriseSelections, serialise } from '../../helpers/api';
// import { merge, remove } from 'lodash';

// TODO:
// [x] call http://a864b7b77f8e140858ab710899b7ed73-1561736528.eu-west-2.elb.amazonaws.com:5000/api/3/action/scheming_dataset_schema_show?type=dataset
// [x] filter by dataset_fields > field_name: status etc
// [x] 16px font, more space
// [x] State management
// [ ] Figure out filter/facet search calls
// [ ] Push/pull history query
// [ ] CORS issue

function Filter({
  label,
  choices,
  onChange,
  field_name: fieldName,
  hasChecked,
}) {
  return (
    <Details summary={label} className="nhsuk-filter" open={hasChecked}>
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

const pick = (names, fields) =>
  names.map((name) => fields.find((val) => val.field_name === name));

export default function Filters({ schema }) {
  const { dataset_fields: fields } = schema;
  const { getSelections, updateQuery } = useQueryContext();
  const categories = ['business_use', 'care_setting'];
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

  const setSelections = () => {
    const selections = getSelections();
    for (const filter of filters) {
      const key = filter.field_name;
      const list = selections[key];
      filter.hasChecked = false;
      filter.choices.map((choice) => {
        choice.checked = false;
        if (list && list.includes(choice.value)) {
          filter.hasChecked = true;
          choice.checked = true;
        }
        return choice;
      });
    }
  };
  setSelections();

  return (
    <div className="nhsuk-filters">
      <h3>Filters</h3>
      <PanelList>
        {filters.map((filter, index) => (
          <Filter key={index} {...filter} onChange={setItem} />
        ))}
      </PanelList>
    </div>
  );
}
