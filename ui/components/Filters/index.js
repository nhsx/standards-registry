import { CheckboxGroup, OptionSelect, Details, PanelList } from '../';

const FILTERS = [
  {
    title: 'Topic',
    options: [
      {
        label: 'Appointment / Scheduling',
        value: 'Scheduling',
      },
      {
        label: 'Referrals',
        value: 'Referrals',
      },
      {
        label: 'Access to records',
        value: 'access',
      },
      {
        label: 'Clinical decision support',
        value: 'clinical',
      },
    ],
  },
  {
    title: 'Programme',
    options: [
      {
        label: 'Appointment / Scheduling',
        value: 'Scheduling',
      },
      {
        label: 'Referrals',
        value: 'Referrals',
      },
      {
        label: 'Access to records',
        value: 'access',
      },
      {
        label: 'Clinical decision support',
        value: 'clinical',
      },
    ],
  },
  {
    title: 'Care settings',
    options: [
      {
        label: 'Appointment / Scheduling',
        value: 'Scheduling',
      },
      {
        label: 'Referrals',
        value: 'Referrals',
      },
      {
        label: 'Access to records',
        value: 'access',
      },
      {
        label: 'Clinical decision support',
        value: 'clinical',
      },
    ],
  },
];

function Filter({ title, options }) {
  return (
    <Details summary={title} className="nhsuk-filter">
      <OptionSelect>
        <CheckboxGroup options={options} small />
      </OptionSelect>
    </Details>
  );
}

export default function Filters({ filters = FILTERS }) {
  return (
    <div className="nhsuk-filters">
      <h3>Filters</h3>
      <PanelList>
        {filters.map((filter, index) => (
          <Filter key={index} {...filter} />
        ))}
      </PanelList>
    </div>
  );
}
