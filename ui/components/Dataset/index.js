import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Tag, Flex, Pagination, FilterSummary, Select } from '../';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import classnames from 'classnames';
import styles from './style.module.scss';
import { useQueryContext } from '../../context/query';
import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';

export const formatDate = (date, dateFormat = 'd MMM yyyy') =>
  format(parseISO(date), dateFormat);

function escapeRegExp(text) {
  return text && text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function Embolden({ children }) {
  const { getSelections } = useQueryContext();
  const { q } = getSelections();
  const escapedQuery = escapeRegExp(q);
  const re = new RegExp(`(${escapedQuery})`, 'ig');
  const replaced = children ? children.replace(re, '<strong>$1</strong>') : '';

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(replaced),
      }}
    />
  );
}

function StandardTypeBadge({ isPublishedStandard }) {
  return (
    <div>
      {isPublishedStandard ? (
        <Tag type="active" classes="nhsuk-body-s">
          Published standard
        </Tag>
      ) : (
        <Tag type="future" classes="nhsuk-body-s">
          Future standard
        </Tag>
      )}
    </div>
  );
}

function Model({ model }) {
  const {
    name,
    status,
    title,
    metadata_created,
    description,
    is_published_standard,
  } = model;
  const target = `/published-standards/${name}`;

  <Tag type={status} classes="nhsuk-body-s">
    {status}
  </Tag>;

  return (
    <>
      <div className={classnames(styles.standardHeader)}>
        <div className={classnames(styles.standardTitle)}>
          <Link href={target}>
            <a>
              <Embolden>{title}</Embolden>
            </a>
          </Link>
        </div>
        <div className={classnames(styles.standardFlag)}>
          <StandardTypeBadge isPublishedStandard={is_published_standard} />
        </div>
      </div>
      <p>
        <Embolden>{description}</Embolden>
      </p>
      <Flex className="nhsuk-body-s">
        <p className={classnames('nhsuk-body-s', styles.noBottom)}>
          Status:{' '}
          <Tag type={status} classes="nhsuk-body-s">
            {status}
          </Tag>
        </p>
        <p className={classnames('nhsuk-body-s', styles.noBottom)}>
          Date added: {formatDate(metadata_created)}
        </p>
      </Flex>
    </>
  );
}

function SortMenu({ searchTerm }) {
  const { query, updateQuery } = useQueryContext();

  const sort = (value) => {
    const [orderBy, order] = value.split(' ');
    updateQuery({ orderBy, order });
  };

  const options = [
    searchTerm && {
      label: 'Relevance',
      value: 'score desc',
    },
    {
      label: 'Name (A to Z)',
      value: 'name asc',
      selected: 'selected',
    },
    {
      label: 'Name (Z to A)',
      value: 'name desc',
    },
    {
      label: 'Added (newest)',
      value: 'metadata_created desc',
    },
    {
      label: 'Added (oldest)',
      value: 'metadata_created asc',
    },
  ];

  const value = `${query.orderBy} ${query.order}`;

  return (
    <Select
      label="Order by"
      options={options}
      value={value}
      onChange={sort}
      name="sort"
    />
  );
}

const NoResultsSummary = ({ searchTerm }) => (
  <>
    <h3>
      There are no matching results{searchTerm ? ` for ${searchTerm}` : null}.
    </h3>
    <p>Improve your search results by:</p>
    <ul>
      <li>removing filters</li>
      <li>double checking your spelling</li>
      <li>using fewer keywords</li>
      <li>searching for something less specific</li>
    </ul>
  </>
);

const ResultSummary = ({ count, loading }) => (
  <h2 id="resultSummary" data-loading={loading}>
    {(loading && 'Searching for results') || (
      <span role="status">{`${count} result${count === 1 ? '' : 's'}`}</span>
    )}
  </h2>
);

export default function Dataset({
  data: initialData = {},
  includeType,
  schema,
  futureAndPublished = false,
}) {
  const { query, updateQuery } = useQueryContext();
  const searchTerm = query.q;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const { count = 0, results = [] } = data;
  const [pageLoaded, setPageLoaded] = useState(false);
  const filtersSelected = Object.keys(query).length > 0;

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const res = await axios.post('/api/refresh-list', {
          ...query,
          futureAndPublished,
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    // we dont want to fetch data on initial load.
    if (pageLoaded) {
      getData();
    }

    // we don't want pageLoaded in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    let orderBy = null;
    let order = null;
    if (!searchTerm || searchTerm === '') {
      orderBy = 'name';
      order = 'asc';
    }

    updateQuery({ ...query, orderBy, order });
    setPageLoaded(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ResultSummary
        filtersSelected={filtersSelected}
        count={count}
        searchTerm={searchTerm}
        loading={!!loading}
      />

      <FilterSummary schema={schema} />
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-one-half">
          <SortMenu searchTerm={searchTerm} />
        </div>
      </div>
      {count > 0 ? (
        <ul className={styles.list} id="browse-results">
          {results.map((model, index) => (
            <li key={model.id || index} className={styles.listItem}>
              <Model model={model} includeType={includeType} />
            </li>
          ))}
        </ul>
      ) : (
        <NoResultsSummary searchTerm={searchTerm} />
      )}
      <Pagination count={count} />
    </>
  );
}
