import { TrashIcon } from "lucide-react";
import React, { useContext } from "react";
import { CartContext } from "../Context/Cart.context";

export default function CartItem({ cartInfo }) {
  console.log(cartInfo);
  const { count, price, product, _id } = cartInfo;
  const { imageCover, title, id, category } = product;
  const { RemoveItem, updateCart } = useContext(CartContext);
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-4 px-5 gap-4 animate__animated animate__fadeInUp">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <img className="w-32 rounded" src={imageCover} alt={title} />
        <div className="space-y-3">
          <div>
            <h3 className="text-sm md:text-lg font-semibold">
              Product: {title}
            </h3>
            <h3 className="text-md">Category: {category.name}</h3>
            <h4 className="text-mainColor font-light">Price: {price} EGP</h4>
          </div>
          <button
            onClick={() => RemoveItem(id)}
            className="bg-red-600 text-white rounded-md px-4 py-2 flex items-center gap-2 cursor-pointer w-fit"
          >
            <TrashIcon size={16} /> Remove
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end md:self-center">
        <button
          onClick={() => updateCart({ productId: id, count: count + 1 })}
          className="bg-mainColor text-white px-3 py-2 rounded-md"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
        <span>{count}</span>
        <button
          onClick={() => updateCart({ productId: id, count: count - 1 })}
          className="bg-mainColor text-white px-3 py-2 rounded-md"
        >
          <i className="fa-solid fa-minus"></i>
        </button>
      </div>
    </div>
  );
}
