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

  const sort = (event) => {
    const selections = getSelections();
    selections.sort = event.target.value;
    updateQuery(selections, { replace: true });
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
      label: 'A-Z',
      value: 'name asc',
    },
    {
      label: 'Z-A',
      value: 'name desc',
    },
  ];

  const { sort: value } = getSelections();

  return (
    <div className="nhsuk-form-group">
      <label className="nhsuk-label nhsuk-u-font-size-16" htmlFor="sort">
        Sort by
      </label>
      <select
        className="nhsuk-select nhsuk-u-font-size-16"
        name="sort"
        id="sort"
        onChange={sort}
        value={value}
      >
        {options.filter(Boolean).map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
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
        Nationally mandated
      </label>
    </div>
  );
};

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
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-one-half">
          <SortMenu searchTerm={searchTerm} />
        </div>
        <div className="nhsuk-grid-column-one-half">
          <CheckBox />
        </div>
      </div>
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
