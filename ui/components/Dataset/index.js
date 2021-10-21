import Link from 'next/link';
import { useRouter } from 'next/router';
import { Snippet, Tag, Flex } from '../';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import styles from './style.module.scss';

const DATE_FORMAT = 'do MMM yyyy';

function Item({ id, title, content, updatedAt }) {
  const router = useRouter();
  const target = `${router.asPath}/${id}`;
  return (
    <>
      <Link href={target}>
        <a>{ title }</a>
      </Link>
      <p>{ content }</p>
      <Flex className="nhsuk-body-s">
        <div>
          Status: <Tag>Active</Tag>
        </div>
        <div>
          Compliance: required
        </div>
        <div>
          Last updated: {format(parseISO(updatedAt), DATE_FORMAT)}
        </div>
      </Flex>
    </>
  )
}

export default function Dataset({ data }) {
  const count = data.length;

  return (
    <>
      <h4><Snippet num={count} plural={count > 1}>filters.summary</Snippet></h4>
      <ul className={styles.list}>
        {
          data.map(datum => (
            <li key={datum.id}><Item {...datum} /></li>
          ))
        }
      </ul>
    </>
  )
}
