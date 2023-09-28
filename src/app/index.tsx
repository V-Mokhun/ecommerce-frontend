import {
  ABOUT_ROUTE,
  CART_ROUTE,
  CONTACT_ROUTE,
  FAQ_ROUTE,
  HOME_ROUTE,
  PRODUCTS_ROUTE,
} from "@/shared/consts";
import { Suspense } from "react";
import { lazily } from "react-lazily";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const {
  HomePage,
  AboutPage,
  CartPage,
  ContactPage,
  FaqPage,
  ProductPage,
  ProductsPage,
  NotFoundPage,
} = lazily(() => import("@/pages"));

export const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={HOME_ROUTE} element={<HomePage />} />
          <Route path={PRODUCTS_ROUTE} element={<ProductsPage />} />
          <Route path={`${PRODUCTS_ROUTE}/:id`} element={<ProductPage />} />
          <Route path={CART_ROUTE} element={<CartPage />} />
          <Route path={FAQ_ROUTE} element={<FaqPage />} />
          <Route path={ABOUT_ROUTE} element={<AboutPage />} />
          <Route path={CONTACT_ROUTE} element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
