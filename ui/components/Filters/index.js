import { CheckboxGroup, OptionSelect, Details, PanelList } from '../';
// TODO:
// [x] call http://a864b7b77f8e140858ab710899b7ed73-1561736528.eu-west-2.elb.amazonaws.com:5000/api/3/action/scheming_dataset_schema_show?type=dataset
// [x] filter by dataset_fields > field_name: status etc
// [ ] Figure out filter/facet search calls

function Filter({ label, choices }) {
  return (
    <Details summary={label} className="nhsuk-filter">
      <OptionSelect>
        <CheckboxGroup options={choices} small />
      </OptionSelect>
    </Details>
  );
}

export default function Filters({ schema }) {
  const { dataset_fields: fields } = schema;
  const getName = (val, name) => val.field_name === name;
  const businessUse = fields.find((i) => getName(i, 'business_use'));
  const careSetting = fields.find((i) => getName(i, 'care_setting'));
  const fulters = [businessUse, careSetting];
  return (
    <div className="nhsuk-filters">
      <h3>Filters</h3>
      <PanelList>
        {fulters.map((filter, index) => {
          // const {label, choices} = filter;
          return <Filter key={index} {...filter} />;
        })}
      </PanelList>
    </div>
  );
}
