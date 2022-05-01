import React, { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

export const ShoppingContext = createContext();

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  console.log(state);
  if (action.type === "ADD") {
    const item = state.cart.find((c) => c.id === action.payload.id);
    console.log(item);
    if (item) {
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.payload.id
            ? {
                ...i,
                qty: i.qty + 1,
              }
            : i
        ),
      };
    }
    return {
      // cart: [...state.cart, { ...action.payload, qty: 1 }],
      ...state,
      cart: [...state.cart, { ...action.payload, qty: 1 }],
    };
  }
  if (action.type === "DELETE") {
    const item = state.cart.find((c) => c.id === action.payload.id);
    if (item && item.qty > 1) {
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.payload.id
            ? {
                ...i,
                qty: i.qty - 1,
              }
            : i
        ),
      };
    }
    return {
      ...state,
      cart: state.cart.filter((c) => c.id !== action.payload.id),
    };
  }
  if (action.type === "REMOVE")
    return {
      ...state,
      cart: state.cart.filter((c) => c.id !== action.payload.id),
    };
  if (action.type === "DELETE_ALL") {
    return {
      ...state,
      cart: [],
    };
  }
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_CATA":
      return { ...state, byCatagory: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return { byCatagory: "", searchQuery: "", sort: "" };
    default:
      return state;
  }
};

const CartContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [products, setProducts] = useState([]);
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [productState, productDispatch] = useReducer(productReducer, {
    byCatagory: "",
    searchQuery: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await axios.get("https://fakestoreapi.com/products");
        setProducts(data.data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setErrors(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <ShoppingContext.Provider
      value={{
        state,
        dispatch,
        loading,
        setLoading,
        errors,
        setErrors,
        products,
        productState,
        productDispatch,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default CartContext;
