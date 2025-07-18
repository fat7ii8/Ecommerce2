import React from "react";
import img1 from "../../assets/images/slider-image-3.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-1.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "animate.css";

export default function SwipperCov() {
  return (
    <>
      <div className="container mt-20">
        <div className="grid grid-cols-12 animate__animated animate__fadeInUp">
          <div className="col-span-8">
            <Swiper
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[Autoplay]}
            >
              <SwiperSlide>
                <img
                  src={img1}
                  alt="notFound"
                  className="w-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={img2}
                  alt="notFound"
                  className="w-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={img3}
                  alt="notFound"
                  className="w-full object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="col-span-4">
            <img src={img2} alt="notFound" />
            <img src={img3} alt="notFound" />
          </div>
        </div>
      </div>
    </>
  );
}
