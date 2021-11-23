import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import upperFirst from 'lodash/upperFirst';
import { Tag } from '../components';

const DATE_FORMAT = 'do MMMM yyyy';

export default {
  title: {
    show: false,
  },
  content: {
    show: false,
  },
  owner: {
    label: 'Owner',
    accessor: 'organization.title',
  },
  approval_code: {
    label: 'Approval Code',
  },
  status: {
    label: 'Status',
    format: (val) => <Tag classes={val}>{upperFirst(val)}</Tag>,
  },
  standard_category: {
    label: 'Category',
  },
  url: {
    label: 'Link to standard',
    format: (val) => (
      <a href={val} target='_blank' rel='noreferrer'>
        View standard
      </a>
    ),
  },
  metadata_modified: {
    label: 'Standard last updated',
    format: (val) => format(parseISO(val), DATE_FORMAT),
  },
  care_setting: {
    label: 'Care Settings',
  },
  procedure: {
    label: 'Procedures',
  },
  dependencies: {
    label: 'Dependencies',
  },
  related_standards: {
    label: 'Related Standards',
  },
};
