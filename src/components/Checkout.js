import Container from "@material-ui/core/Container"
import React from "react"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import {useHistory} from "react-router-dom"

export default function Checkout(props) {
  const classes = useStyles()
  let history = useHistory()

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textPrimary" gutterBottom>
                Order placed!
              </Typography>
              <Button color="primary"
                      variant="contained"
                      onClick={() => history.push('/shop')}>
                Continue shopping...
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))
