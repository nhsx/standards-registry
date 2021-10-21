import { createContext, useContext } from 'react';

const ModelContext = createContext();

export function ModelContextWrapper({ children, value }) {
  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
}

export function useModelContext() {
  return useContext(ModelContext)
}
