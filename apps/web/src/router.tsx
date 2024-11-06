import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";

import Layout from "./components/layout";
import HomePage from "./pages/home";
import ProductDetail from "./pages/product-detail";
import ProductsPage from "./pages/products";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout><Outlet /></Layout>}>
      <Route path="/" element={<HomePage />}  />
      <Route path="/products" element={<ProductsPage />}  />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Route>
  )
);

export default router;
