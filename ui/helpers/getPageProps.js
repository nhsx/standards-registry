import { list, schema } from './api';

export async function getPageProps(context, options = {}) {
  const { query } = context;
  const DEFAULT_SORT = {
    column: 'name',
    order: 'asc',
  };

  const { q, page, sort = DEFAULT_SORT } = context.query;

  return {
    props: {
      ...{
        data: await list({ q, page, sort, query }),
        schemaData: await schema(),
        searchTerm: q || '',
      },
      ...options,
    },
  };
}
