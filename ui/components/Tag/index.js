import classnames from 'classnames';

const colorMap = {
  active: 'nhsuk-tag--green',
  deprecated: 'nhsuk-tag--orange',
  retired: 'nhsuk-tag--red',
  draft: 'nhsuk-tag--grey',
  // proposed: 'nhsuk-tag--grey',
  // awaiting: 'nhsuk-tag--grey',
  // discontinued: 'nhsuk-tag--grey',
};

export default function TypeTag({ children, classes, type }) {
  return (
    <span
      className={classnames(
        'nhsuk-tag',
        classes,
        colorMap[type.toLowerCase()] || null
      )}
    >
      {children}
    </span>
  );
}
