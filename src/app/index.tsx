import {
  ABOUT_ROUTE,
  CART_ROUTE,
  CONTACT_ROUTE,
  FAQ_ROUTE,
  HOME_ROUTE,
  PRODUCTS_ROUTE,
} from "@/shared/consts";
import { Footer, Header } from "@/widgets";
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
    <div className="flex flex-col h-full">
      <BrowserRouter>
        <Header />
        <main className="flex-1">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path={HOME_ROUTE} element={<HomePage />} />
              <Route path={PRODUCTS_ROUTE}>
                <Route path="" element={<ProductsPage />} />
                <Route path={`product/:slug`} element={<ProductPage />} />
              </Route>
              <Route path={CART_ROUTE} element={<CartPage />} />
              <Route path={FAQ_ROUTE} element={<FaqPage />} />
              <Route path={ABOUT_ROUTE} element={<AboutPage />} />
              <Route path={CONTACT_ROUTE} element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
