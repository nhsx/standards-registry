import upperFirst from 'lodash/upperFirst';
import { Details, Tag, Link, MarkdownBlock, Paragraph } from '../components';

// `!!val?.length` => check whether empty array or unset val
const schema = [
  {
    section_title: 'About this standard',
    owner: {
      label: 'Owner',
      accessor: 'organization.title',
    },
    status: {
      label: 'Status',
      format: (val) => (
        <>
          {upperFirst(val)}
          {
            <Details
              className="nhsuk-u-font-size-16 nhsuk-u-margin-top-4"
              summary="What this status means"
            >
              <div className="nhsuk-details__text">
                <Paragraph>
                  <strong>Active standards</strong> are stable, maintained and
                  have been assured or endorsed for use by qualified bodies.
                </Paragraph>
                <Paragraph>
                  <strong>Draft standards</strong> are still being developed or
                  are waiting for assurance or endorsement by qualified bodies.
                </Paragraph>
                <Paragraph>
                  <strong>Deprecated standards</strong> are older versions of a
                  standard which are being phased out.
                </Paragraph>
                <Paragraph>
                  <strong>Retired standards</strong> are not being maintained
                  and should not be used.
                </Paragraph>
              </div>
            </Details>
          }
        </>
      ),
    },
    standard_category: {
      label: 'Type',
      format: (val) => (
        <>
          <Tag type={val}>{val}</Tag>
          {
            <Details
              className="nhsuk-u-font-size-16 nhsuk-u-margin-top-4"
              summary="What this type means"
            >
              <div className="nhsuk-details__text">
                <Paragraph>
                  <strong>Technical specifications and APIs</strong> specify how
                  information is to be made available technically. This includes
                  how the data is structured and transported, its architecture
                  and associated protocols.
                </Paragraph>
                <Paragraph>
                  <strong>Clinical and care record standards</strong> define
                  what information to collect, the purpose of the information
                  and how to format it for consistency of meaning - for example
                  creating a standardised way to register a new patient.
                </Paragraph>
                <Paragraph>
                  <strong>Medical and data dictionaries</strong> define the
                  format of specific data items in ways that allow them to be
                  consistently represented. Labelling of medicines or formatting
                  of dates of birth are examples. This category also includes
                  reference sets and controlled lists.
                </Paragraph>
                <Paragraph>
                  <strong>Data protection and governance</strong> define rules
                  for what information can be legally processed and how that
                  information should be securely handled.
                </Paragraph>
              </div>
            </Details>
          }
        </>
      ),
    },
    documentation_help_text: {
      label: 'Documentation',
      format: (val, data) => (
        <>
          {val && <MarkdownBlock md={val} />}
          {data.documentation_link && (
            <>
              <Link
                href={data.documentation_link}
                text="View documentation for this standard"
                newWindow={true}
              />
              <br />
              (opens in new window)
            </>
          )}
        </>
      ),
    },
    contact_details: {
      label: 'Contact details',
      format: (val, data) => {
        return (
          (data.contact_details && (
            <Link
              href={`mailto:${data.contact_details}`}
              text={data.contact_details}
              newWindow={true}
            />
          )) ||
          'Contact information not yet provided'
        );
      },
    },
  },
  {
    section_title: 'Topics and care settings',
    topic: {
      label: 'Topic',
      format: (val) => val || 'As yet unspecified',
    },
    care_setting: {
      label: 'Care setting',
      format: (val) => val || 'As yet unspecified',
    },
  },
  {
    section_title: 'Dependencies and related standards',
    dependencies: {
      label: 'Dependencies',
      format: (val) =>
        (!!val?.length && <MarkdownBlock md={val} />) ||
        'Information unavailable',
    },
    related_standards: {
      label: 'Related standards',
      format: (val) =>
        (!!val?.length && <MarkdownBlock md={val} />) ||
        'Information unavailable',
    },
  },
  {
    section_title: 'Assurance and endorsements',
    reference_code: {
      label: 'Reference code for legally mandated standards',
      format: (val) => val || 'None - not legally mandated',
    },
    assurance: {
      label: 'Quality assurance',
      format: (val) =>
        (!!val?.length && <MarkdownBlock md={val} />) || 'Not applicable',
    },
    endorsements: {
      label: 'Endorsements',
      format: (val) =>
        (!!val?.length && <MarkdownBlock md={val} />) || 'Not applicable',
    },
  },
];

export default schema;
