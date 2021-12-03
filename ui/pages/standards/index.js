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
import { parse } from 'url';
import { parse as qsParse } from 'qs';

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
  const { resolvedUrl } = context;
  const parsed = parse(resolvedUrl);
  const { selections } = qsParse(parsed.query);
  const { page, sort = DEFAULT_SORT } = context.query;

  return {
    props: {
      data: await list({ page, sort, selections }),
      schemaData: await schema(),
    },
  };
}
