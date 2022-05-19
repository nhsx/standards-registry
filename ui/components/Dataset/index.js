import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Snippet, Tag, Flex, Pagination, FilterSummary, Select } from '../';
import upperFirst from 'lodash/upperFirst';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import classnames from 'classnames';
import styles from './style.module.scss';
import { useQueryContext } from '../../context/query';
import axios from 'axios';
import { useRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';

const DATE_FORMAT = 'do MMM yyyy';

function Embolden({ children }) {
  const { getSelections } = useQueryContext();
  const { q } = getSelections();
  const re = new RegExp(`(${q})`, 'ig');
  const replaced = children.replace(re, '<strong>$1</strong>');

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(replaced),
      }}
    />
  );
}

function Model({ model }) {
  const {
    name,
    status,
    title,
    metadata_modified,
    standard_category,
    description,
  } = model;
  const target = `/standards/${name}`;

  return (
    <>
      <Link href={target}>
        <a>
          <Embolden>{title}</Embolden>
        </a>
      </Link>
      <p>
        <Embolden>{description}</Embolden>
      </p>
      <Flex className="nhsuk-body-s">
        <p className={classnames('nhsuk-body-s', styles.noBottom)}>
          Type:{' '}
          <Tag type={standard_category} classes="nhsuk-body-s">
            {standard_category}
          </Tag>
        </p>
        <p className={classnames('nhsuk-body-s', styles.noBottom)}>
          Status: {upperFirst(status)}
        </p>
        <p
          className={classnames('nhsuk-body-s', styles.right, styles.noBottom)}
        >
          Last updated: {format(parseISO(metadata_modified), DATE_FORMAT)}
        </p>
      </Flex>
    </>
  );
}

function SortMenu({ searchTerm }) {
  const { getSelections, updateQuery } = useQueryContext();

  const sort = (value) => {
    const selections = getSelections();
    selections.sort = value;
    updateQuery(selections);
  };

  const options = [
    searchTerm && {
      label: 'Relevance',
      value: 'score desc',
    },
    {
      label: 'Updated (newest)',
      value: 'metadata_modified desc',
    },
    {
      label: 'Updated (oldest)',
      value: 'metadata_modified asc',
    },
    {
      label: 'A to Z',
      value: 'name asc',
    },
    {
      label: 'Z to A',
      value: 'name desc',
    },
  ];

  const { sort: value } = getSelections();

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

const CheckBox = () => {
  const { getSelections, updateQuery } = useQueryContext();
  const toggleMandated = (event) => {
    const selections = getSelections();
    const { name, checked } = event.target;
    delete selections[name];
    if (checked) {
      selections[name] = checked;
    }
    updateQuery(selections, { replace: true });
  };

  return (
    <div className={classnames('nhsuk-checkboxes__item', styles.checkboxItem)}>
      <input
        className="nhsuk-checkboxes__input nhsuk-u-font-size-16"
        id="mandated"
        name="mandated"
        type="checkbox"
        value="nationally mandated"
        onChange={toggleMandated}
      />
      <label
        className="nhsuk-label nhsuk-checkboxes__label nhsuk-u-font-size-16"
        htmlFor="mandated"
      >
        Mandatory in England
      </label>
    </div>
  );
};

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

const ResultSummary = ({ count, searchTerm, filtersSelected, loading }) => (
  <h3 id="resultSummary" data-loading={loading}>
    {(loading && 'Searching for results') || (
      <Snippet
        num={count}
        plural={count > 1 || count === 0}
        searchTerm={searchTerm}
        inline
      >
        {searchTerm || filtersSelected ? 'filters.summary' : 'filters.all'}
      </Snippet>
    )}
  </h3>
);

export default function Dataset({
  data: initialData = {},
  includeType,
  schema,
}) {
  const { getSelections, query } = useQueryContext();
  const searchTerm = query.q;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [queue, setQueue] = useState(null);
  const { count = 0, results = [] } = data;
  const filtersSelected = Object.keys(getSelections).length > 0;

  function pushToQueue() {
    setQueue(query);
  }

  async function getData() {
    if (loading || !queue) {
      return;
    }

    const DEFAULT_SORT = {
      score: 'desc',
      metadata_modified: 'desc',
    };

    const { q, page, sort = DEFAULT_SORT, ...filters } = queue;
    const params = {
      q,
      page,
      sort,
      filters,
    };

    try {
      setLoading(true);
      setQueue(null);
      const res = await axios.post('/api/refresh-list', params);
      setData(res.data);
    } catch (err) {
      console.error(err);
      const router = useRouter();
      router.reload(window.location.pathname);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => pushToQueue(), [query]);
  useEffect(() => getData(), [queue, loading]);

  return (
    <>
      <ResultSummary
        filtersSelected={filtersSelected}
        count={count}
        searchTerm={searchTerm}
        loading={!!(loading || queue)}
      />

      <FilterSummary schema={schema} />
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-one-half">
          <SortMenu searchTerm={searchTerm} />
        </div>
        <div className="nhsuk-grid-column-one-half">
          <CheckBox />
        </div>
      </div>
      {count > 0 ? (
        <ul className={styles.list} id="browse-results">
          {results.map((model) => (
            <li key={model.id} className={styles.listItem}>
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
