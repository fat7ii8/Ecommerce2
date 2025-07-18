import { ShoppingCart, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CartContext } from "../Context/Cart.context";
import { Link } from "react-router-dom";
import { wishlisttContext } from "../Context/WishList.context";

export default function Card({ productInfo }) {
  const {
    id,
    title,
    imageCover,
    priceAfterDiscount,
    price,
    category,
    ratingsAverage,
    index,
  } = productInfo;
  const { addTocart } = useContext(CartContext);
  const { AddToWishList, RemoveFromWishList, wishlistItems } =
    useContext(wishlisttContext);
  return (
    <div className="container">
      <div className="">
        <div className="cursor-pointer">
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.1, delay: index * 0.001 }}
            className="space-y-3 relative shadow-md p-2 rounded-md group"
          >
            <div className="relative ">
              <img src={imageCover} alt={title} loading="lazy" />
              <div className="absolute hidden md:flex justify-center items-center gap-3 inset-0 bg-mainColor/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart
                  className={`IconStyle ${
                    wishlistItems.includes(id) ? "bg-red-500" : "bg-mainColor"
                  }`}
                  onClick={() => {
                    if (wishlistItems.includes(id)) {
                      RemoveFromWishList(id);
                    } else {
                      AddToWishList(id);
                    }
                  }}
                />

                <ShoppingCart
                  onClick={() => {
                    addTocart(id);
                  }}
                  className="IconStyle"
                />
                <Link to={`/Product/${id}`}>
                  <Eye className="IconStyle" />
                </Link>
              </div>
            </div>
            <h3 className="text-sm text-mainColor">{category.name}</h3>
            <h2 className="line-clamp-1">{title.split(" ", 2).join(" ")}</h2>
            <div className="flex justify-between items-center">
              {priceAfterDiscount ? (
                <h3 className="text-red-500/60 line-through">{price} EGP</h3>
              ) : (
                <h3>{price} EGP</h3>
              )}
              <span>
                <i className="fas fa-star text-yellow-400"></i> {ratingsAverage}
              </span>
              {priceAfterDiscount && (
                <span className="bg-mainColor/60 absolute top-3 right-3 py-1 px-2 rounded text-white">
                  sale {priceAfterDiscount}
                </span>
              )}
            </div>
            <div className="border-t-2 border-gray-400/30 md:hidden">
              <div className="flex justify-center items-center gap-5 p-2  md:hidden ">
                <Heart
                  className={`IconStyle ${
                    wishlistItems.includes(id) ? "bg-red-500" : "bg-mainColor"
                  }`}
                  onClick={() => {
                    if (wishlistItems.includes(id)) {
                      RemoveFromWishList(id);
                    } else {
                      AddToWishList(id);
                    }
                  }}
                />
                <ShoppingCart
                  onClick={() => {
                    addTocart(id);
                  }}
                  className="IconStyle bg-mainColor/80"
                />
                <Link to={`/Product/${id}`}>
                  <Eye className="IconStyle bg-mainColor/80" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
