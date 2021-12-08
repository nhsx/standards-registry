import { stringify } from 'qs';
import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import { parse } from 'url';
import { parse as qsParse } from 'qs';
import { merge } from 'lodash';

const QueryContext = createContext();

export function QueryContextWrapper({ children }) {
  const router = useRouter();

  function getQuery() {
    const { query } = router;
    return stringify(query);
  }

  function getSelections() {
    // debugger;
    // const { asPath } = router;
    // const parsed = parse(asPath);
    // const { selections } = qsParse(parsed.query);
    return router.query;
  }

  function updateQuery(props) {
    const { query } = router;
    console.log(merge(query, props));
    return router.push({ query: merge(query, props) });
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
