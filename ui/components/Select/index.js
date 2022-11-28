export function Select({ options, onChange, id, value, label, showAll, name }) {
  return (
    // <div className={classNames('nhsuk-form-group', className)}>
    <>
      {' '}
      {label && (
        <label className="nhsuk-label nhsuk-u-font-size-16" htmlFor={name}>
          {label}
        </label>
      )}
      <select
        className="nhsuk-select nhsuk-u-font-size-16 nhsuk-u-margin-top-3"
        name={name}
        id={id || name}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {showAll && <option value="">Show all</option>}
        {options.filter(Boolean).map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
