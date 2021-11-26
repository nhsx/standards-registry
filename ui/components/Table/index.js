import classnames from 'classnames';

export function Tbody({ children }) {
  return <tbody className="nhsuk-table__body">{children}</tbody>;
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
