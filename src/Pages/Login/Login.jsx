import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { TokenContext } from "../../Components/Context/Token.Context";

export default function Login() {
  const PassRegex = /^[A-Z][A-Za-z0-9]{5,}$/;
  const [error, seterrormessage] = useState(null);
  const [login, setlogin] = useState(false);
  const [eye, seteye] = useState("password");
  const [iconeye, seticoneye] = useState(true);
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);

  function passwordType() {
    if (eye == "password") {
      seteye("text");
      seticoneye(!iconeye);
    } else {
      seteye("password");
      seticoneye(!iconeye);
    }
  }

  const validationSchema = object({
    email: string().required("email is required").email("email must be valid"),
    password: string().required("pass is required").matches(PassRegex, " "),
  });
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: SendDateToLogin,
    validationSchema,
  });
  async function SendDateToLogin(values) {
    const loading = toast.loading("...loading");
    try {
      seterrormessage(null);
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "post",
        data: values,
      };
      const { data } = await axios.request(option);
      if (data.message == "success") {
        toast.success("success login");
        localStorage.setItem("token", data.token);
        setToken(data.token);
        console.log("token", data.token);
        setlogin(true);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      seterrormessage(error.response.data.message);
      toast.error(error.response.data.message);
      setlogin(false);
      console.log(error);
    } finally {
      toast.dismiss(loading);
    }
  }
  return (
    <>
      <div className="py-40">
        {error ? (
          <p className="text-red-500 font-semibold my-4">{error}</p>
        ) : (
          ""
        )}
        <form onSubmit={Formik.handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="">email</label>
            <input
              className="input bg-slate-100 w-full"
              type="email"
              name="email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
            {Formik.errors.email && Formik.touched.email ? (
              <p className="text-red-500 font-semibold my-4">
                {Formik.errors.email}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="relative">
            <label htmlFor="">password</label>
            <div className="relative">
              <input
                className="input  bg-slate-100 w-full"
                type={eye}
                name="password"
                value={Formik.values.password}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {iconeye ? (
                <i
                  className="fa-solid fa-eye absolute right-4 top-[50%] -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    passwordType();
                  }}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye-slash absolute right-4 top-[50%] -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    passwordType();
                  }}
                ></i>
              )}
            </div>
            {Formik.errors.password && Formik.touched.password ? (
              <p className="text-red-500 font-semibold my-4">
                {Formik.errors.password}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="flex justify-between items-center">
            <button type="submit" className="btn">
              {login ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
            <div className="space-y-2">
              <button
                className="text-blue-500 font-bold cursor-pointer hover:underline"
                onClick={() => {
                  navigate("/WriteEmail");
                }}
              >
                Forget password ?
              </button>
              <div className="text-blue-500 font-bold cursor-pointer hover:underline">
                <Link to={"/register"}>Create Account ?</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
