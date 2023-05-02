import classnames from 'classnames';
import { useState, useEffect } from 'react';
import { useQueryContext } from '../../context/query';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { CheckboxGroup, OptionSelect, Expander, Select } from '../';

import styles from './Filters.module.scss';

const RequirementCheckBox = () => {
  const { getSelections, updateQuery } = useQueryContext();

  const selections = getSelections();

  const toggleMandated = (event) => {
    const { name, checked } = event.target;
    delete selections[name];
    if (checked) {
      selections[name] = checked;
    }
    updateQuery(selections, { replace: true });
  };

  return (
    <Expander
      summary={'Requirement'}
      className={classnames('nhsuk-filter', styles.filter)}
      noBorderTop={false}
      title="Requirement"
    >
      <div
        className={classnames(
          'nhsuk-checkboxes__item nhsuk-u-margin-bottom-4',
          styles.checkboxItem
        )}
      >
        <input
          className="nhsuk-checkboxes__input nhsuk-u-font-size-16"
          id="mandated"
          name="mandated"
          type="checkbox"
          value="nationally mandated"
          checked={getSelections().mandated === 'true'}
          onChange={toggleMandated}
        />
        <label
          className={classnames(
            'nhsuk-label',
            'nhsuk-checkboxes__label',
            'nhsuk-u-font-size-16',
            styles.requirementLabel
          )}
          htmlFor="mandated"
        >
          National requirement
        </label>
      </div>
    </Expander>
  );
};

const PublishedCheckBox = () => {
  const { getSelections, updateQuery } = useQueryContext();
  const [isPublished, setIsPublished] = useState(false);
  const [isFuture, setIsFuture] = useState(false);

  const selections = getSelections();

  useEffect(() => {
    const selections = getSelections();
    if (selections.is_published_standard === undefined) {
      setIsPublished(false);
      setIsFuture(false);
      return;
    }

    if (selections.is_published_standard === 'true') {
      setIsPublished(true);
      setIsFuture(false);
      return;
    }

    if (selections.is_published_standard === 'false') {
      setIsPublished(false);
      setIsFuture(true);
      return;
    }

    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearChoices = (event) => {
    setIsPublished(false);
    setIsFuture(false);
    const { name } = event.target;
    delete selections[name];
    updateQuery(selections, { replace: true });
  };

  const onClearAllClicked = (e) => {
    e.target.name = 'is_published_standard';
    e.preventDefault();
    clearChoices(e);
  };

  const updatePublished = (event) => {
    const { name, value } = event.target;
    let queryValue = undefined;
    switch (value) {
      case 'published':
        setIsPublished(true);
        setIsFuture(false);
        queryValue = 'true';
        break;
      case 'future':
        setIsFuture(true);
        setIsPublished(false);
        queryValue = 'false';
        break;
    }

    delete selections[name];
    if (queryValue !== undefined) {
      selections[name] = queryValue;
    }

    updateQuery(selections, { replace: true });
  };

  return (
    <Expander
      summary={'Published/Future Standard'}
      className={classnames('nhsuk-filter', styles.filter)}
      noBorderTop={false}
      title="Published/Future Standard"
    >
      <div
        className={classnames(
          'nhsuk-checkboxes__item nhsuk-u-margin-bottom-4',
          styles.checkboxItem
        )}
      >
        <input
          className="nhsuk-checkboxes__input nhsuk-u-font-size-16"
          id="is_published_standard"
          name="is_published_standard"
          type="checkbox"
          value="published"
          checked={isPublished}
          onChange={updatePublished}
        />
        <label
          className={classnames(
            'nhsuk-label',
            'nhsuk-checkboxes__label',
            'nhsuk-u-font-size-16',
            styles.requirementLabel
          )}
          htmlFor="mandated"
        >
          Published
        </label>
      </div>

      <div
        className={classnames(
          'nhsuk-checkboxes__item nhsuk-u-margin-bottom-4',
          styles.checkboxItem
        )}
      >
        <input
          className="nhsuk-checkboxes__input nhsuk-u-font-size-16"
          id="is_future_standard"
          name="is_published_standard"
          type="checkbox"
          value="future"
          checked={isFuture}
          onChange={updatePublished}
        />
        <label
          className={classnames(
            'nhsuk-label',
            'nhsuk-checkboxes__label',
            'nhsuk-u-font-size-16',
            styles.requirementLabel
          )}
          htmlFor="mandated"
        >
          Future
        </label>
      </div>
      <a
        href="#"
        className={classnames(styles.clearAll)}
        onClick={onClearAllClicked}
      >
        Clear all
      </a>
    </Expander>
  );
};

export function Filter({
  label,
  choices,
  onChange,
  field_name: fieldName,
  open,
  useSelect,
  numActive = 0,
  onlyChild,
  fullHeight,
  clearAll,
  onClearAllClick,
  clearAllAlign,
  noBorderTop,
}) {
  const { query, updateQuery } = useQueryContext();
  if (onlyChild && !fullHeight) {
    label = `Filter by ${label.toLowerCase()}`;
  }
  const summary = useSelect ? null : (
    <span className={styles.filterHeader}>
      {label}

      {numActive > 0 ? <span>{numActive} selected</span> : null}
    </span>
  );

  function onSelectChange(val) {
    updateQuery({ ...query, [fieldName]: val || [] });
  }

  if (useSelect) {
    return (
      <Expander
        summary={summary}
        className={classnames('nhsuk-filter', styles.filter)}
        open={open}
        noBorderTop={noBorderTop}
        title={label}
      >
        <label className="nhsuk-heading-m nhsuk-u-padding-top-3">
          {label}
          {summary}
          <Select
            options={choices}
            onChange={onSelectChange}
            showAll={true}
            value={query[fieldName] || ''}
          />
        </label>
        {clearAll && (
          <a
            href="#"
            className={classnames(styles.clearAll, styles[clearAllAlign])}
            onClick={onClearAllClick}
          >
            Clear all
          </a>
        )}
      </Expander>
    );
  }

  return (
    <Expander
      summary={summary}
      className={classnames('nhsuk-filter', styles.filter)}
      open={open}
      noBorderTop={noBorderTop}
      title={label}
    >
      <OptionSelect fullHeight={fullHeight}>
        <CheckboxGroup
          onChange={onChange}
          options={choices}
          parent={fieldName}
          legend={label}
          small
        />
      </OptionSelect>
      {clearAll && (
        <a
          href="#"
          className={classnames(styles.clearAll, styles[clearAllAlign])}
          onClick={onClearAllClick}
        >
          Clear all
        </a>
      )}
    </Expander>
  );
}

const select = (names, fields) =>
  (Array.isArray(names) ? names : [names]).map((name) =>
    fields.find((val) => val.field_name === name)
  );

export function Filters({
  schema,
  categories = ['care_setting', 'topic', 'status', 'standard_category'],
  title = 'Filters',
  showTitle,
  before,
  expanded,
  className,
  clearAll = true,
  clearAllAlign = 'left',
  fullHeight,
  noBorderTop,
  showRequirementFilter,
  showPublishedFilter,
}) {
  const { dataset_fields: fields } = schema;
  const { query, updateQuery } = useQueryContext();
  const [openFilters, setOpenFilters] = useState([]);

  const setItem = (name) => (event) => {
    const { checked, value } = event.target;
    let filter = query[name];
    if (filter && !Array.isArray(filter)) {
      filter = [filter];
    }
    if (checked) {
      return updateQuery({
        [name]: filter ? [...filter, value] : [value],
      });
    }
    if (!filter || !filter.includes(value)) {
      return;
    }
    const newVal = filter.filter((val) => val !== value);
    return updateQuery({
      [name]: newVal.length ? newVal : null,
    });
  };

  const filters = select(categories, fields).map((item) => {
    switch (item.field_name) {
      case 'status':
        return mapStatus(item);
      default:
        return item;
    }
  });

  function mapStatus(item) {
    return {
      ...item,
      label: 'Status',
      choices: ['in-development', 'active', 'deprecated', 'retired'].map(
        (value) => {
          const choice = item.choices.find((c) => c.value === value);
          if (value === 'in-development') {
            return {
              ...choice,
              value,
              label: 'In development (APIs only)',
            };
          }
          return choice;
        }
      ),
    };
  }

  function onClearAllClick(e) {
    e.preventDefault();
    updateQuery(pick(query, 'q', 'page', 'orderBy', 'order'), {
      overwrite: true,
    });
  }

  useEffect(() => setOpenFilters(Object.keys(query)), [query]);

  const activeFilters = omit(query, 'q', 'page', 'orderBy', 'order');
  showTitle = showTitle || filters.length > 1;

  return (
    <div className={classnames('nhsuk-filters', styles.filters, className)}>
      {showTitle && title && <h2 className="nhsuk-heading-m">{title}</h2>}
      {before}
      <div className={classnames('nhsuk-expander-group', styles.clear)}>
        {filters.map((filter) => {
          let fieldFilters = activeFilters[filter.field_name] || [];
          if (!Array.isArray(fieldFilters)) {
            fieldFilters = [fieldFilters];
          }
          const numActive = fieldFilters.length;
          filter.choices = filter.choices.map((opt) => ({
            ...opt,
            checked: fieldFilters.includes(opt.value),
          }));

          return (
            <Filter
              key={filter.field_name}
              {...filter}
              open={expanded || openFilters.includes(filter.field_name)}
              onChange={
                filter.onChange ? filter.onChange : setItem(filter.field_name)
              }
              numActive={numActive}
              // TODO: this should be configured in schema
              //useRadio={filter.field_name === 'standard_category'}
              onlyChild={filters.length === 1}
              fullHeight={fullHeight}
              onClearAllClick={onClearAllClick}
              clearAll={clearAll}
              clearAllAlign={clearAllAlign}
              noBorderTop={noBorderTop}
            />
          );
        })}
        {showRequirementFilter && <RequirementCheckBox />}
        {showPublishedFilter && <PublishedCheckBox />}
      </div>
    </div>
  );
}
