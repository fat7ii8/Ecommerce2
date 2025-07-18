import React from "react";
import axios from "axios";
// import { useEffect, useState } from "react";
import Loading from "../../Components/loading/Loading";
// import CategCard from "./../CategCard.jsx/CategCard";
import CategCard from "./../../Components/CategCard.jsx/CategCard";
import { useQuery } from "@tanstack/react-query";

export default function Category() {
  // const [categ, setCateg] = useState(null);
  async function getCateImage() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/categories",
        method: "GET",
      };
      return await axios.request(options);
    } catch (error) {
      console.log(error);
    }
  }
  const { data, isLoading } = useQuery({
    queryKey: "category",
    queryFn: getCateImage,
    staleTime: 2000000,
    refetchOnMount: false,
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {
        <div className="my-8 mt-8">
          <h2 className="text-xl font-semibold mt-15 my-5 animate__animated animate__fadeInUp ">
            Shop Popular Categories:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-col-4 lg:grid-cols-4 gap-6 animate__animated animate__fadeInUp">
            {data.data.data.map((categ) => (
              <div key={categ._id}>
                <CategCard categInfo={categ} />
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
}
