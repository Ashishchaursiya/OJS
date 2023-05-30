import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Layout/Navbar";
import BannerSlider from "../components/shop-style-eleven/BannerSlider";
import ProductCategories from "../components/shop-style-eleven/ProductCategories";

import Facility from "../components/Common/Facility";
import BestSellersProducts from "../components/shop-style-eleven/BestSellersProducts";
import Subscribe from "../components/Common/Subscribe";
import Partner from "../components/Common/Partner";
import InstagramPhoto from "../components/Common/InstagramPhoto";
import Footer from "../components/Layout/Footer";
import AddsModal from "../components/Modal/AddsModal";
import { useState } from "react";
import ShopForYou from "../components/shop-style-eleven/ShopFor";
import PreferredManufacturers from "../components/shop-style-eleven/PreferredManufacturers";
import MostPopular from "../components/shop-style-eleven/MostPopular";
import FlashSaleProduct from "../components/shop-style-eleven/FlashSaleProducts";
import TopRated from "../components/shop-style-eleven/TopRated";
import NewlyAdded from "../components/shop-style-eleven/NewlyAdded";
import DiscountForYou from "../components/shop-style-eleven/DiscountForYou";
import YouMayLike from "../components/shop-style-eleven/YouMayLike";
import { API_BASE_URL } from "../utils/config";
import Spinner from "../components/Common/Spinner";
const ShopStyleEleven = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState([]);
  const products = useSelector((state) => state.products);
  const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare);
  useEffect(() => {
    const fetchData = async () => {
      //const token = Cookies.get("token");
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZmViZTI2NmEzZTAyMDAzNGU2OTRlZSIsInBob25lIjoiODg0MDkxNjA1MyIsImVtYWlsIjoiYXNoaXNoYzFAY29kZXdhdmUuY29tIiwicGFzc3dvcmQiOiJjNzc1ZTdiNzU3ZWRlNjMwY2QwYWExMTEzYmQxMDI2NjFhYjM4ODI5Y2E1MmE2NDIyYWI3ODI4NjJmMjY4NjQ2IiwidXNlclR5cGUiOm51bGwsInByb2ZpbGVQaWN0dXJlIjoiIiwiZ3N0TnVtYmVyIjpudWxsLCJjcmVhdGlvblRpbWVTdGFtcCI6IjIwMjMtMDMtMDFUMDI6NTM6MjYuODkzWiJ9LCJpYXQiOjE2Nzg3NzM5NTZ9.Id1a8hgl4thHc-OojARFyiT_MEJEfaamMuB0k4nBt6o";
      try {
        const res = await fetch(`${API_BASE_URL}/products/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const dashboard = await res.json();
        setLoading(false);
        setDashboardData(dashboard);
        console.log(" dashboard data", dashboard);
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
      {loading ? <Spinner /> : <>
      <Navbar />

<BannerSlider img={dashboardData.banners} />

{/* <ProductCategories /> */}

{/* <ShopForYou products={dashboardData.shopFor} /> */}
{/* <PreferredManufacturers products={dashboardData.preferredManufacturers} /> */}
<MostPopular products={dashboardData.mostPopular} />
{dashboardData?.FlashSaleProduct?.length > 0 && (
  <FlashSaleProduct products={dashboardData.FlashSaleProduct} />
)}
<TopRated products={dashboardData.topRated} />
<NewlyAdded products={dashboardData.newlyAdded} />
<DiscountForYou products={dashboardData.discountForYou} />
<YouMayLike products={dashboardData.youMayLike} />

<Facility />
<Footer />
      </>}
     
 
    </>
  );
};

export default ShopStyleEleven;
