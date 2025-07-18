import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Components/loading/Loading";
import { CartContext } from "./../../Components/Context/Cart.context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Card from "./../../Components/Card/Card";
import ReactImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";

export default function ProductDetails() {
  const { addTocart } = useContext(CartContext);
  const { id } = useParams();
  console.log(id);
  const [productdetail, setproductdetail] = useState(null);
  const [relatedProduct, setrelatedProduct] = useState(null);
  async function getProductDetails() {
    const option = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(option);
    setproductdetail(data.data);
  }

  async function getSpacificProduct() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productdetail.category._id}`,
      method: "Get",
    };
    const { data } = await axios.request(options);
    console.log(data);
    setrelatedProduct(data.data);
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);
  useEffect(() => {
    if (productdetail) {
      getSpacificProduct();
    }
  }, [productdetail]);
  return (
    <>
      {productdetail ? (
        <>
          <div className="grid grid-cols-12 gap-5 my-10">
            <div className="col-span-12 md:col-span-4">
              <ReactImageGallery
                items={productdetail.images.map((image) => {
                  return { original: image, thumbnail: image };
                })}
              ></ReactImageGallery>
            </div>
            <div className="col-span-12 md:col-span-8 py-5 space-y-5">
              <div>
                <h2 className="text-xl"> {productdetail.title}</h2>
                <h2 className="text-xl font-semibold text-mainColor">
                  {productdetail.category.name}
                </h2>
              </div>
              <p>{productdetail.description}</p>
              <div className="flex items-center justify-between">
                <h4>{productdetail.price} EGP</h4>
                <h4 className="flex items-center gap-2">
                  <p>{productdetail.ratingsAverage}</p>
                  <i className="fa-solid fa-star text-yellow-500"></i>
                </h4>
              </div>
              <button
                onClick={() => {
                  addTocart(id);
                }}
                className="btn w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="my-11">
            <h2 className="text-2xl font-semibold my-5">Related Product :</h2>
            <Swiper
              spaceBetween={10}
              loop={false}
              autoplay={{
                delay: 500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
              {relatedProduct?.map((product) => (
                <SwiperSlide key={product.id}>
                  <Card productInfo={product}></Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
