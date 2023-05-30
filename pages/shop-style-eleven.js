import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/Layout/Navbar';
import BannerSlider from '../components/shop-style-eleven/BannerSlider';
import ProductCategories from '../components/shop-style-eleven/ProductCategories';
import Facility from '../components/Common/Facility';
import BestSellersProducts from '../components/shop-style-eleven/BestSellersProducts';
import Subscribe from '../components/Common/Subscribe';
import Partner from '../components/Common/Partner';
import InstagramPhoto from '../components/Common/InstagramPhoto';
import Footer from '../components/Layout/Footer';
import AddsModal from '../components/Modal/AddsModal';

const ShopStyleEleven = () => {
    const products = useSelector((state) => state.products)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    useEffect(() => {
        const fetchData = async () => {
           
          //const token = Cookies.get("token");
          const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYTE5ZjMzNzdmNTdkZjQwNzgyM2I5MyIsInBob25lIjoiODU2MDAyOTU3NiIsImVtYWlsIjoiYXl1c2hzb25pODU2MDAyOTU3NkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjVlODg0ODk4ZGEyODA0NzE1MWQwZTU2ZjhkYzYyOTI3NzM2MDNkMGQ2YWFiYmRkNjJhMTFlZjcyMWQxNTQyZDgiLCJ1c2VyVHlwZSI6MSwicHJvZmlsZVBpY3R1cmUiOiIiLCJnc3ROdW1iZXIiOiJBQUFBQUFBQUFBIiwiZGV2aWNlSWQiOiJqaGZoaGYiLCJjcmVhdGlvblRpbWVTdGFtcCI6IjIwMjItMTItMjBUMTE6NDA6MzUuNzgxWiJ9LCJpYXQiOjE2NzY3OTI4NDJ9.bayuGel-x5POjttsXsA8sjjbC0hicAzFfsVvrnuNO1Y"
          try {
            const res = await fetch("http://139.59.64.38/api/products/dashboard", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
             
            });
            const dashboard = await res.json();
            console.log(' dashboard data',dashboard)
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
            
            <BannerSlider />

            <ProductCategories />

            {/* <SpecialOffer products={products} CompareProducts={addedItemsToCompare} /> */}
            
            <Facility />

            <BestSellersProducts products={products} CompareProducts={addedItemsToCompare} />

            <Subscribe />

            <Partner />

            <InstagramPhoto />

            <Footer /> 

            <AddsModal />
        </>
    );
}

export default ShopStyleEleven;