import React from "react";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { number, object } from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ReciveCode() {
  const navigate = useNavigate();
  const validationSchema = object({
    resetCode: number().required("input is required"),
  });
  const Formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: getVerifyApi,
    validationSchema,
  });
  async function getVerifyApi(values) {
    const loading = toast.loading("Wait");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "post",
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("code verify");
      setTimeout(() => {
        navigate("/ResetPassword");
      }, 1500);
    } catch (error) {
      console.log(error);
      // toast.error(error);
      toast.error("code reJected please write a valid code");
    } finally {
      toast.dismiss(loading);
    }
  }
  return (
    <div>
      <div className="py-40">
        <form onSubmit={Formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="">Reset Code</label>
            <input
              className="input bg-slate-100 w-full"
              type="text"
              name="resetCode"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
            {Formik.errors.resetCode && Formik.touched.resetCode && (
              <p className="text-red-500 text-sm mt-1">
                {Formik.errors.resetCode}
              </p>
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
