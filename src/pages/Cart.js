import React, { useContext } from "react";
import { ShoppingContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(ShoppingContext);
  console.log(cart);
  const totalPrice = cart.reduce((accu, i) => {
    return (accu += i.price * i.qty);
  }, 0);
  return (
    <>
      {cart.length === 0 ? (
        <div
          style={{
            marginTop: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "rgb(95, 93, 93)" }}>Your Cart Is Empty</h2>
          <Link
            to="/"
            className="btn2"
            // style={{
            //   marginTop: "2rem",
            //   padding: "7px 18px",
            //   fontSize: "0.7rem",
            //   borderRadius: "4px",
            //   backgroundColor: "red",
            // }}
          >
            Go To Cart
          </Link>
        </div>
      ) : (
        <div className="cart">
          <div className="cart-section">
            {cart.map((c) => {
              return (
                <div className="list-group" key={c.id}>
                  <div className="list-image">
                    <img src={c.image} alt={c.title} />
                  </div>
                  <div>{c.title.split(" ").slice(0, 4).join(" ")}</div>
                  <div>&#8377; {c.price}</div>
                  <div>
                    <span style={{ fontSize: ".85rem" }}>Qty: </span>
                    <button
                      className="btn"
                      onClick={() => dispatch({ type: "DELETE", payload: c })}
                    >
                      -
                    </button>
                    <span className="side">{c.qty}</span>
                    <button
                      className="btn"
                      onClick={() => dispatch({ type: "ADD", payload: c })}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <i
                      onClick={() => dispatch({ type: "REMOVE", payload: c })}
                      className="fa-solid fa-trash "
                      style={{
                        cursor: "pointer",
                        display: "inline-block",
                        padding: ".5rem",
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="price">
            <h2>Price detail({cart.length} items)</h2>
            <h3>Total in &#8377; {totalPrice.toFixed(2)}</h3>
            <div>
              <Link to="/checkout">
                <button>Checkout</button>
              </Link>
              <Link to="/">
                <button style={{ marginTop: "1.3rem" }}>Go To Shop</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
