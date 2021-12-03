import { stringify } from 'qs';
import { useRouter } from 'next/router';
import { createContext, useContext, useState, useEffect } from 'react';

const QueryContext = createContext();

export function QueryContextWrapper({ children }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query);

  function getQuery() {
    return stringify(query);
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
  };

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
}

export function useQueryContext() {
  return useContext(QueryContext);
}
