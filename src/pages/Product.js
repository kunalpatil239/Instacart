import React, { useContext } from "react";
import { ShoppingContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Product = () => {
  // const [radio, setRadio] = useState("");
  const {
    products,
    loading,
    dispatch,
    state: { cart },
    productState: { byCatagory, searchQuery, sort },
    productDispatch,
  } = useContext(ShoppingContext);
  console.log(byCatagory, searchQuery, sort);

  const transformProducts = () => {
    // console.log(products);
    // if (!sort && !byCatagory) {
    //   console.log("entering");
    //   return products;
    // }
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (byCatagory) {
      sortedProducts = sortedProducts.filter((i) => i.category === byCatagory);
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((i) =>
        i.title.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    // <>
    //   {loading && <div className="loader"></div>}
    //   {!loading && (
    //     <div className="products">
    //       {products.map((prod) => {
    //         return (
    //           <div className="card" key={prod.id}>
    //             <div className="card-image">
    //               <img src={prod.image} alt={prod.title} />
    //             </div>
    //             <h4>{prod.title}</h4>
    //             <h5>Price: &#8377;{prod.price}</h5>
    //             {cart.some((el) => el.id === prod.id) ? (
    //               <Link to="/cart">
    //                 <button>Go to cart</button>
    //               </Link>
    //             ) : (
    //               <button
    //                 onClick={() => {
    //                   dispatch({ type: "ADD", payload: prod });
    //                 }}
    //               >
    //                 Add to cart
    //               </button>
    //             )}
    //           </div>
    //         );
    //       })}
    //     </div>
    //   )}
    // </>

    <>
      {loading && <div className="loader"></div>}
      {!loading && (
        <>
          <div className="holder">
            <div className="filter">
              <div className="filter-text">
                <h3
                  style={{ textTransform: "uppercase", letterSpacing: "1.3px" }}
                >
                  Filter
                </h3>
                <div className="sort">
                  <span className="heading">SORT</span>
                  <div className="radio-container">
                    <input
                      id="radio1"
                      type="radio"
                      name="sort"
                      onChange={() =>
                        productDispatch({
                          type: "SORT_BY_PRICE",
                          payload: "lowToHigh",
                        })
                      }
                      checked={sort === "lowToHigh" ? true : false}
                    />
                    <label htmlFor="radio1">Price low to high</label>
                  </div>
                  <div className="radio-container">
                    <input
                      id="radio2"
                      type="radio"
                      name="sort"
                      onChange={() =>
                        productDispatch({
                          type: "SORT_BY_PRICE",
                          payload: "highToLow",
                        })
                      }
                      checked={sort === "highToLow" ? true : false}
                    />
                    <label htmlFor="radio2">Price high to low</label>
                  </div>
                </div>
                <div className="catagories">
                  <span className="heading">Catagories</span>
                  <div className="catagories-container">
                    <input
                      id="radio3"
                      type="radio"
                      name="cata"
                      value="men's clothing"
                      onChange={() =>
                        productDispatch({
                          type: "FILTER_BY_CATA",
                          payload: "men's clothing",
                        })
                      }
                      checked={byCatagory === "men's clothing" ? true : false}
                    />
                    <label htmlFor="radio3">men's clothing</label>
                  </div>
                  <div className="catagories-container">
                    <input
                      id="radio4"
                      type="radio"
                      name="cata"
                      value="jewelery"
                      onChange={() =>
                        productDispatch({
                          type: "FILTER_BY_CATA",
                          payload: "jewelery",
                        })
                      }
                      checked={byCatagory === "jewelery" ? true : false}
                    />
                    <label htmlFor="radio4">jewelery</label>
                  </div>
                  <div className="catagories-container">
                    <input
                      id="radio5"
                      type="radio"
                      name="cata"
                      value="electronics"
                      onChange={() =>
                        productDispatch({
                          type: "FILTER_BY_CATA",
                          payload: "electronics",
                        })
                      }
                      checked={byCatagory === "electronics" ? true : false}
                    />
                    <label htmlFor="radio5">electronics</label>
                  </div>
                  <div className="catagories-container">
                    <input
                      id="radio6"
                      type="radio"
                      name="cata"
                      value="women's clothing"
                      onChange={() =>
                        productDispatch({
                          type: "FILTER_BY_CATA",
                          payload: "women's clothing",
                        })
                      }
                      checked={byCatagory === "women's clothing" ? true : false}
                    />
                    <label htmlFor="radio6">women's clothing</label>
                  </div>
                </div>
                <button
                  className="clear-filter"
                  onClick={() =>
                    productDispatch({
                      type: "CLEAR_FILTERS",
                    })
                  }
                >
                  clear filters
                </button>
              </div>
            </div>
            <div className="products">
              {transformProducts().map((prod) => {
                return (
                  <div className="card" key={prod.id}>
                    <div className="card-image">
                      <img src={prod.image} alt={prod.title} />
                    </div>
                    <h4>{prod.title}</h4>
                    <h5>Price: &#8377;{prod.price}</h5>
                    {cart.some((el) => el.id === prod.id) ? (
                      <Link to="/cart">
                        <button>Go to cart</button>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          dispatch({ type: "ADD", payload: prod });
                        }}
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
