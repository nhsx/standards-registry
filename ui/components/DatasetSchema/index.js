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
}) {
  const datasetJSON = {
    '@context': 'https://schema.org/',
    '@type': 'Dataset',
    name: title,
    description,
    dateCreated,
    dateModified,
    identifier,
    url,
    author: organization.name,
    keywords,
  };

  return (
    <Head>
      <script className="structured-data-list" type="application/ld+json">
        {JSON.stringify(datasetJSON)}
      </script>
    </Head>
  );
}
