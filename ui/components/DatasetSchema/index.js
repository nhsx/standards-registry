import Head from 'next/head';
import { useRouter } from 'next/router';

const addJsonToHead = (schemaJSON) => (
  <Head>
    <script
      className="structured-data-list"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJSON) }}
    />
  </Head>
);

// See https://schema.org/Dataset for more

export function DatasetSchema({
  title,
  description,
  documentation_link: url,
  keywords,
  metadata_created: dateCreated,
  metadata_modified: dateModified,
  organization,
  reference_code: identifier,
  topic: topics,
  care_setting: careSettings,
  standard_category: category,
}) {
  keywords = [category, topics.join(', '), careSettings.join(', ')];

  const creator = {
    '@type': 'organization',
    name: organization.name,
  };

  const datasetJSON = {
    '@context': 'https://schema.org/',
    '@type': 'Dataset',
    name: title,
    creator,
    description,
    dateCreated,
    dateModified,
    identifier,
    url,
    keywords,
    isAccessibleForFree: true,
    includedInDataCatalog: {
      '@type': 'DataCatalog',
      name: 'data.standards.nhs.uk',
    },
  };

  return addJsonToHead(datasetJSON);
}

// Schema:title - Title
// Schema:description - Description
// Schema:url - defined url of page

export function WebPageSchema({ title, headerTitle, description, host }) {
  const router = useRouter();
  const data = {
    '@context': 'https://schema.org/',
    '@type': 'WebPage',
    title,
    headerTitle,
    description,
    url: [host, router.asPath].join(''),
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'england.interop.standards@nhs.net',
    },
  };
  return addJsonToHead(data);
}
