import React from 'react'
import './App.css'
import Template from "./components/Template"
import Shop from "./pages/Shop"
import BrowserRouter from "react-router-dom/es/BrowserRouter"
import Switch from "react-router-dom/es/Switch"
import Route from "react-router-dom/es/Route"
import Redirect from "react-router-dom/es/Redirect"
import {ShopContextProvider} from "./context/ShopContextProvider"
import Admin from "./pages/Admin"
import Checkout from "./components/Checkout"

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ShopContextProvider>
          <Route exact path="/admin/basket"
                 component={() => <Template page={<Admin/>}
                                            pageName={"Admin - Baskets"}/>}/>
          <Route exact path="/shop"
                 component={() => <Template page={<Shop/>} pageName={"Shop"}/>}/>
          <Route exact path="/checkout"
                 component={() => <Template page={<Checkout/>} pageName={"Checkout"}/>}/>
          <Redirect to="/shop"/>
        </ShopContextProvider>
      </Switch>
    </BrowserRouter>
  )
}
