import {
  Search,
  Layout,
  Page,
  Col,
  Row,
  Reading,
  Filters,
  Dataset,
  Snippet,
  FeedbackFooter,
} from '../components';
import { getPageProps } from '../helpers/getPageProps';
import { useQueryContext } from '../context/query';
import { useEffect } from 'react';

const content = {
  headerTitle: 'Standards Together',
  title: 'Search Results',
  intro:
    'Discover recognised published and future standards that help things work together for service users in health and adult social care within England.',
  filters: {
    summary: '{{num}} item{{#plural}}s{{/plural}} related to: "{{searchTerm}}"',
    all: '{{num}} result{{#plural}}s{{/plural}}',
  },
};

export default function SearchResults({ data, schemaData, host }) {
  const { query, updateQuery } = useQueryContext();
  const { q: searchTerm } = query;
  const title = searchTerm ? [query.q, content.title].join(' - ') : '';
  const headerTitle = content.headerTitle || '';

  useEffect(() => {
    let orderBy = null;
    let order = null;
    if (!query || !searchTerm || searchTerm === '') {
      orderBy = 'name';
      order = 'asc';
    }
    updateQuery({ ...query, orderBy, order });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page title={`${title}`} headerTitle={headerTitle} host={host}>
      <h1>
        <Snippet inline>title</Snippet>
      </h1>
      <Reading>
        <Snippet>intro</Snippet>
      </Reading>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-three-quarters">
          <Search
            labelText="Search"
            placeholder="Search standards"
            location="browse"
          />
        </div>
      </div>
      <Row>
        <Col>
          <Filters
            schema={schemaData}
            showRequirementFilter={true}
            showPublishedFilter={true}
          />
        </Col>
        <Col colspan={3}>
          <Dataset
            data={data}
            schema={schemaData}
            includeType={true}
            futureAndPublished={true}
          />
        </Col>
      </Row>
      <FeedbackFooter />
    </Page>
  );
}

SearchResults.Layout = function SearchResults({ children }) {
  return <Layout hideBannerSearch>{children}</Layout>;
};

export async function getServerSideProps(context) {
  return await getPageProps(context, { content }, true);
}
