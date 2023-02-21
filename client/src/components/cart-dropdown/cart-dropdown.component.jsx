import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {useNavigate} from "react-router-dom";
import CustomButton from '../custom-button/custom-button.component'
import CartItem from "../cart-item/cart-item.component";
import './cart-dropdown.style.scss'
import { selectCartItems } from "../../redux/cart/cart.selectors";

import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer
} from './cart-dropdown.styles';

const CartDropdown =  ({cartItems}) => 
  {const navigate = useNavigate()
    const onCustomButtonClick = (event) => {
      navigate('/checkout')
    }

return (
  <CartDropdownContainer>
    <CartItemsContainer>
      {
        cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item= {cartItem} />))
        )
          : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
          )
      }
  </CartItemsContainer>


  <CartDropdownButton onClick={onCustomButtonClick}>GO TO CHECKOUT</CartDropdownButton>
  
  </CartDropdownContainer>
)
}


const mapStateToProps = createStructuredSelector ({
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(CartDropdown);