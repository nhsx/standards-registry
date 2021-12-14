import {
  Tag,
  Page,
  Reading,
  Row,
  Col,
  Model,
  ReviewDates,
  FeedbackFooter,
} from '../../components';
import upperFirst from 'lodash/upperFirst';
import { read } from '../../helpers/api';
import schema from '../../schema';

const Id = ({ data }) => {
  return (
    <Page title={data.title}>
      <Reading>
        <h2 className="nhsuk-caption-l">
          <Tag status={data.status}>{upperFirst(data.status)}</Tag> Information
          standard listing
        </h2>
        <h1>{data.title}</h1>
        <div className="nhsuk-grid-row nhsuk-grid-column-two-thirds">
          <p>{data.notes}</p>
        </div>
      </Reading>
      <Row>
        <Col colspan={2}>
          <Model schema={schema} data={data} />
          <FeedbackFooter />
          <ReviewDates data={data} />
        </Col>
      </Row>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const data = await read({ id });

  return {
    props: {
      data,
    },
  };
}

export default Id;
