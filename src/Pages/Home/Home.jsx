import axios from "axios";
// import React, { useEffect, useState } from "react";
import SwipperCov from "../../Components/SwipperCover/SwipperCov";
import SwiperCateg from "../../Components/SwiperCateg/SwiperCateg";
import Card from "../../Components/Card/Card";
import Loading from "../../Components/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [page, setpage] = useState(1);
  async function getProducts(x) {
    const options = {
      // url: "https://ecommerce.routemisr.com/api/v1/products",
      url: `https://ecommerce.routemisr.com/api/v1/products?page=${x}&limit=${12}`,
      method: "get",
    };
    return await axios.request(options);
  }
  // async function getProducts2() {
  //   const options = {
  //     // url: "https://ecommerce.routemisr.com/api/v1/products",
  //     url: `https://ecommerce.routemisr.com/api/v1/products?page=${2}`,
  //     method: "get",
  //   };
  //   return await axios.request(options);
  // }
  // useEffect(() => {
  //   getProducts();
  // }, []);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
    staleTime: 1000 * 60 * 60,
    keepPreviousData: true,
    refetchOnMount: false,
  });
  if (isError) {
    return <h2>this page does't work</h2>;
  }
  return (
    <div>
      <SwipperCov></SwipperCov>
      <SwiperCateg></SwiperCateg>
      {
        <>
          <h2 className="text-xl font-semibold mb-3 d-block ">
            Shop Popular Products :
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-6 lg:grid-cols-6 gap-4 bg-white mt-8 mb-8 animate__animated animate__fadeInUp animate__delay-1s">
            {isLoading ? (
              <div className="col-span-full">
                <Loading></Loading>
              </div>
            ) : (
              data.data.data.map((product) => (
                <Card
                  productInfo={product}
                  index={product.index}
                  key={product.id}
                ></Card>
              ))
            )}
          </div>
          <div className="m-auto my-3 flex justify-center items-center">
            <h2
              className="cursor-pointer p-2 text-1xl text-mainColor font-semibold"
              onClick={() => {
                setpage(1);
              }}
            >
              1
            </h2>
            <span> </span>,
            <h2
              className="cursor-pointer p-2 text-1xl text-mainColor font-semibold"
              onClick={() => {
                setpage(2);
              }}
            >
              2
            </h2>
            <span> </span>,
            <h2
              className="cursor-pointer p-2 text-1xl text-mainColor font-semibold"
              onClick={() => {
                setpage(3);
              }}
            >
              3
            </h2>
            <span> </span>,
            <h2
              className="cursor-pointer p-2 text-1xl text-mainColor font-semibold"
              onClick={() => {
                setpage(4);
              }}
            >
              4
            </h2>
            <span> </span>,
            <h2
              className="cursor-pointer p-2 text-1xl text-mainColor font-semibold"
              onClick={() => {
                setpage(5);
              }}
            >
              5
            </h2>
          </div>
        </>
      }
    </div>
  );
}
