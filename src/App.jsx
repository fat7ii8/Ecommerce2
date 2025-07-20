import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Layout from "./Components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import WriteEmail from "./Pages/WriteEmail/WriteEmail";
import ReciveCode from "./Pages/ReciveCode/ReciveCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import GardRouteForLogin from "./Components/GardRouteForLogin/GardRouteForLogin";
import TokenProvider from "./Components/Context/Token.Context";
import CartProvider from "./Components/Context/Cart.context";
import Cart from "./Pages/Cart/Cart";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Checkout from "./Pages/Checkout/Checkout";
import Ordars from "./Pages/Ordars/ALLOrdars";
import Brands from "./Pages/Brands/Brands";
import BrandProvider from "./Components/Context/brand.context";
import Productss from "./Pages/Products/Productss";
import Category from "./Pages/Category/Category";
import WishList from "./Pages/WishList/WishList";
import WishListProvider from "./Components/Context/WishList.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRoutes>
        <Layout></Layout>
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "home",
        element: <Home></Home>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "Product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "checkout",
        element: <Checkout></Checkout>,
      },
      {
        path: "allorders",
        element: <Ordars></Ordars>,
      },
      {
        path: "Brands",
        element: <Brands></Brands>,
      },
      {
        path: "products",
        element: <Productss></Productss>,
      },
      {
        path: "categories",
        element: <Category></Category>,
      },
      {
        path: "wishlist",
        element: <WishList></WishList>,
      },
    ],
  },
  {
    path: "",
    element: (
      <GardRouteForLogin>
        <Layout></Layout>
      </GardRouteForLogin>
    ),
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "WriteEmail",
        element: <WriteEmail></WriteEmail>,
      },
      {
        path: "Recivecode",
        element: <ReciveCode></ReciveCode>,
      },
      {
        path: "ResetPassword",
        element: <ResetPassword></ResetPassword>,
      },
    ],
  },
], { basename: '/Ecommerce2' });

const x = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={x}>
        <TokenProvider>
          <WishListProvider>
            <BrandProvider>
              <CartProvider>
                <RouterProvider router={routes}></RouterProvider>
                <Toaster></Toaster>
              </CartProvider>
            </BrandProvider>
          </WishListProvider>
        </TokenProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
