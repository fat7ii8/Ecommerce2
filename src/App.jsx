import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
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
import Orders from "./Pages/Ordars/ALLOrdars";
import Brands from "./Pages/Brands/Brands";
import BrandProvider from "./Components/Context/brand.context";
import Productss from "./Pages/Products/Productss";
import Category from "./Pages/Category/Category";
import WishList from "./Pages/WishList/WishList";
import WishListProvider from "./Components/Context/WishList.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./Pages/NotFound/NotFound"; // You’ll need to create this component

const routes = createBrowserRouter(
  [
    {
      path: "",
      element: (
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "brands", element: <Brands /> },
        { path: "products", element: <Productss /> },
        { path: "categories", element: <Category /> },
        { path: "wishlist", element: <WishList /> },
      ],
    },
    {
      path: "",
      element: (
        <GardRouteForLogin>
          <Layout />
        </GardRouteForLogin>
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "writeemail", element: <WriteEmail /> },
        { path: "recivecode", element: <ReciveCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
      ],
    },
  ],
  {
    basename: "/Ecommerce2",
  }
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <WishListProvider>
          <BrandProvider>
            <CartProvider>
              <RouterProvider router={routes} />
              <Toaster />
            </CartProvider>
          </BrandProvider>
        </WishListProvider>
      </TokenProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
