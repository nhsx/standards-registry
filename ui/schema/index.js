import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import upperFirst from 'lodash/upperFirst'
import { Details } from '../components';

const DATE_FORMAT = 'do MMMM yyyy';

export default {
  title: {
    show: false,
  },
  content: {
    show: false
  },
  owner: {
    label: 'Owner',
    accessor: 'organization.title'
  },
  url: {
    label: 'Link to standard',
    format: val => <a href={val} target="_blank">View standard</a>
  },
  metadata_modified: {
    label: 'Standard last updated',
    format: val => format(parseISO(val), DATE_FORMAT)
  }
};
