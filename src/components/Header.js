import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import React from "react"
import clsx from "clsx"
import {makeStyles} from "@material-ui/core/styles"
import {BasketButton} from "./BasketButton"
import Button from "@material-ui/core/Button"
import {useHistory} from "react-router-dom"

export default function Header(props) {
  const classes = useStyles()
  let history = useHistory()

  function getNavigationButton(pageName) {
    if (pageName === 'Admin - Baskets') {
      return <Button color="secondary" variant="contained" onClick={() => history.push('/shop')}>Shop</Button>
    }
    return <Button color="secondary" variant="contained" onClick={() => history.push('/admin/basket')}>Admin</Button>
  }

  function getBasketButton(pageName) {
    if (pageName === 'Shop') {
      return <BasketButton/>
    }
    return null
  }

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        {getNavigationButton(props.pageName)}

        <Typography component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}>
          {props.pageName}
        </Typography>

        {getBasketButton(props.pageName)}
      </Toolbar>
    </AppBar>
  )
}

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}))
