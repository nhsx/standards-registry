import { useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './Modal.module.scss';

export function Modal({
  trigger = 'Open modal',
  children,
  className,
  closeLabel = 'X',
  closeButton,
}) {
  const [open, setOpen] = useState(false);

  function toggleOpen(e) {
    e.preventDefault();
    setOpen(!open);
  }

  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [open]);

  return (
    <div className={classnames('modal-wrapper', className)}>
      <p>
        <a href="#" onClick={toggleOpen}>
          {trigger}
        </a>
      </p>
      {open && (
        <div className={styles.modal}>
          <a href="#" className={styles.close} onClick={toggleOpen}>
            {closeLabel}
          </a>
          {children}
          {closeButton && (
            <button
              className={classnames('nhsuk-button', styles.closeButton)}
              onClick={toggleOpen}
            >
              {closeButton}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
