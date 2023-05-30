import React, { Component } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Layout/Navbar";
import Footer from "../../../components/Layout/Footer";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { API_BASE_URL } from '../../../utils/config';
const SubCategory = () => {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { subcategoryId } = router.query;
  console.log(subcategoryId);

  useEffect(() => {
    const fetchData = async () => {
      //const token = Cookies.get("token");
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZmViZTI2NmEzZTAyMDAzNGU2OTRlZSIsInBob25lIjoiODg0MDkxNjA1MyIsImVtYWlsIjoiYXNoaXNoYzFAY29kZXdhdmUuY29tIiwicGFzc3dvcmQiOiJjNzc1ZTdiNzU3ZWRlNjMwY2QwYWExMTEzYmQxMDI2NjFhYjM4ODI5Y2E1MmE2NDIyYWI3ODI4NjJmMjY4NjQ2IiwidXNlclR5cGUiOm51bGwsInByb2ZpbGVQaWN0dXJlIjoiIiwiZ3N0TnVtYmVyIjpudWxsLCJjcmVhdGlvblRpbWVTdGFtcCI6IjIwMjMtMDMtMDFUMDI6NTM6MjYuODkzWiJ9LCJpYXQiOjE2Nzg3NzM5NTZ9.Id1a8hgl4thHc-OojARFyiT_MEJEfaamMuB0k4nBt6o";
      try {
        const res = await fetch(
          `${API_BASE_URL}/products/sub-category/${subcategoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await res.json();
        setProduct(data.products);
        console.log(" product data", data);
        // setPattern(allpattern.data.Data)
        // setLoading(false);
      } catch (err) {
        //setLoading(false);
        console.log("err", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <section className="products-collections-area ptb-60">
        <div className="container">
          <div className="section-title">
            <h2>
              <span className="dot"></span> Products
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12">
              {/* <ProductsFilterOptions onClick={this.handleGrid} /> */}

              <div
                id="products-filter"
                className={`products-collections-listing row`}
              >
                {
                  	product && product.length>0 ? <>
                      {product &&
                  product.map((data, idx) => (
                    <div
                      className="col-lg-3 col-md-6 products-col-item"
                      key={idx}
                    >
                      <div className="single-product-box">
                        <div className="product-image">
                          <Link
                            href={`/product/${data._id}`}
                            as={`/product/${data._id}`}
                          >
                            <a>
                              <img
                                src={data.productImages[0]}
                                alt="image"
                                style={{ height: 400 }}
                              />
                            </a>
                          </Link>

                          <ul></ul>
                        </div>

                        <div className="product-content">
                          <h3>
                            <Link
                              href={`/product/${data._id}`}
                              as={`/product/${data._id}`}
                            >
                              <a>{data.productName}</a>
                            </Link>
                          </h3>

                          <div className="product-price">
                          <span className="new-price">₹{data.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                    </> : 
                    <>
                    <h1 className="text-center"> No Products Found!</h1>
                   </>
                }
               
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SubCategory;
