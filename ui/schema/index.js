import upperFirst from 'lodash/upperFirst';
import { Details, Tag, Link, MarkdownBlock, Paragraph } from '../components';

// `!!val?.length` => check whether empty array or unset val
export default [
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
          <Tag status={val.toLowerCase()}>{upperFirst(val)}</Tag>
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
      label: 'Type of standard',
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
    section_title: 'Business and care setting usage',
    business_use: {
      label: 'Business use',
      format: (val) => val || 'As yet unspecified',
    },
    care_setting: {
      label: 'Care Setting',
      format: (val) => val || 'As yet unspecified',
    },
  },
  {
    section_title: 'Relationships to other standards',
    related_standards: {
      label: 'Related standards',
      format: (val) =>
        (!!val?.length && <MarkdownBlock md={val} />) ||
        'Information unavailable',
    },
    dependencies: {
      label: 'Dependencies',
      format: (val) =>
        (!!val?.length && <MarkdownBlock md={val} />) ||
        'Information unavailable',
    },
  },
  {
    section_title: 'Assurance and endorsements',
    reference_code: {
      label: 'Reference Code',
      format: (val) => val || 'Not Applicable',
    },
    assurance: {
      label: 'Assurance',
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
