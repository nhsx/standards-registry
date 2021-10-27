import ReactMarkdown from 'react-markdown';
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
  reference: {
    label: 'Reference'
  },
  category:	{
    label: 'Category',
    format: (val, data) => upperFirst((data.extras.find(e => e.key === 'category') || {}).value)
  },
  version: {
    label: 'Version'
  },
  metadata_modified: {
    label: 'Standard last updated',
    format: (val, data) => (
      <>
        <span>{ format(parseISO(val), DATE_FORMAT) }</span>
        <Details summary="Show release notes">
          <ReactMarkdown>{ data.releaseNotes }</ReactMarkdown>
        </Details>
      </>
    )
  },
  careSettings: {
    label: 'Care settings',
    format: val => <ReactMarkdown>{ val }</ReactMarkdown>
  }
};
