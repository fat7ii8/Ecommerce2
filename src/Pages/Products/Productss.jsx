import axios from "axios";
import React, { useContext, useState } from "react";
import Loading from "../../Components/loading/Loading";
import { useFormik } from "formik";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import { CartContext } from "../../Components/Context/Cart.context";
import { Link } from "react-router-dom";
import { wishlisttContext } from "../../Components/Context/WishList.context";
import "animate.css";

// animate__animated animate__bounce

export default function Productss() {
  const [products, setproducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  // const [color, setcolor] = useState(false);
  const { addTocart } = useContext(CartContext);
  const { AddToWishList, RemoveFromWishList, wishlistItems } =
    useContext(wishlisttContext);

  async function getSortProducts(values) {
    try {
      setLoading(true);
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?price[lte]=${values.price}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setproducts(data.data);
      console.log("Sorted by Max Price:", data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getRangeFilteredProducts(min, max) {
    try {
      setLoading(true);
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?price[gte]=${min}&price[lte]=${max}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setproducts(data.data);
      console.log("Filtered by Range:", data.data);
    } catch (error) {
      console.error("Error fetching range products:", error);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      price: "",
    },
    onSubmit: (values) => {
      getSortProducts(values);
    },
  });

  return (
    <>
      <div className="py-20 container mx-auto flex flex-col md:flex-row gap-6 justify-between items-start">
        <div className="bg-amber-100 p-4 rounded w-full md:w-1/3 ">
          <form onSubmit={formik.handleSubmit} className="mb-6">
            <label className="block font-semibold mb-1">
              Sort by Max Price :
            </label>
            <input
              className="input border border-gray-300 p-2 w-full rounded"
              type="number"
              name="price"
              placeholder="e.g. 200"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="submit"
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Filter
            </button>
          </form>
          <div>
            <h2 className="font-semibold mb-2">Filter by Price Range:</h2>
            <label>Min: {minPrice} EGP</label>
            <input
              type="range"
              min="0"
              max="10000"
              step="10"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full"
            />

            <label className="mt-2 block">Max: {maxPrice} EGP</label>
            <input
              type="range"
              min="0"
              max="30000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />

            <button
              onClick={() => getRangeFilteredProducts(minPrice, maxPrice)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Apply Range Filter
            </button>
          </div>
        </div>

        <div className=" flex-1 rounded w-full">
          {loading ? (
            <Loading />
          ) : products?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate__animated animate__fadeInUp">
              {products.map((item) => (
                <div key={item.id} className="shadow-md p-2 rounded-md">
                  <div className="mb-2">
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                    <h2 className="text-lg font-light mt-2 line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="text-sm text-mainColor">{item.price} EGP</p>
                  </div>
                  <div className="border-t-2 border-gray-500/30 p-2 flex justify-between items-center">
                    <Heart
                      className={`IconStyle ${
                        wishlistItems.includes(item.id)
                          ? "bg-red-500"
                          : "bg-mainColor"
                      }`}
                      onClick={() => {
                        if (wishlistItems.includes(item.id)) {
                          RemoveFromWishList(item.d);
                        } else {
                          AddToWishList(item.id);
                        }
                      }}
                    />
                    <ShoppingCart
                      onClick={() => {
                        addTocart(item.id);
                      }}
                      className="IconStyle"
                    />
                    <Link to={`/Product/${item.id}`}>
                      <Eye className="IconStyle" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-600 text-2xl">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
}
