import React from "react";
import { Formik, useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function WriteEmail() {
  const navigate = useNavigate();
  const validationSchema = object({
    email: string().required("email required").email("Email must be valid"),
  });
  const Formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: sendCode,
    validationSchema,
  });
  async function sendCode(values) {
    const loading = toast.loading("wait code sended");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "post",
        data: values,
      };
      var { data } = await axios.request(options);
      console.log(data);
      console.log(values);
      localStorage.setItem("verifiedEmail", values.email);
      toast.success("verify code sended");
      setTimeout(() => {
        navigate("/ReciveCode");
      }, 1800);
    } catch (error) {
      toast.error(error);
    } finally {
      toast.dismiss(loading);
    }
  }
  return (
    <div>
      <div className="py-40">
        <form onSubmit={Formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="">Email</label>
            <input
              className="input bg-slate-100 w-full"
              type="email"
              name="email"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
            {Formik.errors.email && Formik.touched.email && (
              <p className="text-red-500 text-sm mt-1">{Formik.errors.email}</p>
            )}
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
