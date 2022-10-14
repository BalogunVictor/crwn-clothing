import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {useNavigate} from "react-router-dom";
// import {withRouter} from 'react-router'
import CustomButton from '../custom-button/custom-button.component'
import CartItem from "../cart-item/cart-item.component";
import './cart-dropdown.style.scss'
import { selectCartItems } from "../../redux/cart/cart.selectors";


const CartDropdown =  ({cartItems}) => 
  {const navigate = useNavigate()
    const onCustomButtonClick = (event) => {
      navigate('/checkout')
    }

return (
  <div className="cart-dropdown">
    <div className="cart-items">
      {
        cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item= {cartItem} />))
        )
          : (
          <span className="empty-message">Your cart is empty</span>
          )
      }
  </div>


  <CustomButton onClick={onCustomButtonClick}>GO TO CHECKOUT</CustomButton>
  
  </div>
)
}


const mapStateToProps = createStructuredSelector ({
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(CartDropdown);
// export default (CartDropdown)