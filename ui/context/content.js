import { createContext, useContext } from 'react';
import merge from 'lodash/merge';

const CONTENT = {
  title: 'Join up IT systems in health and social care',
  browse: 'Browse the standards directory',
  filters: {
    summary: 'Showing {{num}} result{{#plural}}s{{/plural}}',
  },
  pagination: {
    summary: 'Showing {{from}} - {{to}} of {{total}} results',
  },
};

const ContentContext = createContext();

export function ContentContextWrapper({ children, value }) {
  const content = merge({}, CONTENT, value);
  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  return useContext(ContentContext);
}
