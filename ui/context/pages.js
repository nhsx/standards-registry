import { createContext, useContext } from 'react';

const PagesContext = createContext();

const DEFAULT_PAGES = [
  {
    name: 'current-standards',
    short_title: 'Current standards',
  },
  {
    name: 'future-standards',
    short_title: 'Future standards',
  },
  {
    name: 'about-standards',
    short_title: 'About standards',
  },
  {
    name: 'help-and-resources',
    short_title: 'Help and resources',
  },
];

export function PagesContextWrapper({ children, value = DEFAULT_PAGES }) {
  return (
    <PagesContext.Provider value={value}>{children}</PagesContext.Provider>
  );
}

export function usePages() {
  return useContext(PagesContext);
}
