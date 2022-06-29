import classnames from 'classnames';
import { useQueryContext } from '../../context/query'
import styles from './style.module.scss';

export function Tbody({ children }) {
  return (
    <tbody
      className={classnames(
        'nhsuk-table__body nhsuk-u-font-size-16',
        styles.tbody
      )}
    >
      {children}
    </tbody>
  );
}

export function Thead({ children }) {
  return (
    <thead role="rowgroup" className={classnames('nhsuk-table__head', styles.thead)}>
      {children}
    </thead>
  );
}

export function Tr({ children }) {
  return (
    <tr role="row" className={classnames('nhsuk-table__row', styles.tr)}>
      {children}
    </tr>
  );
}

export function Th({ children, sortable, col, ...props }) {
  const { query, updateQuery } = useQueryContext();
  const { orderBy, order } = query;

  function onClick(e) {
    e.preventDefault();
    if (orderBy !== col) {
      updateQuery({ orderBy: col, order: 'asc' })
    } else {
      if (order === 'asc') {
        updateQuery({ order: 'desc' })
      } else {
        updateQuery({ orderBy: null, order: null })
      }
    }
  }


  return (
    <th className={classnames(styles.th)} role="columnheader" scope="col" aria-sort={orderBy === col ? order : null}>
      {
        sortable
          ? <a href="#" onClick={onClick}>
            { children }
          </a>
          : children
      }
    </th>
  );
}

export function Td({ children, classes, title }) {
  return (
    <td
      role="cell"
      title={title}
      className={classnames(
        'nhsuk-table__cell',
        'nhsuk-u-font-size-16',
        styles.td,
        classes
      )}
    >
      {children}
    </td>
  );
}

export function Table({ children }) {
  return (
    <table className={classnames('nhsuk-table', styles.table)} role="table">
      {children}
    </table>
  );
}
