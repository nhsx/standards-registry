import { list, schema, getPages } from './api';

export async function getPageProps({ query }, options = {}) {
  return {
    props: {
      ...{
        data: await list(query),
        schemaData: await schema(),
        pages: await getPages(),
        searchTerm: query.q || '',
      },
      ...options,
    },
  };
}
