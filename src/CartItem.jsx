import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  //const [showCart, setShowCart] = useState(true);
  //const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page

  const calculateTotalAmount = cartItems.reduce((total, item) => 
      total + parseFloat(item.cost.substring(1)) * item.quantity, 0);

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const calculateTotalQuantity = cartItems.reduce((total, item) => 
    total + item.quantity, 0);

  useEffect(() => {
  if (calculateTotalQuantity == 0) {
    dispatch(clearCart);
  }});

  const handleIncrement = (item) => {
    if (item) {
      let name = item.name;
      let quantity = item.quantity;
      quantity++;
        dispatch(updateQuantity({name,quantity}));
    }
  };

  const handleDecrement = (item) => {
    let quantity = item.quantity;
    let name = item.name;
    if (item && quantity > 0) {
        quantity--;
    }
    if (quantity <= 0)
        dispatch(removeItem(name));
    else
        dispatch(updateQuantity({name,quantity}));
  };

  const handleRemove = (item) => {
    if (item) {
        dispatch(removeItem(item.name));
    }  
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.quantity * parseFloat(item.cost.substring(1));;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount}</h2>
      <div>
        {cartItems.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


