import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container pt-10 pe-3 ps-3 md:pe-0 md:ps-0">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}
