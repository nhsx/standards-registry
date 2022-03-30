import classnames from 'classnames';

export default function Expander({ summary, children, className, small, open }) {
  return (
    <details
      className={classnames('nhsuk-details nhsuk-expander', className)}
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
      <div className="nhsuk-details__text">
        {children}
      </div>
    </details>
  );
}
