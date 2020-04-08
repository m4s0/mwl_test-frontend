import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from "@material-ui/core/Container"
import {getProducts} from "../services/getProducts"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Button from "@material-ui/core/Button"

export default function Shop() {
  const classes = useStyles()

  let initialState = {
    count: 0,
    items: []
  }
  const [rows, setRows] = React.useState(initialState)

  useEffect(() => {
    async function fetchData() {
      const results = await getProducts()

      setRows(results)
    }

    fetchData()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={3}>
        {rows.items.map((row) => {
          return (
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography>
                        {row.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        endIcon={<AddShoppingCartIcon/>}>
                        <Typography>
                          Add to Cart
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">€ {row.price}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // },
    // root: {
    //   flexGrow: 1,
    // },
    // paper: {
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}))
