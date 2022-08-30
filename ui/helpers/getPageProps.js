import { list, schema, getPages } from './api';

export async function getPageProps({ query }, options = {}) {
  return {
    props: {
      ...{
        analytics: {
          trackingId: process.env.NEXT_PUBLIC_TRACKING_ID,
          tagId: process.env.NEXT_PUBLIC_TAG_ID,
        },
        data: await list(query),
        schemaData: await schema(),
        pages: await getPages(),
        searchTerm: query.q || '',
      },
      ...options,
    },
  };
}
