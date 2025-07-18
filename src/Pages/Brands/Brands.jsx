// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../Components/loading/Loading";
import { BrandContext } from "../../Components/Context/brand.context";

export default function Brands() {
  const { getAllbrands, GetbrandSpacifice, brands, selectedBrand } =
    useContext(BrandContext);
  const [popup, setpopup] = useState(false);

  useEffect(() => {
    getAllbrands();
  }, []);
  // useEffect(() => {
  //   GetbrandSpacifice();
  // }, []);
  return (
    <>
      <h2 className="mt-15 text-4xl font-semibold text-mainColor flex justify-center items-center animate__animated animate__fadeInUp">
        All Brands
      </h2>
      {popup && selectedBrand && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500/40 z-40"></div>

          <div className="fixed bg-white top-[10%] left-1/2 -translate-x-1/2 z-50 w-[350px] md:w-[500px] rounded-xl shadow-lg">
            <div
              onClick={() => setpopup(false)}
              className="flex justify-end cursor-pointer border-b-2 border-gray-500 text-2xl p-2"
            >
              x
            </div>
            <div className="flex justify-between items-center gap-5 my-5 p-2">
              <div className="p-2">
                <div className="text-2xl text-mainColor my-2">
                  {selectedBrand.name}
                </div>
                <div>{selectedBrand.slug}</div>
              </div>
              <div>
                <img
                  className="w-[100px] md:w-[200px]"
                  src={selectedBrand.image}
                  alt={selectedBrand.name}
                />
              </div>
            </div>
            <div className="flex justify-end my-5 border-t-2 border-gray-500 p-2">
              <div
                onClick={() => setpopup(false)}
                className="btn bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </div>
            </div>
          </div>
        </>
      )}

      {brands == null ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-col-4 lg:grid-cols-4 gap-6 my-10 animate__animated animate__fadeInUp ">
            {brands.map((brand) => (
              <div
                onClick={async () => {
                  const data = await GetbrandSpacifice(brand._id);
                  setpopup(true);
                }}
                key={brand._id}
              >
                <div className="">
                  <div className="border border-gray-500/20 rounded-md hover:scale-105 transition-all duration-300 hover:shadow-md hover:shadow-mainColor">
                    <div className="cursor-pointer">
                      <img src={brand.image} alt="" />
                    </div>
                    <div className="flex justify-center items-center my-4">
                      <h2>{brand.name}</h2>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
