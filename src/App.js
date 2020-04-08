import React from 'react'
import './App.css'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Template from "./components/Template"
import Shop from "./pages/Shop"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/dashboard"
               component={() => <Template page={<Dashboard/>} pageName={"Dashboard"}/>}/>
        <Route exact path="/shop"
               component={() => <Template page={<Shop/>} pageName={"Shop"}/>}/>
        <Redirect to="/shop"/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
