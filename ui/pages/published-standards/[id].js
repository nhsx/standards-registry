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
  // TODO <--- Remove this code before production
  // data.reference_code = '123-456-789';
  // data.logo =
  //   'https://theprsb.org/wp-content/uploads/2017/10/cropped-PRSB-Final-Logo-RGB.png';
  // data.alternate_name = 'Testing alternate name';
  // data.applies_to = ['Testing applies to 1', 'testing applies to 2'];
  // data.impacts_on = [
  //   'Testing impacts on 1',
  //   'Testing impacts on 2',
  //   'Testing impacts on 3',
  // ];
  // data.comply_by_date = '2021-10-22';
  // data.implementation_from_date = '2021-10-22';
  // data.related_standards =
  //   '* [Clinical Risk Management: its Application in the Deployment and Use of Health IT Systems](https://digital.nhs.uk/data-and-information/information-standards/information-standards-and-data-collections-including-extractions/publications-and-notifications/standards-and-collections/dcb0160-clinical-risk-management-its-application-in-the-deployment-and-use-of-health-it-systems)\r\n* [Clinical Risk Management: its Application in the Manufacture of Health IT Systems](https://digital.nhs.uk/data-and-information/information-standards/information-standards-and-data-collections-including-extractions/publications-and-notifications/standards-and-collections/dcb0129-clinical-risk-management-its-application-in-the-manufacture-of-health-it-systems)\r\n* [Secure Email](https://digital.nhs.uk/data-and-information/information-standards/information-standards-and-data-collections-including-extractions/publications-and-notifications/standards-and-collections/dcb1596-secure-email)\r\n* [Information Governance Standards Framework](https://webarchive.nationalarchives.gov.uk/ukgwa/20150107145557/http:/www.isb.nhs.uk/documents/isb-1512/amd-159-2010/index_html) (retired)\r\n* [Mental Health Services Data Set](https://digital.nhs.uk/data-and-information/information-standards/information-standards-and-data-collections-including-extractions/publications-and-notifications/standards-and-collections/dcb0011-mental-health-services-data-set/scci0011-mental-health-services-data-set-archive) (retired)';
  // data.scope = 'Testing scope';
  // data.senior_responsible_officer = 'Testing Senior responsible officer';
  // data.business_lead = 'Testing Business Lead';
  // data.implementation_review_date = '2025-05-10';
  // data.legal_authority = 'Testing legal authority';
  // data.legal_authority_description = 'Testing legal authority description';
  // data.trusted_by = 'Testing trusted by';
  // data.more_information = 'Testing more information';
  // ---> End remove this code before production;
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
