export function Radio({ options, onChange, id, value, name }) {
  return (
    <>
      <div
        className="nhsuk-radio nhsuk-u-font-size-16 nhsuk-u-margin-top-3"
        name={name}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {options.filter(Boolean).map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              name={name}
              id={option.id || option.name}
              value={option.value}
            />
            <span value={option.value} key={option.value}>
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
