import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Navbar from '../../components/Layout/Navbar';
import Breadcrumb from '../../components/Common/Breadcrumb';
import Footer from '../../components/Layout/Footer';
import ProductImage from '../../components/product-details/ProductImage';
import ProductContent from '../../components/product-details/ProductContent';
import DetailsTab from '../../components/product-details/DetailsTab';
import RelatedProducts from '../../components/product-details/RelatedProducts';
import { API_BASE_URL } from '../../utils/config';
 

const Product = () => {
    const [allProducts, setProduct] = useState(null);
    const [similarProduct, setSimilarProduct] = useState(null);
    const router = useRouter()
    const { id } = router.query
    
    const product = useSelector((state) => state.products.find(item => item.id === parseInt(id)))

    const products = useSelector((state) => state.products)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    useEffect(() => {
        const fetchData = async () => {
          //const token = Cookies.get("token");
          
          const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZmViZTI2NmEzZTAyMDAzNGU2OTRlZSIsInBob25lIjoiODg0MDkxNjA1MyIsImVtYWlsIjoiYXNoaXNoYzFAY29kZXdhdmUuY29tIiwicGFzc3dvcmQiOiJjNzc1ZTdiNzU3ZWRlNjMwY2QwYWExMTEzYmQxMDI2NjFhYjM4ODI5Y2E1MmE2NDIyYWI3ODI4NjJmMjY4NjQ2IiwidXNlclR5cGUiOm51bGwsInByb2ZpbGVQaWN0dXJlIjoiIiwiZ3N0TnVtYmVyIjpudWxsLCJjcmVhdGlvblRpbWVTdGFtcCI6IjIwMjMtMDMtMDFUMDI6NTM6MjYuODkzWiJ9LCJpYXQiOjE2Nzg3NzM5NTZ9.Id1a8hgl4thHc-OojARFyiT_MEJEfaamMuB0k4nBt6o";
          try {
            const res = await fetch(
              `${API_BASE_URL}/products/details`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                body:JSON.stringify({productId:id})
              }
            );
            const data = await res.json();
            setProduct(data.product);
            setSimilarProduct(data.similarProducts)
            console.log(" product details", data);
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
            <Breadcrumb title="Belted chino trousers polo" />

            <section className="products-details-area pt-60">
                <div className="container">
                    <div className="row">
                        
                       {allProducts && <ProductImage img={allProducts?.productImages}/>}  

                      {allProducts && <ProductContent product={allProducts} />}   

                        {/* <DetailsTab /> */}

                    </div>
                </div>

                {/* <RelatedProducts products={allProducts} CompareProducts={addedItemsToCompare} /> */}
 
            </section>

            <Footer />
        </>
    );
}
export async function getServerSideProps({ query }) {
  return {
    props: {
      query: query.query || null,
    },
  };
}

export default Product