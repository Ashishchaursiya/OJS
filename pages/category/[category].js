import React, { Component } from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
 
import ProductsCard from '../../components/category-without-sidebar/ProductsCard';
import SubCategoryDetails from '../../components/shop-style-eleven/SubCategory';
import { useRouter } from 'next/router';

 

const CategoryById = () => {

    const router = useRouter()
    const { category } = router.query
    console.log(category)

  
    

      
        return (
            <>
                <Navbar />

            

                <section className="products-collections-area ptb-60">
                    <div className="container">
                        <div className="section-title">
                            <h2><span className="dot"></span> SubCategory</h2>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                {/* <ProductsFilterOptions onClick={this.handleGrid} /> */}

                                <div id="products-filter" className={`products-collections-listing row`}>
                                     <SubCategoryDetails categoryId={category}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </>
        );
    
}

export default CategoryById;
