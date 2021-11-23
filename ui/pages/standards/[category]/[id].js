import {
  Tag,
  Page,
  Reading,
  Row,
  Col,
  PanelList,
  Details,
  EmailSignup,
  Feedback,
  Model,
} from '../../../components';
import upperFirst from 'lodash/upperFirst';
import { read } from '../../../helpers/api';
import schema from '../../../schema';

const Category = ({ data }) => {
  return (
    <Page title={data.title}>
      <Reading>
        <h2 className="nhsuk-caption-l">
          <Tag status={data.status}>{upperFirst(data.status)}</Tag> Information
          standard listing
        </h2>
        <h1>{data.title}</h1>
      </Reading>
      <Row>
        <Col colspan={2}>
          <Model schema={schema} data={data} />
        </Col>
        <Col>
          <PanelList>
            <Details summary="Get updates for this standard">
              <EmailSignup />
            </Details>
            <Details summary="Give feedback about this standard">
              <Feedback />
            </Details>
          </PanelList>
        </Col>
      </Row>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { category, id } = context.params;
  const data = await read({ id });

  return {
    props: {
      data,
      category,
    },
  };
}

export default Category;
