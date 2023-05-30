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
const Reset = () => {
    const token = Cookies.get("token");
  const schema = Yup.object().shape({
    phone: Yup.string()
      .required("phone is required")
      .min(10, "wrong phone number")
      .max(10, "wrong phone number"),
    newPassword: Yup.string().required("newPassword is required"),
   
  });
  const formik = useFormik({
    initialValues: {
      phone: "",
      newPassword: "",
   
    },
    validationSchema: schema,
    onSubmit: async (values) => {
        
      try {
        const res = await fetch(`${API_BASE_URL}/users/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(values),
        });
        const resData = await res.json();
        console.log("user Reset data", resData);
        if (resData && resData.status) {
          toast.success(resData.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
          Router.push("/login");
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
                <span className="dot"></span> Reset Password
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
                                        <label>New Password</label>
                                        <input
                type="password"
                placeholder="newPassword"
                name="newPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className={`form-control ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="text-left invalid-feedback">
                  {formik.errors.newPassword}
                </div>
              ) : null}
                                    </div>

              <button type="submit" className="btn btn-primary">
                Reset
              </button>
            </form>
          </div>
        </div>
      </section>

   

      <Footer />
    </>
  );
};

export default Reset;
