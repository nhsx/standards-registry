import { createContext, useContext } from 'react';

const PagesContext = createContext();

export function PagesContextWrapper({ children, value = [] }) {
  return (
    <PagesContext.Provider value={value}>{children}</PagesContext.Provider>
  );
}

export function usePages() {
  return useContext(PagesContext);
}
