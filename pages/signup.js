import React from "react";
import Link from "next/link";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Facility from "../components/Common/Facility";
import Breadcrumb from "../components/Common/Breadcrumb";
import { useFormik } from "formik";
import { ToastContainer, toast, Slide } from "react-toastify";
import Router from "next/router";
import Cookies from "js-cookie";
import { API_BASE_URL } from '../utils/config';
import * as Yup from "yup";
const Signup = () => {
  const schema = Yup.object().shape({
    phone: Yup.string()
      .required("phone is required")
      .min(10, "wrong phone number")
      .max(10, "wrong phone number"),
    password: Yup.string().required("Password is required"),
   
  });
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
   
    },
    validationSchema: schema,
    onSubmit: async (values) => {
        
      try {
        const res = await fetch(`${API_BASE_URL}/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const resData = await res.json();
        console.log("user signup data", resData);
        if (resData && resData.status) {
          toast.success(resData.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          Cookies.set("userId", resData.user._id);
          Cookies.set("phone", resData.user.phone);
          Cookies.set("token", resData.token);
          
          Router.push("/cart");
        } else {
          toast.error(resData.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {}
    },
  });
  return (
    <>
      <Navbar />

      <Breadcrumb title="Signup" />

      <section className="signup-area ptb-60">
        <div className="container">
          <div className="signup-content">
            <div className="section-title">
              <h2>
                <span className="dot"></span> Create an Account
              </h2>
            </div>

            <form className="signup-form" onSubmit={formik.handleSubmit}>
            {/* <div className="form-group">
                <label>Email</label>

                <input
                  type="tel"
                  placeholder="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-left invalid-feedback">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div> */}
              <div className="form-group">
                <label>Phone</label>

                <input
                  type="tel"
                  placeholder="phone"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className={`form-control ${
                    formik.touched.phone && formik.errors.phone
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-left invalid-feedback">
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                                        <label>Password</label>
                                        <input
                type="password"
                placeholder="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-left invalid-feedback">
                  {formik.errors.password}
                </div>
              ) : null}
                                    </div>

              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </form>
          </div>
        </div>
      </section>

   

      <Footer />
    </>
  );
};

export default Signup;
