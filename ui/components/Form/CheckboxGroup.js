import classnames from 'classnames';
import styles from './CheckboxGroup.module.scss';

function getOptionId(id, option) {
  const key = option.value
    .toString()
    .split('')
    .reduce((str, char) => str + char.charCodeAt(0), '');
  return `${id}-${option.value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')}-${key}`;
}

export default function CheckboxGroup({
  id,
  name,
  legend,
  hint,
  options,
  small,
  onChange,
  parent,
}) {
  options = options.map((option) => {
    if (typeof option === 'string') {
      return {
        label: option,
        value: option,
      };
    }
    if (!option.label) {
      option.label = option.value;
    }
    return option;
  });

  return (
    <div
      className={classnames(
        'nhsuk-checkbox-group',
        'nhsuk-form-group',
        styles.checkboxGroup
      )}
    >
      <fieldset id={id || name} className="nhsuk-fieldset">
        <legend className="nhsuk-fieldset__legend">{legend}</legend>
        {hint && <div className="nhsuk-hint">{hint}</div>}
        <div
          className={classnames('nhsuk-checkboxes', styles.checkboxes, {
            [styles.small]: small,
          })}
        >
          {options.map((option) => {
            const optionId = getOptionId(id || name, option);
            return (
              <div
                key={option.value}
                className={classnames(
                  'nhsuk-checkboxes__item',
                  'nhsuk-u-font-size-16',
                  styles.item
                )}
              >
                <input
                  className={classnames(
                    'nhsuk-checkboxes__input',
                    'nhsuk-u-font-size-16',
                    styles.input
                  )}
                  id={optionId}
                  parent={parent}
                  name={name}
                  type="checkbox"
                  value={option.value}
                  onChange={onChange}
                />
                <label
                  className={classnames(
                    'nhsuk-label',
                    'nhsuk-checkboxes__label',
                    'nhsuk-u-font-size-16',
                    styles.label
                  )}
                  htmlFor={optionId}
                >
                  {option.label}
                </label>
                {option.hint && (
                  <span className="nhsuk-hint">{option.hint}</span>
                )}
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
