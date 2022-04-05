import classnames from 'classnames';

const typeMap = {
  technical: 'nhsuk-tag--blue',
  governance: 'nhsuk-tag--grey',
  clinical: 'nhsuk-tag--orange',
  dictioary: 'nhsuk-tag--green',
};

export default function Tag({ children, classes, type }) {
  return (
    <span
      className={classnames('nhsuk-tag', classes, typeMap[type] || null)}
    >
      {children}
    </span>
  );
}
