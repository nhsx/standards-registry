import upperFirst from 'lodash/upperFirst';
import {
  Details,
  Tag,
  Link,
  MarkdownBlock,
  Paragraph,
  Dl,
  Dd,
  Dt,
} from '../components';
import format from 'date-fns/format';

// `!!val?.length` => check whether empty array or unset val

function truncate(str, chars = 50) {
  if (str.length > chars) {
    return `${str.substring(0, chars)}...`;
  }
  return str;
}

function formatDate(date) {
  if (!date) {
    return 'Date not set';
  }
  return format(new Date(date), 'MMM yyyy');
}

function TruncateLink({ link, email }) {
  if (!link) {
    return 'Not available';
  }
  return <a href={email ? `mailto:${link}` : link}>{truncate(link, 50)}</a>;
}

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
          <Tag type={val}>{val}</Tag>
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
          {val}
          {
            <Details
              className="nhsuk-u-font-size-16 nhsuk-u-margin-top-4"
              summary="What this type means"
            >
              <div className="nhsuk-details__text">
                <Paragraph>
                  <strong>Record standards</strong> define what information to
                  collect and how to format it, for example when registering a
                  new patient.
                </Paragraph>
                <Paragraph>
                  <strong>Data definitions and terminologies</strong> define the
                  format of individual data items so they can be consistently
                  represented, for example dates or medication names. Reference
                  sets and controlled lists are also included.
                </Paragraph>
                <Paragraph>
                  <strong>Technical standards and specifications</strong>{' '}
                  specify how to make information available technically
                  including how the data is structured and transported.
                </Paragraph>
                <Paragraph>
                  <strong>Information codes of practice</strong> are legal or
                  best practice guidelines on how information should be handled.
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
              <Link href={data.documentation_link} newWindow={true}>
                View documentation for this standard
                <span className="nhsuk-u-visually-hidden">
                  opens in a new window
                </span>
              </Link>
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

export const upcomingStandard = [
  {
    id: 'name',
    title: 'Name',
    sortable: true,
    defaultSort: 'asc',
    formatter: (val, row) => {
      return (
        <>
          <p>
            <strong>{row.title}</strong>
            <br />
            {row.description}
          </p>
        </>
      );
    },
  },
  {
    id: 'standard_category',
    title: 'Standard type',
    sortable: false,
  },
  {
    id: 'status',
    title: 'Stage',
    sortable: true,
    formatter: (val) => <strong>{upperFirst(val)}</strong>,
  },
  {
    id: 'dates',
    title: 'Estimated dates',
    formatter: (_, row) => (
      <Dl>
        <Dt>Publication due:</Dt>
        <Dd>{formatDate(row.publication_due_date)}</Dd>

        <Dt>Implement from:</Dt>
        <Dd>{formatDate(row.implementation_from_date)}</Dd>

        <Dt>Comply by:</Dt>
        <Dd>{formatDate(row.comply_by_date)}</Dd>
      </Dl>
    ),
  },
  {
    id: 'other',
    title: 'Further information',
    formatter: (_, row) => (
      <Dl>
        <Dt>Owner</Dt>
        <Dd>{row?.organization?.title}</Dd>

        <Dt>Submit feedback</Dt>
        <Dd>
          <TruncateLink link={row.submit_feedback} email />
        </Dd>

        <Dt>Documentation</Dt>
        <Dd>
          <TruncateLink link={row.documentation_link} />
        </Dd>
      </Dl>
    ),
  },
];
