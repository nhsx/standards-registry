import classnames from 'classnames';

export default function Details({ summary, children, className, small }) {
  return (
    <details className={classnames('nhsuk-details', className)}>
      <summary className="nhsuk-details__summary">
        <span className={classnames('nhsuk-details__summary-text', { 'nhsuk-body-s': small })}>{ summary }</span>
      </summary>
      { children }
    </details>
  )
}
