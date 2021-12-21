import {
  Reading,
  Snippet,
  Page,
  Row,
  Col,
  Filters,
  Dataset,
  FeedbackFooter,
} from '../../components';
import { getPageProps } from '../../helpers/getPageProps';

export default function Standards({ data, schemaData }) {
  return (
    <Page>
      <h1>Browse the standards directory</h1>
      <Reading>
        <Snippet>intro</Snippet>
        <p>
          Explore listings for information standards, services and APIs used in
          health and social care technology. All of the standards listed in the
          directory are nationally recognised.
        </p>
      </Reading>
      <Row>
        <Col>
          <Filters schema={schemaData} />
        </Col>
        <Col colspan={3}>
          <Dataset data={data} pagination={true} />
          <FeedbackFooter />
        </Col>
      </Row>
    </Page>
  );
}

export async function getServerSideProps(context) {
  return await getPageProps(context);
}
