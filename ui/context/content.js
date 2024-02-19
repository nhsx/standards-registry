import { createContext, useContext } from 'react';
import merge from 'lodash/merge';

const CONTENT = {
  headerTitle: 'Standards Together',
  title: 'Standards Together',
  pagination: {
    summary: 'Showing {{from}} - {{to}} of {{total}} results',
  },
};

const ContentContext = createContext();

export function ContentContextWrapper({ children, value }) {
  const content = merge({}, CONTENT, value);
  const delimiter = ' - ';
  const contentMerge = (content) => {
    return { ...CONTENT, ...content };
  };

  const setPageTitle = (pageTitle) =>
    pageTitle ? [pageTitle, content.title].join(delimiter) : content.title;

  const functions = { content, setPageTitle, contentMerge };
  return (
    <ContentContext.Provider value={functions}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  return useContext(ContentContext);
}
