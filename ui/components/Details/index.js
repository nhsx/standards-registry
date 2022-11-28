import classnames from 'classnames';

export default function Details({ summary, children, className, open }) {
  return (
    <details
      className={classnames('nhsuk-details', className)}
      open={open || false}
    >
      <summary className="nhsuk-details__summary">{summary}</summary>
      {children}
    </details>
  );
}
