import upperFirst from 'lodash/upperFirst';
import { Tag, Link, MarkdownBlock } from '../components';

// `!!val?.length` => check whether empty array or unset val
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
      label: 'Type of standard',
    },
    documentation_help_text: {
      label: 'Documentation',
      format: (val, data) => (
        <>
          {val && <MarkdownBlock md={val} />}
          {data.documentation_link && (
            <Link
              href={data.documentation_link}
              text="View documentation for this standard (opens in new window)"
              newWindow={true}
            />
          )}
        </>
      ),
    },
  },
  {
    section_title: 'Business and care setting usage',
    business_use: {
      label: 'Business use',
      format: (val) => val || 'As yet unspecified',
    },
    care_setting: {
      label: 'Care Setting',
      format: (val) => val || 'As yet unspecified',
    },
  },
  {
    section_title: 'Relationships to other standards',
    related_standards: {
      label: 'Related Standards',
      format: (val) =>
        (!!val?.length && <MarkdownBlock md={val} />) ||
        'Information unavailable',
    },
    dependencies: {
      label: 'Dependencies',
      format: (val) =>
        (!!val?.length && <MarkdownBlock md={val} />) ||
        'Information unavailable',
    },
  },
  {
    section_title: 'Assurance and endorsements',
    assurance: {
      label: 'Assurance',
      format: (val) =>
        (!!val?.length && <MarkdownBlock md={val} />) || 'Not applicable',
    },
    endorsements: {
      label: 'Endorsements',
      format: (val) =>
        (!!val?.length && <MarkdownBlock md={val} />) || 'Not applicable',
    },
  },
];
