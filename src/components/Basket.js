import React from "react"
import {ShopContext} from "../context/ShopContext"
import TableContainer from "@material-ui/core/TableContainer"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from '@material-ui/icons/Delete'
import Dinero from 'dinero.js'
import {useHistory} from "react-router-dom"
import TextField from "@material-ui/core/TextField"

export default function Basket() {
  const classes = useStyles()
  const {state, removeProduct, updateProduct, checkout, setIsLoading} = React.useContext(ShopContext)
  const [quantity, setQuantity] = React.useState()
  const [isEditing, setIsEditing] = React.useState(false)
  let history = useHistory()

  const handleClickRemoveProduct = async (e) => {
    setIsLoading(true)

    let productId = e.currentTarget.value
    await removeProduct(productId)

    setIsLoading(false)
  }

  const handleClickCheckout = async (e) => {
    setIsLoading(true)

    await checkout()

    setIsLoading(false)

    history.push(`/checkout`)
  }

  const handleChangeQuantity = async (quantity, productId) => {
    setIsLoading(true)

    await updateProduct({
      productId,
      quantity
    })

    setIsLoading(false)
  }

  function formatMoney(money) {
    return Dinero({
      amount: parseInt(money.amount),
      currency: money.currency
    }).toFormat('$0,0.0')
  }

  return (
    <Paper className={classes.paper}>
      <Grid item xs>
        <TableContainer>
          <Table className={classes.table} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right"/>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell component="th" scope="row">
                    {product.productName}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      id="quantity"
                      type="number"
                      value={product.quantity}
                      onChange={(e) => {
                        e.preventDefault()
                        handleChangeQuantity(e.currentTarget.value, product.productId)
                      }}
                      onKeyUpCapture={(e) => {
                        e.preventDefault()
                        handleChangeQuantity(e.key, product.productId)
                      }}
                      margin="normal"
                    />
                  </TableCell>
                  <TableCell align="right">{formatMoney(product.productPrice)}</TableCell>
                  <TableCell>
                    <IconButton value={product.productId}
                                aria-label="delete"
                                onClick={handleClickRemoveProduct}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs className={classes.button}>
        <Typography variant="title" style={{textAlign: 'left'}}>
          Total: {formatMoney(state.total)}
        </Typography>
      </Grid>
      <Grid item xs className={classes.button}>
        <Button
          disabled={state.hasBeenCheckedOut || state.products.length < 1}
          value={state.basketId}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleClickCheckout}>
          <Typography>
            Checkout
          </Typography>
        </Button>
      </Grid>
    </Paper>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 'auto',
    maxWidth: 500,
  },
}))
