import React from "react";
import PropTypes from "prop-types";

function Cart({ cartItems, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>Cart ({cartItems.length})</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="cart-item">
              <span>{item.name}</span>
              <span>₹{item.price.toFixed(2)}</span>
              <button type="button" onClick={() => onRemove(idx)}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ₹{total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Cart;