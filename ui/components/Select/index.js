export function Select({ options, onChange, id, value, label, showAll }) {
  return (
    <div className="nhsuk-form-group">
      {
        label && (
          <label className="nhsuk-label nhsuk-u-font-size-16" htmlFor={id}>
            {label}
          </label>
        )
      }

      <select
        className="nhsuk-select nhsuk-u-font-size-16"
        name={id}
        id={id}
        onChange={e => onChange(e.target.value)}
        value={value}
      >
        {
          showAll && <option value="">Show all</option>
        }
        {options.filter(Boolean).map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
