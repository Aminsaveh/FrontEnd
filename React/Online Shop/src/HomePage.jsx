import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Data from "./data.json";
import { add } from "./redux/cartSlice";
import HeaderSection from "./HeaderSection";

export default function HomePage() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const [list, setList] = useState(Data.data);

  useEffect(() => {
    if (category === "A") return setList(Data.data);

    if (category === "S") {
      return setList([
        ...Data.data.filter((item) => item.category === "smartphone"),
      ]);
    }
    if (category === "N") {
      return setList([
        ...Data.data.filter((item) => item.category === "notebook"),
      ]);
    }
  }, [category]);
  return (
    <>
      <HeaderSection />
      <div className="col-9 mx-auto mt-5 mb-5">
        <div className="row">
          {list.map((item) => {
            return (
              <div className="col-lg-4 mb-3">
                <div className="shopping-card">
                  <img src={item.img} alt="Product" />
                  <Link to={`/products/${item.id}`} className="shopping-card-title">
                    {item.title}
                  </Link>

                  <div className="shopping-card-details">
                    <div>R$ {item.price.toFixed(2)}</div>
                    <div>{item.size}</div>
                  </div>
                  <button className="shopping-card-button" onClick={() => dispatch(add(item))}>
                    <div className="button-cart-inner">
                      <div>Add to cart</div>
                      <svg
                        className="icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
