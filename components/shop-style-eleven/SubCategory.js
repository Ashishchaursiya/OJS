import React, { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '../../utils/config';
 

const SubCategoryDetails = ({categoryId}) => {
    const [subCategory,setSubCategory] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
           
          //const token = Cookies.get("token");
          const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYTE5ZjMzNzdmNTdkZjQwNzgyM2I5MyIsInBob25lIjoiODU2MDAyOTU3NiIsImVtYWlsIjoiYXl1c2hzb25pODU2MDAyOTU3NkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjVlODg0ODk4ZGEyODA0NzE1MWQwZTU2ZjhkYzYyOTI3NzM2MDNkMGQ2YWFiYmRkNjJhMTFlZjcyMWQxNTQyZDgiLCJ1c2VyVHlwZSI6MSwicHJvZmlsZVBpY3R1cmUiOiIiLCJnc3ROdW1iZXIiOiJBQUFBQUFBQUFBIiwiZGV2aWNlSWQiOiJqaGZoaGYiLCJjcmVhdGlvblRpbWVTdGFtcCI6IjIwMjItMTItMjBUMTE6NDA6MzUuNzgxWiJ9LCJpYXQiOjE2NzY3OTI4NDJ9.bayuGel-x5POjttsXsA8sjjbC0hicAzFfsVvrnuNO1Y"
          try {
            const res = await fetch(`${API_BASE_URL}/sub-categories/category/${categoryId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
             
            });
            const data = await res.json();
            setSubCategory(data.subCategories)
            console.log(' sub category data',data)
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
                {subCategory && subCategory.map((data, idx) => (
                    <div className="col-lg-3 col-md-6 products-col-item" key={idx}>
                        <div className="single-product-box">
                            <div className="product-image">
                                <Link href= {`/product/subcategory/${data._id}`}as={`/product/subcategory/${data._id}`}>
                                    <a>
                                        <img src={data.imageURL} alt="image" style={{height:400}}/>
                                       
                                    </a>
                                </Link>

                                <ul>
                                   
                                 
                                   
                                </ul>
                            </div>

                            <div className="product-content">
                                <h3>
                                    <Link href={`/product/subcategory/${data._id}`}  as={`/product/subcategory/${data._id}`}>
                                        <a>{data.subCategoryName}</a>
                                    </Link>
                                </h3>

                                <div className="product-price">
                                   
                                </div>

                             

                            
                            </div>
                        </div>
                    </div>
                ))}
               
            </>
        );
    
}

export default SubCategoryDetails;