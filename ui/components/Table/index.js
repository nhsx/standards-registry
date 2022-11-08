import classnames from 'classnames';
import { forwardRef } from 'react';
import { useQueryContext } from '../../context/query';
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
    <thead
      role="rowgroup"
      className={classnames('nhsuk-table__head', styles.thead)}
    >
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

export function Th({ children, sortable, col, defaultSort }) {
  const { query, updateQuery } = useQueryContext();
  let { orderBy, order } = query;

  if (defaultSort && !orderBy) {
    orderBy = col;
    order = defaultSort;
  }

  function onClick(e) {
    e.preventDefault();
    if (orderBy !== col) {
      updateQuery({ orderBy: col, order: 'asc' });
    } else {
      updateQuery({ order: order === 'asc' ? 'desc' : 'asc', orderBy: col });
    }
  }

  const ariaSortLabel = { asc: 'ascending', desc: 'descending' };

  return (
    <th
      className={classnames(styles.th)}
      role="columnheader"
      aria-label={`${children} heading`}
      scope="col"
      aria-sort={orderBy === col ? ariaSortLabel[order] : 'none'}
    >
      {sortable ? (
        <a href="#" onClick={onClick}>
          {children}
        </a>
      ) : (
        children
      )}
    </th>
  );
}

export function Td({ children, classes, title, ...props }) {
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
      {...props}
    >
      {children}
    </td>
  );
}

export const Table = forwardRef(({ children }, ref) => {
  return (
    <table
      className={classnames('nhsuk-table', styles.table)}
      role="table"
      ref={ref}
    >
      {children}
    </table>
  );
});

Table.displayName = 'Table';
