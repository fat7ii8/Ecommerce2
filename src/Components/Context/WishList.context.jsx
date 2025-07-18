import { createContext, useContext, useState } from "react";
import axios from "axios";
import { TokenContext } from "./Token.Context";
import toast from "react-hot-toast";

export const wishlisttContext = createContext(null);
export default function WishListProvider({ children }) {
  const { token } = useContext(TokenContext);
  const [wishlistInfo, setwishList] = useState([]);
  //   const [cartInfo, setcartInfo] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  async function AddToWishList(productId) {
    const loading = toast.loading("...loading");
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      const { data } = await axios.request(option);
      console.log(data);
      if (data.status == "success") {
        setWishlistItems((prev) => [...prev, productId]);
        toast.success(data.message);
        GetAllWishList();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loading);
    }
  }
  async function RemoveFromWishList(productId) {
    const loading = toast.loading("...loading");
    try {
      const option = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(option);
      console.log(data);
      toast.success(data.message);
      setWishlistItems((prev) => prev.filter((itemId) => itemId !== productId));
      //   setwishList(data.data);
      GetAllWishList();
    } catch (error) {
      console.log(error);
      toast.error("...error");
    } finally {
      toast.dismiss(loading);
    }
  }

  async function GetAllWishList() {
    const option = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(option);
    console.log(data);
    setwishList(data.data);
  }
  return (
    <wishlisttContext.Provider
      value={{
        AddToWishList,
        RemoveFromWishList,
        GetAllWishList,
        wishlistInfo,
        wishlistItems,
      }}
    >
      {children}
    </wishlisttContext.Provider>
  );
}
