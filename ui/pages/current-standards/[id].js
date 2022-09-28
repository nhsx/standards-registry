import { Page, Reading, Row, Col, Model, ReviewDates } from '../../components';

import { read, getPages } from '../../helpers/api';
import schema from '../../schema';

const Id = ({ data }) => {
  return (
    <Page title={data.title}>
      <Reading>
        <h1>{data.title}</h1>
        <div className="nhsuk-u-reading-width">
          <p>{data.description}</p>
        </div>
      </Reading>
      <Row>
        <Col className="nhsuk-grid-column-two-thirds">
          <Model schema={schema} data={data} />
          <ReviewDates data={data} />
        </Col>
      </Row>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const data = await read({ id });
  const pages = await getPages();

  return {
    props: {
      pages,
      data,
    },
  };
}

export default Id;
