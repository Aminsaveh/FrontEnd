import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import Data from "./data.json";
import { Modal } from "react-bootstrap";
import { add } from "./redux/cartSlice";
import HeaderSection from "./HeaderSection";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const foundProducts = Data.data.filter((item) => item.id == id);
  const product = foundProducts[0];
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <>
      <HeaderSection />
      <div className="m-5 bg-white p-5">
        <div className="product-page">
          <div className="col-3">
            <div>
              
              <img src={product.img} className="img-fluid" alt="Product" />
              <div class="d-flex justify-content-evenly mt-3" style={{ width: '40%' }}>
                                {[1].map(unCheckedStar => <span class="fa fa-star text-warning fs-3 " ></span>)}
                                {[1, 2, 3, 4].map(unCheckedStar => <span class="fa fa-star fs-3" style={{ color: "#D3D3D3" }} ></span>)}
                            </div>
                            <p class="card-text  fs-5">1 reviews</p>
            </div>
          </div>
          <div>
            <div className="col-8">
              <div className="product-title">{product.title}</div>
              <div className="h3 fw-bold mt-3">R$ {product.price.toFixed(2)}</div>
              <div>
                <button
                  className="shopping-card-button mt-2"
                  onClick={() => dispatch(add(product))}
                >
                  <div className="button-cart-inner">
                    <div>Buy Now</div>
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
              <div className="mt-2">
                <button
                  className="btn btn-primary w-100 fw-bold"
                  onClick={() => setModalOpen(true)}
                >
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show-close="false" centered show={modalOpen}  onHide={() => setModalOpen(false) }>

        <Modal.Header>
        <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>{product.detail}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger mt-5 fw-bold px-5" onClick={() => setModalOpen(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductPage;
