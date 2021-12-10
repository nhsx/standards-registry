import { stringify } from 'qs';
import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';

const QueryContext = createContext();

export function QueryContextWrapper({ children }) {
  const router = useRouter();

  function getQuery() {
    const { query } = router;
    return stringify(query);
  }

  function getSelections() {
    return router.query;
  }

  function updateQuery(props) {
    const { query } = router;
    return router.push({ query: { ...query, ...props } });
  }

  const value = {
    query: router.query,
    getQuery,
    updateQuery,
    getSelections,
  };

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
}

export function useQueryContext() {
  return useContext(QueryContext);
}