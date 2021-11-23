import {
  Reading,
  Snippet,
  Page,
  Row,
  Col,
  Filters,
  Dataset,
} from '../../components';
import { list } from '../../helpers/api';

export default function Standards({ data }) {
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
          <Filters />
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
  const data = await list({ page, sort });

  return {
    props: {
      data,
    },
  };
}
