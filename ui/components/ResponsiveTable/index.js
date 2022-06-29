import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Select
} from '../'
import { useQueryContext } from '../../context/query'

import styles from './ResponsiveTable.module.scss'

export function ResponsiveTable({ schema, results }) {
  const { query, updateQuery } = useQueryContext();
  const { orderBy, order } = query;

  const isSortable = schema.find(s => s.sortable);

  function setSort(col) {
    if (col) {
      updateQuery({ orderBy: col, order: 'asc' })
    } else {
      updateQuery({ orderBy: null, order: null })
    }
  }

  return (
    <div className={styles.responsiveTable}>
      {
        isSortable && (
          <div className={styles.mobileSort}>
            <label>Order by</label>
            <Select
              onChange={setSort}
              className={styles.select}
              options={[
                {
                  label: 'None',
                  value: ''
                },
                ...schema.filter(s => s.sortable).map(s => {
                  return {
                    label: s.title,
                    value: s.id
                  }
                })
              ]}
            />
          </div>
        )
      }

      <Table>
        <Thead>
          <Tr>
            {
              schema.map(s => (
                <Th key={s.id} sortable={s.sortable} col={s.id}>{s.title}</Th>
              ))
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            results.map(result => (
              <Tr>
                {
                  schema.map(s => (
                    <Td title={s.title}>
                      {
                        s.formatter ? s.formatter(result[s.id], result) : result[s.id]
                      }
                    </Td>
                  ))
                }
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </div>
  )
}