import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from "./Header"
import {makeStyles} from "@material-ui/core/styles"
import Loading from "./Loading"
import {ShopContext} from "../context/ShopContext"

export default function Template(props) {
  const classes = useStyles()
  const {state} = React.useContext(ShopContext)

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Header classes={classes} pageName={props.pageName}/>
      {state.isLoading ? <Loading/> : <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        {props.page}
      </main>}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}))
