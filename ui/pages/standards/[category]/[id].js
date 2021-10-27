import ReactMarkdown from 'react-markdown'
import { Page, Reading, Tag, Row, Col, PanelList, Details, EmailSignup, Feedback, Model } from '../../../components';
import upperFirst from 'lodash/upperFirst';
import { read } from '../../../helpers/api';
import schema from '../../../schema';

function getExtra(data, key) {
  return (data.extras.find(e => e.key === key) || {}).value;
}

const Category = ({ data }) => {
  return (
    <Page title={data.title}>
      <Reading>
        <h2 className="nhsuk-caption-l">
          {
            // TODO: this will be a tag or extra prop
          }
          <Tag>{upperFirst(data.state)}</Tag>
        </h2>
        <h1>{ data.title }</h1>
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
}

export async function getServerSideProps(context) {
  const { category, id } = context.params;
  const data = await read({ id });

  return {
    props: {
      data,
      category
    }
  }
}

export default Category
