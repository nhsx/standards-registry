import ReactMarkdown from 'react-markdown'
import { Page, Reading, Tag, Row, Col, PanelList, Details, EmailSignup, Feedback, Model } from '../../../components';
import upperFirst from 'lodash/upperFirst';
import schema from '../../../schema';

function getExtra(data, key) {
  return (data.extras.find(e => e.key === key) || {}).value;
}

const Category = ({ data }) => {
  const category = getExtra(data, 'category');
  const categoryText = `${upperFirst(category)} format`;
  console.log(data)
  const status = getExtra(data, 'status');
  return (
    <Page title={data.title}>
      <Reading>
        <h2 className="nhsuk-caption-l">
          <Tag>{upperFirst(status)}</Tag>
          &nbsp;
          { categoryText }
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

  const res = await fetch(`http://localhost:3000/api/standards/${category}/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
      category
    }
  }
}

export default Category
