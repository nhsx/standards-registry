import Head from 'next/head';

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

  return (
    <Head>
      <script className="structured-data-list" type="application/ld+json">
        {JSON.stringify(datasetJSON)}
      </script>
    </Head>
  );
}
