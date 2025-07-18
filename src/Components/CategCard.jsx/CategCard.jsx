import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function CategCard({ categInfo }) {
  const { _id, image, name } = categInfo;
  return (
    <>
      <div className="container">
        <img
          src={image}
          loading="lazy"
          alt="categImg"
          className="w-[300px] h-[300px] object-cover cursor-pointer"
        />
        <p>{name}</p>
      </div>
    </>
  );
}
