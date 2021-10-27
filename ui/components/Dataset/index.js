import url from 'url';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Snippet, Tag, Flex, Pagination } from '../';
import upperFirst from 'lodash/upperFirst';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import styles from './style.module.scss';

const DATE_FORMAT = 'do MMM yyyy';

function Model({ model, includeType }) {
  const target = `/standards/model/${model.name}`;
  const status = (model.extras.find(e => e.key === 'status') || {}).value;
  const type = (model.extras.find(e => e.key === 'category') || {}).value || 'Uncategorised';
  return (
    <>
      <Link href={target}>
        <a>{ model.title }</a>
      </Link>
      <p>{ model.notes }</p>
      <Flex className="nhsuk-body-s">
        <div>
          Status: <Tag>{upperFirst(model.state)}</Tag>
        </div>
        <div>
          Last updated: {format(parseISO(model.metadata_modified), DATE_FORMAT)}
        </div>
      </Flex>
    </>
  )
}

export default function Dataset({ data = {}, searchTerm, includeType, pagination }) {
  const { count = 0, results = [] } = data;

  return (
    <>
      <h3>
        <Snippet num={count} plural={count > 1 || count === 0} searchTerm={searchTerm} inline>{searchTerm ? 'filters.summary' : 'filters.all'}</Snippet>
      </h3>
      <ul className={styles.list}>
        {
          results.map(model => (
            <li key={model.id} className={styles.listItem}><Model model={model} includeType={includeType} /></li>
          ))
        }
      </ul>
      <Pagination count={count} />
    </>
  )
}
