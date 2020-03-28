import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import React from "react"
import Popover from "@material-ui/core/Popover"
import {ShopContext} from "../context/ShopContext"
import Basket from "./Basket"

export function BasketButton(props) {
  const {state} = React.useContext(ShopContext)

  const [anchorElement, setAnchorElement] = React.useState(null)

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <Badge badgeContent={state.products?.length || null} color="secondary">
          <ShoppingCartIcon/>
        </Badge>
      </IconButton>

      <Popover
        id="basket"
        elevation={3}
        open={Boolean(anchorElement)}
        anchorEl={anchorElement}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Basket/>
      </Popover>
    </>
  )
}
