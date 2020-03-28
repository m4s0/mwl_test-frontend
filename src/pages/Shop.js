import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from "@material-ui/core/Container"
import ProductList from "../components/ProductList"

export default function Shop() {
  const classes = useStyles()

  return (
    <Container maxWidth="lg" className={classes.root}>
      {<ProductList/>}
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}))
