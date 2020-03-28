import Grid from "@material-ui/core/Grid"
import React, {useEffect} from "react"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import {getProducts} from "../services/getProducts"
import {makeStyles} from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import {ShopContext} from "../context/ShopContext"

export default function ProductList() {
  const classes = useStyles()
  const [products, setProducts] = React.useState([])
  const {addProduct, setIsLoading} = React.useContext(ShopContext)

  useEffect(() => {
    async function fetchData() {
      const results = await getProducts()

      setProducts(results)
    }

    fetchData()
  }, [])

  const handleClick = async (e) => {
    setIsLoading(true)

    let productId = e.currentTarget.value
    let values = {
      productId,
      productName: 'foo'
    }
    await addProduct(values)

    setIsLoading(false)
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => {
        return (
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={6}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography>
                      {product.name}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Button
                      value={product.id}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleClick}
                      endIcon={<AddShoppingCartIcon/>}>
                      <Typography>
                        Add to Cart
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{product.price}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )
      })}
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
