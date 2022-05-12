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

const content = {
  title: 'Search results',
  filters: {
    summary: '{{num}} item{{#plural}}s{{/plural}} related to: "{{searchTerm}}"',
    all: 'Showing all {{num}} result{{#plural}}s{{/plural}}',
  },
};

export default function SearchResults({ data, schemaData }) {
  return (
    <Page>
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
            placeholder="For example, FHIR, allergies, GP"
            location="browse"
          />
        </div>
      </div>
      <Row>
        <Col>
          <Filters schema={schemaData} />
        </Col>
        <Col colspan={3}>
          <Dataset data={data} schema={schemaData} includeType={true} />
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
  return await getPageProps(context, { content });
}
