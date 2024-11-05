import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";

import Layout from "./components/layout";
import HomePage from "./pages/home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout><Outlet /></Layout>}>
      <Route path="/" element={<HomePage />}  />
    </Route>
  )
);

export default router;
