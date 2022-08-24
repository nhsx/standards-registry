import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import { pickBy } from 'lodash';

const QueryContext = createContext();

export function QueryContextWrapper({ children }) {
  const router = useRouter();

  function getQuery(props) {
    const { query } = router;
    return new URLSearchParams({ ...query, ...props });
  }

  function getRoute() {
    return router.route;
  }

  function getSelections() {
    return router.query;
  }

  function updateQuery(props, { replace, overwrite } = {}) {
    const { query } = router;

    const newQuery = overwrite
      ? props
      : pickBy({ ...query, ...props }, Boolean);

    if (replace) {
      return router.replace({ query: newQuery }, null, {
        scroll: false,
      });
    }
    return router.push({ query: newQuery }, null, {
      shallow: true,
      scroll: false,
    });
  }

  const value = {
    query: router.query,
    getQuery,
    getRoute,
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
