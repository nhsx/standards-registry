import { stringify } from 'qs';
import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';

const QueryContext = createContext();

export function QueryContextWrapper({ children }) {
  const router = useRouter();
  const query = router.query;

  function getQuery(props) {
    return stringify({ ...query, ...props });
  }

  const value = {
    query,
    getQuery
  };
  
  return <QueryContext.Provider value={value}>{ children }</QueryContext.Provider>;
}

export function useQueryContext() {
  return useContext(QueryContext)
}
