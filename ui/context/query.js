import { stringify } from 'qs';
import { useRouter } from 'next/router';
import { createContext, useContext, useState, useEffect } from 'react';
import { parse } from 'url';
import { parse as qsParse } from 'qs';

const QueryContext = createContext();

export function QueryContextWrapper({ children }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query);

  function getQuery() {
    return stringify(query);
  }

  function getSelections() {
    const { asPath } = router;
    const parsed = parse(asPath);
    const { selections } = qsParse(parsed.query);
    return selections;
  }

  function updateQuery(props) {
    return setQuery({ ...query, ...props });
  }

  useEffect(() => {
    router.push({ query: stringify(query) });
  }, [query]);

  const value = {
    query,
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
