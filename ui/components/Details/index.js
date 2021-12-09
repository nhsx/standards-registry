import classnames from 'classnames';

export default function Details({ summary, children, className, small, open }) {
  return (
    <details
      className={classnames('nhsuk-details', className)}
      open={open || false}
    >
      <summary className="nhsuk-details__summary">
        <span
          className={classnames('nhsuk-details__summary-text', {
            'nhsuk-body-s': small,
          })}
        >
          {summary}
        </span>
      </summary>
      {children}
    </details>
  );
}
