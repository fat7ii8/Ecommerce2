import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../Components/Context/Token.Context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../Components/loading/Loading";
import { Link } from "react-router-dom";
// import Ordars from "./ALLOrdars";

export default function ALLOrdars() {
  const { token } = useContext(TokenContext);
  const { id } = jwtDecode(token);
  const [orders, setorders] = useState(null);

  async function getUserOrdars() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    console.log(data);
    setorders(data);
  }

  useEffect(() => {
    getUserOrdars();
  }, []);

  return (
    <>
      {orders == null ? (
        <Loading></Loading>
      ) : (
        orders.map((ordars) => (
          <div
            key={ordars.id}
            className="border-2 border-gray-500/30 p-5 my-15 animate__animated animate__fadeInUp"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3>order ID</h3>
                <h3>#{ordars.id}</h3>
              </div>
              <div>
                <button className="btn bg-blue-700 mx-2 md:mx-4">
                  {ordars.isDelivered ? "delivered" : "not delivered "}
                </button>
                <button
                  className={`btn bg-mainColor ${
                    ordars.isPaid ? "bg-mainColor" : "bg-red-600"
                  }`}
                >
                  {ordars.isPaid == true ? "Paid" : "not Paid"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5 animate__animated animate__fadeInUp">
              {ordars.cartItems.map((product) => (
                <div
                  key={product.product.id}
                  className="border-2 border-gray-500/30 p-2"
                >
                  <Link to={`/product/${product.product.id}`}>
                    <div className="relative group">
                      <img
                        className=""
                        src={product.product.imageCover}
                        alt=""
                      />
                      <div className="bg-mainColor/40 absolute top-0 right-0 h-full w-full z-30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm text-white">
                          Show product Details
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="space-y-3 py-4">
                    <h3 className="text-lg font-semibold line-clamp-1">
                      {product.product.title}
                    </h3>
                    <h3 className="text-mainColor font-semibold">
                      {product.product.category.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <h3 className="">Price: {product.price}</h3>
                      <h3 className="">Count: {product.count}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
