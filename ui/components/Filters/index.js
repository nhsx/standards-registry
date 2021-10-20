import { CheckboxGroup, OptionSelect, Details, PanelList } from '../';

function Filter({ title, options }) {
  return (
    <Details summary={title} className="nhsuk-filter">
      <OptionSelect>
        <CheckboxGroup options={options} small />
      </OptionSelect>
    </Details>
  )
}

export default function Filters({ filters = [] }) {
  return (
    <div className="nhsuk-filters">
      <h3>Filters</h3>
      <PanelList>
        {
          filters.map((filter, index) => <Filter key={index} {...filter} />)
        }
      </PanelList>
    </div>
  )
}
