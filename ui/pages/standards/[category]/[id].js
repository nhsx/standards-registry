import ReactMarkdown from 'react-markdown'
import { Page, Reading, Tag, Row, Col, PanelList, Details, EmailSignup, Feedback, Model } from '../../../components';
import schema from '../../../schema';

const Category = ({ data }) => {
  const { title, category } = data.data;
  return (
    <Page title={title}>
      <Reading>
        <h2 className="nhsuk-caption-l">
          <Tag>Active</Tag>
          &nbsp;
          { category }
        </h2>
        <h1>{ title }</h1>
      </Reading>
      <Row>
        <Col colspan={2}>
          <Model schema={schema} data={data.data} />
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

// export async function getStaticPaths() {
//   return {
//     paths: [
//       '/standards/content/123'
//     ],
//     fallback: false
//   }
// }

export async function getServerSideProps(context) {
  const { category, id } = context.params;
  const res = await fetch(`http://localhost:3000/api/standards/${category}/${id}`);
  const data = await res.json();

  return {
    props: {
      data
    }
  }
}

export default Category
