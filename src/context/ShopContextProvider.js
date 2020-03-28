import React, {useEffect, useState} from "react"
import {ShopContext} from "./ShopContext"
import {pickUpBasket as pickUpBasketService} from "../services/pickUpBasket"
import {addProduct as addProductService} from "../services/addProduct"
import {updateProduct as updateProductService} from "../services/updateProduct"
import {removeProduct as removeProductService} from "../services/removeProduct"
import {checkout as checkoutService} from "../services/checkout"
import {getBasket} from "../services/getBasket"

export function ShopContextProvider(props) {
  let initialState = {
    basketId: null,
    hasBeenCheckedOut: false,
    products: [],
    total: {
      amount: 0,
      currency: 'EUR'
    },
    isLoading: false
  }
  const [state, setState] = useState(initialState)

  async function pickUpBasket() {
    const basket = await pickUpBasketService()

    localStorage.setItem('basketId', basket.id)
    setState(initialState)
    setState((s) => ({...s, basketId: basket.id}))

    return basket
  }

  async function reFetchBasket(basketId) {
    const basket = await getBasket(basketId)
    if (basket.notOk) {
      pickUpBasket()
    }

    setState(basket)
  }

  async function addProduct(values) {
    await addProductService(state.basketId, values)
    await reFetchBasket(state.basketId)
  }

  async function updateProduct(payload) {
    await updateProductService(state.basketId, payload)
    await reFetchBasket(state.basketId)
  }

  async function removeProduct(productId) {
    await removeProductService(state.basketId, productId)
    await reFetchBasket(state.basketId)
  }

  async function checkout() {
    await checkoutService(state.basketId)
    const basketId = await pickUpBasket()
    await reFetchBasket(basketId.id)
  }

  function setIsLoading(isLoading) {
    setState((s) => ({...s, isLoading}))
  }

  useEffect(() => {
    const basketId = localStorage.getItem('basketId')
    setState({
      ...state,
      basketId
    })

    if (!basketId) {
      pickUpBasket()
    }

    if (basketId) {
      reFetchBasket(basketId)
    }
  }, [])

  return (
    <ShopContext.Provider
      value={{
        state,
        addProduct,
        removeProduct,
        updateProduct,
        checkout,
        pickUpBasket,
        reFetchBasket,
        setIsLoading
      }}>
      {props.children}
    </ShopContext.Provider>
  )
}
