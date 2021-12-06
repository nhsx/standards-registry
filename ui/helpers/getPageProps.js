import { parse } from 'url';
import { parse as qsParse } from 'qs';
import { list, schema } from './api';

export async function getPageProps(context, options = {}) {
  const DEFAULT_SORT = {
    column: 'name',
    order: 'asc',
  };
  const { resolvedUrl } = context;
  const parsed = parse(resolvedUrl);
  const { selections } = qsParse(parsed.query);
  const { q, page, sort = DEFAULT_SORT } = context.query;

  return {
    props: {
      ...{
        data: await list({ q, page, sort, selections }),
        schemaData: await schema(),
        searchTerm: q || '',
      },
      ...options,
    },
  };
}
