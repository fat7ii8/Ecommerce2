import { createContext, useContext, useState } from "react";
import { TokenContext } from "./Token.Context";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./../loading/Loading";

export const CartContext = createContext(null);
export default function CartProvider({ children }) {
  const { token } = useContext(TokenContext);
  const [cartInfo, setcartInfo] = useState(null);
  async function addTocart(productId) {
    const loading = toast.loading("loading...");
    try {
      console.log("add to cart");
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        data: {
          productId,
        },
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.status == "success") {
        toast.success(data.message);
        getAllcart();
      }
    } catch (error) {
      console.log(error);
      toast.error("error....");
    } finally {
      toast.dismiss(loading);
    }
  }
  async function getAllcart() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    console.log(data);
    setcartInfo(data);
  }

  async function RemoveItem(productId) {
    const Loading = toast.loading("item removing");
    try {
      const opions = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(opions);
      console.log(data);
      toast.success("item removed successfully");
      setcartInfo(data);
    } catch (error) {
      console.log(error);
      toast.error("error...");
    } finally {
      toast.dismiss(Loading);
    }
  }
  async function ClearCart() {
    const loading = toast.loading("wait your cart will be deleted");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      getAllcart();
      toast.success("you cart empty");
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("error...");
    } finally {
      toast.dismiss(loading);
    }
  }
  async function updateCart({ productId, count }) {
    // console.log(productId);
    // console.log(count);
    const loading = toast.loading("wait...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        data: {
          count,
        },
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      toast.success("count update");
      setcartInfo(data);
    } catch (error) {
      console.log(error);
      toast.error("error...");
    } finally {
      toast.dismiss(loading);
    }
  }
  return (
    <CartContext.Provider
      value={{
        addTocart,
        getAllcart,
        cartInfo,
        RemoveItem,
        ClearCart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
