import {
  Page,
  Col,
  Row,
  Reading,
  Filters,
  Dataset,
  Snippet,
} from '../components';
import { getPageProps } from '../helpers/getPageProps';

const content = {
  title: 'Search results',
  filters: {
    summary: '{{num}} item{{#plural}}s{{/plural}} related to: "{{searchTerm}}"',
    all: 'Showing all {{num}} result{{#plural}}s{{/plural}}',
  },
};

export default function SearchResults({ data, searchTerm, schemaData }) {
  return (
    <Page>
      <h1>
        <Snippet inline>title</Snippet>
      </h1>
      <Reading>
        <Snippet>intro</Snippet>
      </Reading>
      <Row>
        <Col>
          <Filters schema={schemaData} />
        </Col>
        <Col colspan={3}>
          <Dataset data={data} searchTerm={searchTerm} includeType={true} />
        </Col>
      </Row>
    </Page>
  );
}

export async function getServerSideProps(context) {
  return await getPageProps(context, { content });
}
