import classnames from 'classnames';
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
    <thead role="rowgroup" className="nhsuk-table__head">
      {children}
    </thead>
  );
}

export function Tr({ children }) {
  return (
    <tr role="row" className="nhsuk-table__row">
      {children}
    </tr>
  );
}

export function Th({ children }) {
  return (
    <th role="columnheader" scope="col">
      {children}
    </th>
  );
}

export function Td({ children, classes }) {
  return (
    <td
      role="cell"
      className={classnames(
        'nhsuk-table__cell',
        'nhsuk-u-font-size-16',
        classes
      )}
    >
      {children}
    </td>
  );
}

export function Table({ children }) {
  return (
    <table className="nhsuk-table" role="table">
      {children}
    </table>
  );
}
