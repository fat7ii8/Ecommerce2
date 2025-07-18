import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Register() {
  const PassRegex = /^[A-Z][A-Za-z0-9]{5,}$/;
  const phoneRegex = /^(\+2){0,1}01[0125][0-9]{8}$/;
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const validationSchema = object({
    name: string()
      .required("name is required")
      .min(3, "name must be min 3 chars")
      .max(20, "name must be max 20 char"),
    email: string().required("email is required").email("email must be valid"),
    password: string()
      .required("pass is required")
      .matches(
        PassRegex,
        "pass must start with capital letter followed 5 chars or more"
      ),
    rePassword: string()
      .required()
      .matches(PassRegex)
      .oneOf([ref("password")], "password don't match"),
    phone: string()
      .required("phone is required")
      .matches(phoneRegex, "phone must be start with 010, 012, 011, 015"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: sendDate,
    validationSchema,
  });

  async function sendDate(values) {
    const loadingtTost = toast.loading("...loading");
    setloading(true);
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);
      toast.success("register success");
      console.log(data);
      console.log(values);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingtTost);
      setloading(false);
    }
  }

  const [error, setError] = useState(null);

  return (
    <div className="py-8 space-y-4">
      <h1 className="text-2xl">Register Now</h1>
      {error ? <p className="text-red-500 font-semibold my-4">{error}</p> : ""}
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="">
          <label htmlFor="">UserName</label>
          <input
            className="input bg-slate-100 w-full"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.name}
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            className="input bg-slate-100 w-full"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.email}
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            className="input bg-slate-100 w-full"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.password}
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="">RePassword</label>
          <input
            className="input bg-slate-100 w-full"
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.rePassword}
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="">phone</label>
          <input
            className="input bg-slate-100 w-full"
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="text-red-500 font-semibold my-4">
              {formik.errors.phone}
            </p>
          ) : (
            ""
          )}
        </div>
        <button disabled={loading} type="submit" className="btn">
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "register"
          )}
        </button>
      </form>
    </div>
  );
}
