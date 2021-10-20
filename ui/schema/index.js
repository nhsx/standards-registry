import ReactMarkdown from 'react-markdown';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
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
    label: 'Owner'
  },
  reference: {
    label: 'Reference'
  },
  category:	{
    label: 'Category'
  },
  version: {
    label: 'Version'
  },
  lastUpdated: {
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
