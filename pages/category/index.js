import React, { Component } from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import ProductsCard from '../../components/category-without-sidebar/ProductsCard';
import CategoryDetails from '../../components/shop-style-eleven/Category';

const hookClass = (props) => {
    const products = useSelector((state) => state.products)
    const addedItemsToCompare = useSelector((state) => state.addedItemsToCompare)
    return <Index {...props} products={products} CompareProducts={addedItemsToCompare} />
}

class Index extends Component {

    state = {
        gridClass: 'products-col-four'
    }

    handleGrid = (e) => {
        this.setState({
            gridClass: e
        });
    }
    
    render() {
        let { gridClass } = this.state;
        let { products, CompareProducts } = this.props;
        return (
            <>
                <Navbar />

            

                <section className="products-collections-area ptb-60">
                    <div className="container">
                        <div className="section-title">
                            <h2><span className="dot"></span> Category</h2>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                {/* <ProductsFilterOptions onClick={this.handleGrid} /> */}

                                <div id="products-filter" className={`products-collections-listing row ${gridClass}`}>
                                    <CategoryDetails  />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </>
        );
    }
}

export default hookClass;
