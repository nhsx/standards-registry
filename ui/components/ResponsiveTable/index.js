import { Table, Thead, Tr, Th, Tbody, Td, Select } from '../';
import { useRef, useEffect } from 'react';
import { useQueryContext } from '../../context/query';
import flatten from 'lodash/flatten';

import styles from './ResponsiveTable.module.scss';

export function ResponsiveTable({ schema, results }) {
  const { query, updateQuery } = useQueryContext();
  const table = useRef(null);
  const { orderBy, order } = query;

  const isSortable = schema.find((s) => s.sortable);

  function setSort(col) {
    if (col) {
      const [orderBy, order] = col.split(' ');
      updateQuery({ orderBy, order });
    } else {
      updateQuery({ orderBy: null, order: null });
    }
  }

  function handleWindowResize() {
    const headerRow = table.current.querySelector('thead tr');
    const ths = [...headerRow.getElementsByTagName('th')];

    ths.forEach((item) => {
      const div = item.querySelector('.width-wrapper');
      if (div) {
        Array.from(div.childNodes).forEach((node) => item.appendChild(node));
        div.remove();
      }
    });
  }

  function setFixedWidths() {
    const headerRow = table.current.querySelector('thead tr');

    Array.from(headerRow.cells).forEach((cell) => {
      if (cell.querySelector('div')) {
        return;
      }
      const div = document.createElement('div');
      div.classList.add('width-wrapper');
      Array.from(cell.childNodes).forEach((node) => div.appendChild(node));
      cell.appendChild(div);
      div.style.width = `${div.offsetWidth}px`;
    });
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('resize', detectFinish);

    let timeout;
    function detectFinish() {
      clearTimeout(timeout);
      timeout = setTimeout(setFixedWidths, 100);
    }

    setFixedWidths();

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('resize', detectFinish);
    };
  }, []);

  return (
    <div className={styles.responsiveTable}>
      {isSortable && (
        <div className={styles.mobileSort}>
          <label>
            Order by
            <Select
              onChange={setSort}
              className={styles.select}
              value={orderBy && order && `${orderBy} ${order}`}
              options={flatten([
                ...schema
                  .filter((s) => s.sortable)
                  .map((s) => {
                    return [
                      {
                        label: `${s.title} (A to Z)`,
                        value: `${s.id} asc`,
                      },
                      {
                        label: `${s.title} (Z to A)`,
                        value: `${s.id} desc`,
                      },
                    ];
                  }),
              ])}
            />
          </label>
        </div>
      )}

      <Table ref={table}>
        <Thead>
          <Tr>
            {schema.map((s) => (
              <Th
                key={s.id}
                sortable={s.sortable}
                col={s.id}
                defaultSort={s.defaultSort}
              >
                {s.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {results.map((result, index) => (
            <Tr key={index}>
              {schema.map((s) => {
                const value = result[s.id];
                return (
                  <Td key={s.id} title={s.title}>
                    {Array.isArray(value) && value.length > 0 ? (
                      <ul className="nhsuk-list-bullet nhsuk-u-font-size-16">
                        {value.map((val, index) => (
                          <li key={index}>
                            {s.formatter ? s.formatter(val, result) : val}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      (s.formatter && s.formatter(value, result)) || value
                    )}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
