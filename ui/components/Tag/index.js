import classnames from 'classnames';
import { upperFirst } from 'lodash';

const formatTagValue = (value) => upperFirst(value.replace(/-/g, ' '));

const colorMap = {
  proposed: 'nhsuk-tag--white',
  draft: 'nhsuk-tag--grey',
  'awaiting-approval': 'nhsuk-tag--aqua-green',
  cancelled: 'nhsuk-tag--pink',
  'draft-in-progress': 'nhsuk-tag--grey',
  'on-hold': 'nhsuk-tag--yellow',

  active: 'nhsuk-tag--green',
  'in-development': 'nhsuk-tag--grey',
  deprecated: 'nhsuk-tag--orange',
  retired: 'nhsuk-tag--red',
};

export default function TypeTag({ children, classes, type }) {
  return (
    <span
      className={classnames(
        'nhsuk-tag',
        classes,
        (type && typeof type === 'string' && colorMap[type.toLowerCase()]) ||
          null
      )}
    >
      {formatTagValue(children)}
    </span>
  );
}
