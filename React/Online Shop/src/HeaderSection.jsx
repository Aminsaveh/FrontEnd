import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderSection = () => {
  const items = useSelector((state) => state.products.items);

  return (
    <div className="header-section">
      <Link to={"/home/A"} className="button-link">
        AllProducts
      </Link>
      <Link to={"/home/S"} className="button-link">
        Smartphones
      </Link>
      <Link to={"/home/N"} className="button-link">
        Notebooks
      </Link>
      <Link to="/cart-page" className="button-cart">
        <div className="button-cart-inner">
          <div>Cart</div>
          <svg
            className="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {items.length > 0 && <div className="counter-badge fw-bold">{items.length}</div>}
        </div>
      </Link>
    </div>
  );
};

export default HeaderSection;
