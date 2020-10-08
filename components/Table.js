import { useTable } from 'react-table'
import { useMemo } from 'react'
import styles from '../styles/Table.module.css'
import { Box, Text } from '@chakra-ui/core'

const Table = (props) => {

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <Text
            textAlign="left"
            px={6}
            py={4}
            color="gray.500"
            fontWeight="500"
            letterSpacing="-0.025rem"
          >
            SET NAME
          </Text>
        ),
        accessor: "name",
      },
      {
        Header: () => (
          <Text
            px={6}
            py={4}
            color="gray.500"
            fontWeight="500"
            letterSpacing="-0.025rem"
            textAlign="center"
          >
            RELEASE DATE
          </Text>
        ),
        accessor: "release_date",
        Cell: row => <div style={{textAlign: "center"}}>{row.value}</div>
      },
    ],
    []
  )

  const data = useMemo(
    () => props.data,
    [props.categories]
  )

  const tableInstance = useTable({ columns, data })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="1.5rem"
      backgroundColor="white"
      boxShadow="lg"
      overflow="hidden"
    >
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr className={styles.tableHead} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr className={styles.row} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td className={styles.cell} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  )
              })}
              </tr>
            )
        })}
        </tbody>
      </table>
    </Box>
  )

}

export default Table
