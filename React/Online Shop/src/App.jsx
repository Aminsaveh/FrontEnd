import HomePage from "./HomePage";
import CartPage from "./CartPage";
import ProductPage from "./ProductPage";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart-page" element={<CartPage />} />
        <Route path="/home/:category" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="*" element={<Navigate replace to="/home/A" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
