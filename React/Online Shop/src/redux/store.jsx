import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./cartSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
  },
});
