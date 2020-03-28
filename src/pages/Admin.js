import Container from "@material-ui/core/Container"
import React, {useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {getAdminBaskets} from "../services/getAdminBaskets"
import Paper from "@material-ui/core/Paper"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import TableContainer from "@material-ui/core/TableContainer"
import Table from "@material-ui/core/Table"
import Dinero from "dinero.js"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import {makeStyles} from "@material-ui/core/styles"
import {CssBaseline} from "@material-ui/core"

export default function Admin() {
  const classes = useStyles()
  const [baskets, setBaskets] = React.useState([])

  useEffect(() => {
    async function fetchData() {
      const results = await getAdminBaskets()

      setBaskets(results)
    }

    fetchData()
  }, [])

  function formatMoney(money) {
    return Dinero({
      amount: parseInt(money.amount),
      currency: money.currency
    }).toFormat('$0,0.0')
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>

        {baskets.map((basket) => (
          <Grid item xs={12}>
            <Card className={classes.root} elevation={6}>
              <CardContent>
                <Typography className={classes.basket}
                            color="textSecondary"
                            gutterBottom>
                  {basket.basketId}
                </Typography>
                <CssBaseline/>
                <Typography className={classes.basket}
                            color="textSecondary"
                            gutterBottom>
                  hasBeenCheckedOut: {basket.hasBeenCheckedOut ? 'true' : 'false'}
                </Typography>
                <CssBaseline/>
                <Typography className={classes.title}>Purchased Products</Typography>
                <Grid item xs={12} className={classes.table}>
                  <Paper className={classes.paper} elevation={3}>
                    <Grid item xs>
                      <TableContainer>
                        <Table className={classes.table} size="small" aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="right">Quantity</TableCell>
                              <TableCell align="right">Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {basket.products.map((product) => (
                              <TableRow key={product.name}>
                                <TableCell component="th" scope="row">
                                  {product.productName}
                                </TableCell>
                                <TableCell align="right">{product.quantity}</TableCell>
                                <TableCell align="right">{formatMoney(product.productPrice)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs className={classes.button}>
                      <Typography variant="title" style={{textAlign: 'left'}}>
                        Total: {formatMoney(basket.total)}
                      </Typography>
                    </Grid>
                  </Paper>
                </Grid>
                {basket.removedProducts.length > 0 ?
                  (
                    <>
                      <Typography className={classes.title}>Removed Products</Typography>
                      <Grid item xs={12} className={classes.table}>
                        <Paper className={classes.paper} elevation={3}>
                          <Grid item xs>
                            <TableContainer>
                              <Table className={classes.table} size="small" aria-label="simple table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {basket.removedProducts.map((product) => (
                                    <TableRow key={product.name}>
                                      <TableCell component="th" scope="row">
                                        {product.productName}
                                      </TableCell>
                                      <TableCell align="right">{product.quantity}</TableCell>
                                      <TableCell align="right">{formatMoney(product.productPrice)}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                        </Paper>
                      </Grid>
                    </>
                  )
                  : <div></div>
                }
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    textAlign: "center"
  },
  align: {
    fontSize: 18,
    textAlign: "left"
  },
  table: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 'auto',
  },
}))
