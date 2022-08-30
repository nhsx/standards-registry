import { Page, Reading, Row, Col, Model, ReviewDates } from '../../components';

import { read, getPages } from '../../helpers/api';
import schema from '../../schema';
import { useContentContext } from '../../context/content';

const Id = ({ data }) => {
  const { setPageTitle } = useContentContext();
  return (
    <Page title={setPageTitle(data.title)}>
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
      analytics: {
        trackingId: process.env.NEXT_PUBLIC_TRACKING_ID,
        tagId: process.env.NEXT_PUBLIC_TAG_ID,
      },
      pages,
      data,
    },
  };
}

export default Id;
