import { list, schema, getPages } from './api';
import { getHost } from './getHost';
export async function getPageProps({ req, query }, options = {}) {
  return {
    props: {
      ...{
        host: await getHost(req),
        data: await list(query),
        schemaData: await schema(),
        pages: await getPages(),
        searchTerm: query.q || '',
      },
      ...options,
    },
  };
}
