import {
  Page,
  Reading,
  Row,
  Col,
  Model,
  ReviewDates,
  DatasetSchema,
  MarkdownBlock,
} from '../../components';

import { read, getPages } from '../../helpers/api';
import schema from '../../schema';

const Id = ({ data }) => {
  const { title, description } = data;

  return (
    <>
      <DatasetSchema {...data} />
      <Page title={title} description={description}>
        <Reading>
          <h1>{title}</h1>
          <div className="nhsuk-u-reading-width">
            <p>{description}</p>
          </div>
        </Reading>
        <Row>
          <Col className="nhsuk-grid-column-two-thirds">
            <Model schema={schema} data={data} />
            <div style={{ paddingTop: '30px' }}>
              <Reading>
                <h3>More information</h3>
                {data.more_information && (
                  <MarkdownBlock md={data.more_information} />
                )}
              </Reading>
            </div>
            <ReviewDates data={data} />
          </Col>
        </Row>
      </Page>
    </>
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
