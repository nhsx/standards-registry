import {
  Reading,
  Snippet,
  Page,
  Row,
  Col,
  Filters,
  Dataset,
} from '../../components';
import { getPageProps } from '../../helpers/getPageProps';

export default function Standards({ data, schemaData }) {
  return (
    <Page>
      <h1>Browse the standards directory</h1>
      <Reading>
        <Snippet>intro</Snippet>
        <p>
          Find standards, services and APIs to build interoperable technology in
          health and social care.
        </p>
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

export async function getServerSideProps(context) {
  return await getPageProps(context);
}
