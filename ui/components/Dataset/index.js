import Link from 'next/link';
import { Snippet, Tag, Flex, Pagination } from '../';
import upperFirst from 'lodash/upperFirst';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import classnames from 'classnames';
import styles from './style.module.scss';
import { useQueryContext } from '../../context/query';

const DATE_FORMAT = 'do MMM yyyy';

function Model({ model }) {
  const { name, status, title, metadata_modified, description } = model;
  const target = `/standards/${name}`;
  return (
    <>
      <Link href={target}>
        <a>{title}</a>
      </Link>
      <p>{description}</p>
      <Flex className="nhsuk-body-s">
        <p className={classnames('nhsuk-body-s', styles.noBottom)}>
          Status:{' '}
          <Tag status={status} classes="nhsuk-body-s">
            {upperFirst(status)}
          </Tag>
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

  const sort = event => {
    const selections = getSelections();
    selections.sort = event.target.value;
    updateQuery(selections, { replace: true });
  };

  const options = [
    searchTerm && {
      label: 'Relevance',
      value: 'score desc'
    },
    {
      label: 'Updated (newest)',
      value: 'metadata_modified desc'
    },
    {
      label: 'Updated (oldest)',
      value: 'metadata_modified asc'
    },
    {
      label: 'A-Z',
      value: 'name asc'
    },
    {
      label: 'Z-A',
      value: 'name desc'
    }
  ];

  const { sort: value } = getSelections();

  return <div className="nhsuk-form-group">
    <label className="nhsuk-label" htmlFor="sort">Sort by</label>
    <select  className="nhsuk-select" name="sort" id="sort" onChange={sort}>
      {
        options.filter(Boolean).map(option => <option value={option.value} key={option.value} selected={option.value === value}>{ option.label }</option>)
      }
    </select>
  </div>;
}

export default function Dataset({ data = {}, searchTerm, includeType }) {
  const { getSelections } = useQueryContext();
  const { count = 0, results = [] } = data;
  const filtersSelected = Object.keys(getSelections).length > 0;


  return (
    <>
      <h3>
        <Snippet
          num={count}
          plural={count > 1 || count === 0}
          searchTerm={searchTerm}
          inline
        >
          {searchTerm || filtersSelected ? 'filters.summary' : 'filters.all'}
        </Snippet>
      </h3>
      <SortMenu searchTerm={searchTerm} />
      <ul className={styles.list}>
        {results.map((model) => (
          <li key={model.id} className={styles.listItem}>
            <Model model={model} includeType={includeType} />
          </li>
        ))}
      </ul>
      <Pagination count={count} />
    </>
  );
}
