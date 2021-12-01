import {
  Reading,
  Snippet,
  Page,
  Row,
  Col,
  Filters,
  Dataset,
} from '../../components';
import { list, schema } from '../../helpers/api';

export default function Standards({ data, schemaData }) {
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
          <Dataset data={data} pagination={true} />
        </Col>
      </Row>
    </Page>
  );
}

const DEFAULT_SORT = {
  column: 'name',
  order: 'asc',
};

export async function getServerSideProps(context) {
  const { page, sort = DEFAULT_SORT } = context.query;
  // Sad times,
  // const [schemaData, data] = [await schema(), await list({ page, sort })];
  const [schemaData, data] = await Promise.all([
    schema(),
    list({ page, sort }),
  ]);

  return {
    props: {
      data,
      schemaData,
    },
  };
}
