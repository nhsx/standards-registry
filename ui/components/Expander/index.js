import { useState, useEffect } from 'react';
import classnames from 'classnames';

export default function Expander({ summary, children, className, small, open = false, onToggle = () => {} }) {

  const [isOpen, setOpen] = useState(open);
  useEffect(() => {
    setOpen(open);
  }, [open])

  return (
    <details
      className={classnames('nhsuk-details nhsuk-expander', className)}
      open={isOpen}
      onToggle={onToggle}
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
