import React, {useEffect} from "react"
import {makeStyles} from "@material-ui/core/styles"
import TableContainer from "@material-ui/core/TableContainer"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import TablePagination from "@material-ui/core/TablePagination"

export default function CartTable(props) {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  let initialState = {
    count: 0,
    items: []
  }
  const [rows, setRows] = React.useState(initialState)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      let searchParams = {
        type: props.type
      }

      // const results = await getInvoices(getToken(), page, rowsPerPage, searchParams)

      // setRows(results)
      setIsLoading(false)
    }

    fetchData()
  }, [page, rowsPerPage])

  return (
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{minWidth: column.minWidth}}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (<div>Loading</div>) : rows.items.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.uuid}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
}

const columns = [
  {id: 'uuid', label: 'uuid', minWidth: 310},
  {
    id: 'createdAt',
    label: 'Created at',
    format: (value) => value.toLocaleString(),
  },
  {id: 'sender', label: 'Sender'},
  {id: 'recipient', label: 'Recipient'},
  {id: 'invoiceDate', label: 'Invoice Date'},
  {id: 'invoiceNumber', label: 'Invoice Number'},
  {id: 'marking', label: 'Marking'},
]

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))
