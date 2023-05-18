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
import ActionLink from '../components/ActionLink';
import Logo from '../components/Logo';

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

const sentenceCase = (str) => upperFirst(str.replaceAll('-', ' '));

const DocumentationLink = ({ link = false, title }) =>
  !link ? (
    'Not available'
  ) : (
    <>
      <a
        href={link}
        rel="noreferrer"
        target="_blank"
        title={`Documentation for ${title}`}
      >
        View documentation for this standard
      </a>
      <span className="nhsuk-u-visually-hidden">opens in a new tab</span>
      <br />
      (opens in new tab)
    </>
  );

const CategoryDetails = function () {
  return (
    <Details
      className="nhsuk-u-font-size-16 nhsuk-u-margin-top-4"
      summary="Show definitions of standard types"
    >
      <div className="nhsuk-details__text">
        <Paragraph>
          <strong>Record standards</strong> define what information to collect
          and how to format it, for example when registering a new patient.
        </Paragraph>
        <Paragraph>
          <strong>Data definitions and terminologies</strong> define the format
          of individual data items so they can be consistently represented, for
          example dates or medication names. Reference sets and controlled lists
          are also included.
        </Paragraph>
        <Paragraph>
          <strong>Technical standards and specifications</strong> specify how to
          make information available technically including how the data is
          structured and transported.
        </Paragraph>
        <Paragraph>
          <strong>Information codes of practice</strong> are legal or best
          practice guidelines on how information should be handled.
        </Paragraph>
      </div>
    </Details>
  );
};

const Owner = ({ owner, image_url }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {owner}
      {image_url && <Logo owner={owner} image_url={image_url} />}
    </div>
  );
};

const schema = [
  {
    section_title: '',
    alternate_title: {
      label: 'Also known as',
      accessor: 'alternate_name',
    },
  },
  {
    section_title: 'About this standard',
    owner: {
      label: 'Owner',
      accessor: 'owner',
      format: (_, data) => {
        const { owner, logo } = data;
        return <>{<Owner owner={owner} image_url={logo} />}</>;
      },
    },
    reference_code: {
      label: 'Reference code for standards issued as requirements in England',
      accessor: 'reference_code',
    },
    release_date: {
      label: 'Release date',
      format: (val) => formatDate(val),
    },
    status: {
      label: 'Status',
      format: (val) => (
        <>
          <Tag type={val}>{val}</Tag>
          {
            <Details
              className="nhsuk-u-font-size-16 nhsuk-u-margin-top-4"
              summary="Show definitions of statuses"
            >
              <div className="nhsuk-details__text">
                <Paragraph>
                  <strong>Active standards</strong> are stable, maintained and
                  have been assured or endorsed for use by qualified bodies.
                </Paragraph>
                <Paragraph>
                  Standards <strong>in development</strong> are APIs or API
                  standards in alpha or beta, meaning they are available for use
                  but are still in progress and may change.
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
      label: 'Standard type',
      more: <CategoryDetails />,
    },
    contact_details: {
      label: 'Contact details',
      format: (_, data) => {
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
    section_title: 'Link to standard',
    documentation_help_text: {
      label: 'Documentation',
      format: (val, data) => (
        <>
          {val && <MarkdownBlock md={val} />}
          {data.documentation_link && (
            <ActionLink
              id="documentation-link"
              link={data.documentation_link}
              title={data.title}
            />
          )}
        </>
      ),
    },
    applies_to: {
      label: 'Applies to',
      format: (val) => val,
    },
    impacts_on: {
      label: 'Impacts on',
      format: (val) => val,
    },
    is_part_of: {
      label: 'Is part of',
      format: (val) => val,
    },
    comply_by_date: {
      label: 'Comply by',
      format: (val) => formatDate(val),
    },
    implementation_from_date: {
      label: 'Implementation from date',
      format: (val) => formatDate(val),
    },
  },

  {
    section_title: 'Topics and care settings',
    topic: {
      label: 'Topic',
      format: (val) => val,
    },
    care_setting: {
      label: 'Care setting',
      format: (val) => val,
    },
  },
  {
    section_title: 'Dependencies and related standards',
    dependencies: {
      label: 'Dependencies',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    related_standards: {
      label: 'Related standards',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
  },
  {
    section_title: 'Review Information',
    scope: {
      label: 'Scope',
      format: (val) => val,
    },
    sponsor: {
      label: 'Sponsor',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    senior_responsible_officer: {
      label: 'Senior Responsible Officer',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    business_lead: {
      label: 'Business Lead',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    contributor: {
      label: 'Contributor',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    assurance: {
      label: 'Assurance',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    approval_date: {
      label: 'Approval date',
      format: (val) => formatDate(val),
    },
    implementation_review_date: {
      label: 'Implementation Review Date',
      format: (val) => formatDate(val),
    },
    registration_status: {
      label: 'Registration Status',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    registration_authority: {
      label: 'Registration Authority',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
  },
  {
    section_title: 'Assurance and endorsements',
    assurance: {
      label: 'Quality assurance',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    legal_authority: {
      label: 'Legal authority',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    legal_authority_description: {
      label: 'Legal authority description',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    trusted_by: {
      label: 'Implemented by',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
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
    formatter: (val) => <strong>{sentenceCase(val)}</strong>,
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
          <DocumentationLink link={row.documentation_link} title={row.title} />
        </Dd>
      </Dl>
    ),
  },
];
