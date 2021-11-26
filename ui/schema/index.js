import upperFirst from 'lodash/upperFirst';
import { Tag, Link } from '../components';

export default [
  {
    section_title: 'About this standard',
    owner: {
      label: 'Owner',
      accessor: 'organization.title',
    },
    approval_code: {
      label: 'Approval Code',
      format: (val) => val || 'Not Applicable',
    },
    status: {
      label: 'Status',
      format: (val) => <Tag status={val.toLowerCase()}>{upperFirst(val)}</Tag>,
    },
    standard_category: {
      label: 'Type of Standard',
    },
    documentation_help_text: {
      label: 'Documentation',
    },
    documentation_link: {
      label: 'Documentation link',
      format: (val) => <Link href={val}></Link>,
    },
  },
  {
    section_title: 'Business and care setting usage',
    business_use: { label: 'Business use' },
    care_setting: {
      label: 'Care Setting',
    },
  },
  {
    section_title: 'Relationships to other standards',
    dependencies: {
      label: 'Dependencies',
    },
    related_standards: {
      label: 'Related Standards',
    },
  },
  {
    section_title: 'Assurance and endorsements',
    assurance: {
      label: 'Assurance',
    },
    endorsements: {
      label: 'Endorsements',
    },
  },
];
