import { createContext, useContext } from 'react';
import merge from 'lodash/merge';

const CONTENT = {
  title: 'NHS Standards Directory',
  filters: {
    summary: '{{num}} result{{#plural}}s{{/plural}}',
    all: '{{num}} result{{#plural}}s{{/plural}}',
  },
  pagination: {
    summary: 'Showing {{from}} - {{to}} of {{total}} results',
  },
};

const ContentContext = createContext();

export function ContentContextWrapper({ children, value }) {
  const content = merge({}, CONTENT, value);

  const delimiter = ' - ';

  const setPageTitle = (pageTitle) =>
    [pageTitle, content.title].join(delimiter);

  const functions = { content, setPageTitle };
  return (
    <ContentContext.Provider value={functions}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  return useContext(ContentContext);
}
