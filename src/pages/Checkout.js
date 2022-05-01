import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShoppingContext } from "../context/CartContext";

const Checkout = () => {
  const [submit, setSubmit] = useState(false);
  const {
    state: { cart },
    dispatch,
  } = useContext(ShoppingContext);
  console.log(cart);
  const totalPrice = cart.reduce((accu, i) => {
    return (accu += i.price * i.qty);
  }, 0);
  const refresh = () => {
    setSubmit(false);
  };
  function submitHandler(e) {
    e.preventDefault();
    setSubmit(true);
    dispatch({
      type: "DELETE_ALL",
    });
  }
  return (
    <div className="checkout">
      {submit ? (
        <div className="thankyou">
          <h1>Thank you for your order!</h1>

          <p>Thank you for shopping with us!</p>
          <Link className="btn2" to="/" onClick={refresh}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <h1>Checkout</h1>
          <form>
            <input
              type="text"
              name="name"
              id=""
              placeholder="name"
              value="Dave Jones"
            />
            <input
              type="text"
              name="email"
              id=""
              placeholder="email"
              value="dave@jones.dummy"
            />
            <input
              type="text"
              name="address"
              id=""
              placeholder="address"
              value="123 Fake Street"
            />
            <select name="country" id="">
              <option value="">India</option>
              <option value="">USA</option>
              <option value="">UK</option>
            </select>
            {/* button onclick submitHandler and clearCart */}
            <button className="btn2" type="submit" onClick={submitHandler}>
              Submit
            </button>
          </form>
          <h1>Total = &#8377;{totalPrice}</h1>
        </>
      )}
    </div>
  );
};

export default Checkout;
