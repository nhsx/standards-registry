import { list, schema } from './api';

export async function getPageProps({ query }, options = {}) {
  return {
    props: {
      ...{
        data: await list(query),
        schemaData: await schema(),
        searchTerm: query.q || '',
      },
      ...options,
    },
  };
}
