import {
  Page,
  Col,
  Row,
  Reading,
  Filters,
  Dataset,
  Snippet,
} from '../components';
import { list, schema } from '../helpers/api';

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
  const { q, page } = context.query;
  const result = await list({ q, page });

  return {
    props: {
      data: result,
      schemaData: await schema(),
      searchTerm: q || '',
      content,
    },
  };
}
