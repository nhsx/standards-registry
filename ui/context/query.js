import { stringify } from 'qs';
import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';

const QueryContext = createContext();

export function QueryContextWrapper({ children }) {
  const router = useRouter();

  function getQuery(props) {
    const { query } = router;
    return stringify({ ...query, ...props });
  }

  function getSelections() {
    return router.query;
  }

  function updateQuery(props, { replace } = {}) {
    const { query } = router;
    if (replace) {
      return router.replace({ query: { ...query, ...props } }, null, {
        scroll: false,
      });
    }
    return router.push({ query: { ...query, ...props } }, null, {
      scroll: false,
    });
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
