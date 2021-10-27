import { createContext, useContext } from 'react';

const QueryContext = createContext();

export function QueryContextWrapper({ children, value }) {
  return <QueryContext.Provider value={value}>{ children }</QueryContext.Provider>;
}

export function useQueryContext() {
  return useContext(QueryContext)
}
