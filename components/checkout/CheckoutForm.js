import React, { useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import OrderSummary from "./OrderSummary";
import Payment from "../payments/Payment";
import useForm from "./userForm";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { ToastContainer, toast, Slide } from "react-toastify";
import Router from "next/router";

import * as Yup from "yup";
import { API_BASE_URL } from "../../utils/config";
 
import PayPalCheckout from "../payments/PaypalPayment";
import { useState } from "react";
function CheckoutForm({ total, shipping, product ,clearCart}) {
  const [isFormFilled,setFormFilled] = useState(false)
  const [finalOrder,setFinalOrder] = useState(null)
  console.log('product',product)
    let order = {}
 
  const userId = Cookies.get("userId");
  const phone = Cookies.get("phone");
  const token = Cookies.get("token");
  const schema = Yup.object().shape({
    city: Yup.string().required("city is required"),
    houseNo: Yup.string().required("houseNo is required"),
    landmark: Yup.string().required("landmark is required"),
    name: Yup.string().required("name is required"),
    pincode: Yup.string().required("pincode is required"),
    state: Yup.string().required("state is required"),
    street: Yup.string().required("street is required"),
    country: Yup.string().required("country is required"),
    phone: Yup.string()
      .required("phone is required")
      .min(10, "wrong phone number")
      .max(10, "wrong phone number"),
  });
  useEffect( () =>{
    if(!userId){
      toast.error('Please login before checkout', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return  Router.push("/login");
  }
  if(product && Object.keys(product).length==0){
    return  Router.push("/");
  }
  },[])
  const formik = useFormik({
    initialValues: {
      phone: phone,
      city: "",
      houseNo: "",
      landmark: "",
      name: "",
      pincode: "",
      state: "",
      street: "",
      country:""
    },
    validationSchema: schema,
    onSubmit: async (values) => {
        if(!userId){
            toast.error('Please login before checkout', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              return  Router.push("/login");
        }
        
        order.userId = userId
        let Prod = []
        product.forEach(element => {
          let obj = {}
          obj.pId = element.id2
          obj.productId = element.id
          obj.productImage = element.img
          obj.productName = element.Name
          obj.qty = element.quantity
          obj.totalAmount = total
          obj.variants = [{color:element.color,price:element.price,quantity:element.quantity,size:element.size}]
          Prod.push(obj)
        });
        order.products = Prod
        order.paymentType= 1
        order.gstAmount = shipping
        order.discount = 0
        order.finalAmount= total + shipping
        order.companyName=''
        order.businessOperatingState=''
        order.deliveryInstruction=''
        order.totalAmount = total
        order.gstIn=''
        order.shippingDetails = values
        setFinalOrder(order)
        setFormFilled(true)
      
    },
  });
const postOrder = async () =>{
 try {
        const res = await fetch(`${API_BASE_URL}/orders/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(finalOrder),
        });
        const resData = await res.json();
        console.log("user data", resData);
        if (resData && resData.status) {
          toast.success(resData.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          clearCart()
          Router.push("/thankyou");
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
}
  return (
    <section className="checkout-area ptb-60">
      <div className="container">
        {/* <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="user-actions">
              <i className="fas fa-sign-in-alt"></i>
              <span>
                Returning customer? <Link href="#">Click here to login</Link>
              </span>
            </div>
          </div>
        </div> */}

        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="billing-details">
                <h3 className="title">Billing Details</h3>

                <div className="row">
                
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className={`form-control ${
                          formik.touched.name && formik.errors.name
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-left invalid-feedback">
                          {formik.errors.name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Phone <span className="required">*</span>
                      </label>
                      <input
                  type="text"
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
                  </div>
                

                 

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>House No <span className="required">*</span></label>
                      <input
                  type="text"
                  placeholder="houseNo"
                  name="houseNo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.houseNo}
                  className={`form-control ${
                    formik.touched.houseNo && formik.errors.houseNo
                      ? "is-invalid"
                      : ""
                  }`}
                />
                  {formik.touched.houseNo && formik.errors.houseNo ? (
                <div className="text-left invalid-feedback">
                  {formik.errors.houseNo}
                </div>
              ) : null}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Landmark <span className="required">*</span></label>
                      <input
                  type="text"
                  placeholder="landmark"
                  name="landmark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.landmark}
                  className={`form-control ${
                    formik.touched.landmark && formik.errors.landmark
                      ? "is-invalid"
                      : ""
                  }`}
                />
                  {formik.touched.landmark && formik.errors.landmark ? (
                <div className="text-left invalid-feedback">
                  {formik.errors.landmark}
                </div>
              ) : null}
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-6">
                    <div className="form-group">
                      <label>
                        street <span className="required">*</span>
                      </label>
                      <input
                  type="text"
                  placeholder="street"
                  name="street"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                  className={`form-control ${
                    formik.touched.street && formik.errors.street
                      ? "is-invalid"
                      : ""
                  }`}
                />
                  {formik.touched.street && formik.errors.street ? (
                <div className="text-left invalid-feedback">
                  {formik.errors.street}
                </div>
              ) : null}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="form-group">
                      <label>
                        Country <span className="required">*</span>
                      </label>
                      <select    onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  name="country"
                  className={`form-control ${
                    formik.touched.country && formik.errors.country
                      ? "is-invalid"
                      : ""
                  }`}>
    <option selected>Choose...</option>
    <option value="US">US</option>
    <option value="Australia">Australia</option>
    <option value="Europe">Europe</option>
    <option value="Canada">Canada</option>
  </select>
        
                  
                  {formik.touched.country && formik.errors.country ? (
                <div className="text-left invalid-feedback">
                  {formik.errors.country}
                </div>
              ) : null}
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-6">
                    <div className="form-group">
                      <label>
                        Town / City <span className="required">*</span>
                      </label>
                      <input
                  type="text"
                  placeholder="city"
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  className={`form-control ${
                    formik.touched.city && formik.errors.city
                      ? "is-invalid"
                      : ""
                  }`}
                />
                  {formik.touched.city && formik.errors.city ? (
                <div className="text-left invalid-feedback">
                  {formik.errors.city}
                </div>
              ) : null}
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        State <span className="required">*</span>
                      </label>
                      <input
                  type="text"
                  placeholder="state"
                  name="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  className={`form-control ${
                    formik.touched.state && formik.errors.state
                      ? "is-invalid"
                      : ""
                  }`}
                />
                  {formik.touched.state && formik.errors.state ? (
                <div className="text-left invalid-feedback">
                  {formik.errors.state}
                </div>
              ) : null}
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Postcode / Zip <span className="required">*</span>
                      </label>
                      <input
                  type="text"
                  placeholder="pincode"
                  name="pincode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pincode}
                  className={`form-control ${
                    formik.touched.pincode && formik.errors.pincode
                      ? "is-invalid"
                      : ""
                  }`}
                />
                  {formik.touched.pincode && formik.errors.pincode ? (
                <div className="text-left invalid-feedback">
                  {formik.errors.pincode}
                </div>
              ) : null}
                    </div>
                  </div>

                  

                 

                  

                 
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="order-details">
                <h3 className="title">Your Order</h3>

                <OrderSummary />
                {
 isFormFilled &&  <PayPalCheckout amount={finalOrder?.finalAmount} postOrder={postOrder}/>

                }
 
                {/* <div className="payment-method">
                                    <p>
                                        <input type="radio" id="direct-bank-transfer" name="radio-group" defaultChecked={true} />
                                        <label htmlFor="direct-bank-transfer">Direct Bank Transfer</label>

                                        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                    </p>
                                    <p>
                                        <input type="radio" id="paypal" name="radio-group" />
                                        <label htmlFor="paypal">PayPal</label>
                                    </p>
                                    <p>
                                        <input type="radio" id="cash-on-delivery" name="radio-group" />
                                        <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                                    </p>
                                </div> */}

                {/* <Payment 
                                    amount={totalAmount * 100}
                                    disabled={disable}
                                /> */}
                                {
                                  !isFormFilled &&    <div className="order-btn">
                                  <button type="submit" className="btn btn-primary">
                                    Place Order
                                  </button>
                                </div>
                                }
               
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    total: state.total,
    product: state.addedItems,
    shipping: state.shipping,
  };
};
const mapDispatchToProps = (dispatch)=>{
  return{
      clearCart: ()=>{dispatch({type: 'RESET_CART'})},
       
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
