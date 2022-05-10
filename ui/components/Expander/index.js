import { useState, useEffect } from 'react';
import classnames from 'classnames';

import styles from './Expander.module.scss';

export default function Expander({ summary, children, className, small, open = false, onToggle = () => {} }) {

  const [isOpen, setOpen] = useState(open);
  useEffect(() => {
    setOpen(open);
  }, [open])

  return (
    <details
      className={classnames('nhsuk-details', className, styles.details)}
      open={isOpen}
      onToggle={onToggle}
    >
      <summary className={classnames('nhsuk-details__summary', styles.summary)}>
        <span
          className={classnames('nhsuk-details__summary-text', {
            'nhsuk-body-s': small,
          })}
        >
          {summary}
        </span>
      </summary>
      <div className={classnames('nhsuk-details__text', styles.detailsText)}>
        {children}
      </div>
    </details>
  );
}
