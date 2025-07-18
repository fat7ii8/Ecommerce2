import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../Components/Context/Cart.context";
import { TokenContext } from "../../Components/Context/Token.Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const [isPayment, setisPayment] = useState(null);

  const phoneRegex = /^(\+2){0,1}01[0125][0-9]{8}$/;
  const validationSchema = object({
    city: string().required("city is required"),
    phone: string()
      .required("phone is required")
      .matches(phoneRegex, "phone must be start with 010, 012, 011, 015"),
    details: string().required("please write your address in details"),
  });

  const formik = useFormik({
    initialValues: {
      city: "",
      phone: "",
      details: "",
    },
    onSubmit: (values) => {
      if (isPayment == "cash") {
        MakeCashOrder(values);
      } else {
        MakeOnlineOrdars(values);
      }
    },
    validationSchema,
  });
  async function MakeCashOrder(values) {
    // console.log(values);
    const loading = toast.loading("...loading");
    try {
      setError(null);
      const test = {
        shippingAddress: values,
      };
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        data: test,
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("order made successfully");
      navigate("/allorders");
    } catch (error) {
      console.log(error);
      console.log("error");
    } finally {
      toast.dismiss(loading);
    }
  }
  async function MakeOnlineOrdars(values) {
    // console.log("online");
    const loading = toast.loading("...loading");
    try {
      const test = {
        shippingAddress: values,
      };
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=http://localhost:5173`,
        method: "POST",
        data: test,
        headers: { token },
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("order made successfully");
      setTimeout(() => {
        location.replace(data.session.url);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("...error");
    } finally {
      toast.dismiss(loading);
    }
  }

  const [error, setError] = useState(null);
  return (
    <div className="my-10">
      <h2 className="text-xl font-semibold">Fill your details</h2>
      {error ? <p className="text-red-500 font-semibold my-4">{error}</p> : ""}

      <form onSubmit={formik.handleSubmit}>
        <div className="my-4 ">
          <label htmlFor="">City</label>
          <input
            className="input bg-slate-100 w-full my-3"
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.city && formik.touched.city ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.name}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4 ">
          <label htmlFor="">phone</label>
          <input
            className="input bg-slate-100 w-full my-3"
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.name}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="my-4 ">
          <label htmlFor="">details</label>
          <input
            className="input bg-slate-100 w-full my-3"
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.details && formik.touched.details ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.name}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setisPayment("cash");
            }}
            type="submit"
            className="btn bg-blue-700"
          >
            Cash order
          </button>
          <button
            onClick={() => {
              setisPayment("online");
            }}
            type="submit"
            className="btn bg-mainColor"
          >
            Online order
          </button>
        </div>
      </form>
    </div>
  );
}
