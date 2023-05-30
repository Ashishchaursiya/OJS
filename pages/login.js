import React, { Component, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Facility from '../components/Common/Facility';
import Breadcrumb from '../components/Common/Breadcrumb';
import { useFormik } from "formik";
import { ToastContainer, toast, Slide } from 'react-toastify';
import Router from "next/router";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { API_BASE_URL } from '../utils/config';
const Login = () => {
    const [isloading, Setloading] = useState(false);
    const schema = Yup.object().shape({
        phone: Yup.string().required("phone is required").min(10,"wrong phone number").max(10,"wrong phone number"),
        password: Yup.string()
        .required("Password is required")
       
    });
    const formik = useFormik({
        initialValues: {
            phone: "",
          password: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
         
            try {
                
                const res = await fetch(`${API_BASE_URL}/users/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                   
                  },
                  body: JSON.stringify(values),
                });
                const resData = await res.json();
                console.log('user data',resData)
                if(resData && resData.status){
                    toast.success(resData.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    Cookies.set("userId", resData.user._id);
                    Cookies.set("phone", resData.user.phone);
                    Cookies.set("token", resData.token);
                    Router.push("/cart");
                }else{
                    toast.error(resData.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
              
               
              } catch (error) {
                
               
              }
        },
      });
    return (
        <>
            <Navbar />
            <ToastContainer transition={Slide} />
            <Breadcrumb title="Login" />

            <section className="login-area ptb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                        <form onSubmit={formik.handleSubmit}>
                            
                            <div className="login-content">
                                <div className="section-title">
                                    <h2><span className="dot"></span> Login</h2>
                                </div>

                               
                                    <div className="form-group py-2">
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

                                    <div className="form-group py-2">
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

                                    <button type="submit" className="btn btn-primary">Login</button>
                                    
                                    <Link href="/reset">
                                        <a className="forgot-password">Lost your password?</a>
                                    </Link>
                            
                            </div>
                            </form>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="new-customer-content">
                                <div className="section-title">
                                    <h2><span className="dot"></span> New Customer</h2>
                                </div>

                                <span>Create a Account</span>
                                <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be able to order from our shop. To start shopping click register.</p>
                                <Link href="/signup">
                                    <a className="btn btn-light">Create A Account</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
          
            
            <Footer />
        </>
    );
}

export default Login;
