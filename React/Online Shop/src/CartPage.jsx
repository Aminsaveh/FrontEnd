import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderSection from "./HeaderSection";
import { clear, remove } from "./redux/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const summary = () => {
    let output = 0.0;
    items.forEach(({ price }) => {
      output += price;
    });
    return output;
  };
  return (
    <>
      <HeaderSection />
      <div className="m-5">
        <div className="bg-white shadow rounded px-3 py-4">
          {items.length === 0 && (
            <div className="empty-cart-label">
              <div>Cart is empty!</div>
            </div>
          )}
          {items.map(({ id, title, price }) => {
            return (
              <div key={id} className="cart-item">
                <div className="col-2"></div>
                <div className="col-6 fw-bold">{title}</div>
                <div className="col-2 fw-bold">R$ {price.toFixed(2)}</div>
                <button
                  className="btn p-0 icon-remove text-secondary col-2"
                  onClick={() => dispatch(remove(id))}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-item-total">Total: R$ {summary().toFixed(2)}</div>
        <div>
          <button className=" px-3 btn-primary btn" onClick={() => dispatch(clear())}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};
export default CartPage;
