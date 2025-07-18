import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { LogOut, ShoppingCart } from "lucide-react";
import { TokenContext } from "../Context/Token.Context";
import { CartContext } from "../Context/Cart.context";

export default function Navbar() {
  const { token, LogOOut } = useContext(TokenContext);
  const { cartInfo, getAllcart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    getAllcart();
  }, []);

  return (
    <nav className="bg-slate-200 py-5 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div>
          <NavLink to={"home"}>
            <img src={logo} alt="logo img" />
          </NavLink>
        </div>

        {/* {token ? (
          ""
        ) : (
          <ul>
            <li>
              <NavLink to={"register"} className={"flex md:hidden"}>
                Register
              </NavLink>
            </li>
          </ul>
        )} */}

        <div>
          {token && (
            <ul
              className={`${
                isMenuOpen ? "block" : "hidden"
              } absolute top-18 left-0 w-full bg-slate-100 md:bg-transparent md:static md:flex md:flex-row gap-4 items-center md:gap-3 md:justify-start md:text-left z-20 px-4 py-3 md:p-0 space-y-3 md:space-y-0 `}
            >
              <li>
                <NavLink to={""}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/categories"}>Categories</NavLink>
              </li>
              <li>
                <NavLink to={"/products"}>Products</NavLink>
              </li>
              <li>
                <NavLink to={"/wishlist"}>WishList</NavLink>
              </li>
              <li>
                <NavLink to={"/Brands"}>Brands</NavLink>
              </li>
              <li>
                <NavLink to={"/allorders"}>Orders</NavLink>
              </li>
            </ul>
          )}
        </div>

        <div>
          {token && (
            <div className="md:hidden flex items-center gap-4 ml-auto pr-2">
              <div className="relative">
                <NavLink className="relative" to={"/cart"}>
                  <ShoppingCart className="text-xl" />
                  <span className="absolute -top-2 -right-2 bg-mainColor text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartInfo ? cartInfo.numOfCartItems : 0}
                  </span>
                </NavLink>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-2xl focus:outline-none"
              >
                ☰
              </button>
              <NavLink onClick={LogOOut} to={"/login"}>
                <LogOut />
              </NavLink>
            </div>
          )}
          <ul className="hidden md:flex items-center gap-3">
            {token && (
              <li>
                <NavLink className="relative" to={"/cart"}>
                  <ShoppingCart></ShoppingCart>
                  <h5 className="absolute top-[-10px] right-[-10px] rounded-full w-5 h-5 p-2 text-white bg-mainColor flex justify-center items-center">
                    {cartInfo ? cartInfo.numOfCartItems : 0}
                  </h5>
                </NavLink>
              </li>
            )}
            <li>
              <i className="fa-brands fa-facebook"></i>
            </li>
            <li>
              <i className="fa-brands fa-instagram"></i>
            </li>
            <li>
              <i className="fa-brands fa-twitter"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin"></i>
            </li>

            {token ? (
              <li onClick={LogOOut}>
                <NavLink to={"/login"}>
                  <LogOut />
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
                <li>
                  <NavLink to={"register"}>Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
