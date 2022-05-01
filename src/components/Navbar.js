import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingContext } from "../context/CartContext";

const Navbar = () => {
  const {
    state: { cart },
    productDispatch,
    productState: { searchQuery },
  } = useContext(ShoppingContext);
  return (
    <nav>
      <Link to="/">
        <h1>Instacart</h1>
      </Link>
      <input
        type="search"
        placeholder="Search Product"
        value={searchQuery}
        onChange={(e) => {
          productDispatch({
            type: "FILTER_BY_SEARCH",
            payload: e.target.value,
          });
        }}
      />
      <Link to="/cart">
        <span className="badge-holder">
          <i className="fa-solid fa-cart-arrow-down"></i>
          <span className="badge">{cart.length}</span>
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
