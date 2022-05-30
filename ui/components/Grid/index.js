import classnames from 'classnames';
import { Children, cloneElement } from 'react';

function getClassName(total, cols) {
  if (total === 1 || total === cols) {
    return 'nhsuk-grid-column-one-half';
  }

  let type;
  let numword = 'one';

  if (cols === 2) {
    numword = 'two';
  }
  if (cols === 3) {
    numword = 'three';
  }

  switch (total) {
    case 4:
      type = 'quarter';
      break;
    case 3:
      type = 'third';
      break;
    case 2:
    case 1:
      type = 'half';
  }

  return `nhsuk-grid-column-${numword}-${type}${cols > 1 ? 's' : ''}`;
}

export function Row({ children, className }) {
  const total = Children.toArray(children).reduce((t, child) => {
    return t + (parseInt(child.props.colspan, 10) || 1);
  }, 0);

  if (total === 0 || total > 4) {
    throw new Error('Number of cols should be between 1 and 4');
  }

  return (
    <div className={classnames('nhsuk-grid-row', className)}>
      {Children.map(
        children,
        (child) => child && cloneElement(child, { total })
      )}
    </div>
  );
}

export function Col({ children, total, colspan, className }) {
  return (
    <div className={className || getClassName(total, colspan)}>{children}</div>
  );
}
