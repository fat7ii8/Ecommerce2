import React, { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../Components/Context/Cart.context";
import Loading from "../../Components/loading/Loading";
import CartItem from "./../../Components/CartITems/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartInfo, getAllcart, ClearCart } = useContext(CartContext);

  useEffect(() => {
    getAllcart();
  }, []);
  return (
    <>
      {cartInfo ? (
        <>
          <section className="bg-slate-200 p-5 mt-15 my-4">
            <h2 className="text-3xl font-semibold flex items-center gap-4 ">
              shop cart
            </h2>
            {cartInfo.data.totalCartPrice ? (
              <h3 className="text-xxl text-mainColor">
                Total : {cartInfo.data.totalCartPrice} EGP
              </h3>
            ) : (
              <h3 className="text-xxl text-mainColor">Total : 0 EGP</h3>
            )}

            <div className="my-6">
              {/* cartInfo.data.products.length */}
              {cartInfo.numOfCartItems > 0 ? (
                cartInfo.data.products.map((cart) => {
                  return <CartItem cartInfo={cart} key={cart._id}></CartItem>;
                })
              ) : (
                <div className="flex justify-center items-center flex-col gap-3">
                  <h2 className="text-mainColor text-2xl font-light m-auto">
                    your card is Empty
                  </h2>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md  cursor-pointer">
                    <Link to={"/home"}>Back to Products</Link>
                  </button>
                </div>
              )}
              {/* {cartInfo.data.products.map((cart) => {
              return <CartItem cartInfo={cart} key={cart._id}></CartItem>;
            })} */}
            </div>
            <div className="w-fit ms-auto cursor-pointer">
              <button
                onClick={ClearCart}
                className="bg-red-600 text-white px-4 py-2 rounded-md ms-auto cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </section>
          <div className="ms-auto w-fit mb-3 px-4 py-2">
            <button className="bg-mainColor text-white px-4 py-2 rounded-md ms-auto cursor-pointer">
              <Link to={"/checkout"}>CheckOut</Link>
            </button>
          </div>
        </>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
