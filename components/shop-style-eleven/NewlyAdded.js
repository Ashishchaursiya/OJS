import React, { Component } from 'react';
import Link from 'next/link';
import QuickView from '../Modal/QuickView';
import AddToCompare from '../Shared/AddToCompare';
import AddToCart from '../Shared/AddToCart';

class NewlyAdded extends Component {

    state = {
        modalOpen: false,
        modalData: null,
        item:4
    };

    openTabSection = (evt, tabNmae) => {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabs_item_special3");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].classList.remove("fadeInUp");
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByTagName("li");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("current", "");
        }

        document.getElementById(tabNmae).style.display = "block";
        document.getElementById(tabNmae).className += " fadeInUp animated";
        evt.currentTarget.className += "current";
    }

    compareButton = (id) => {
        let compare_exist = this.props.CompareProducts.filter(item => item.id === id);
        if(compare_exist.length > 0){
            return(
                <Link href="#">
                    <a 
                        data-tip="Already Added" 
                        data-place="left" 
                        onClick={e => {
                                //e.preventDefault(); 
                            }
                        }
                        disabled={true}
                        className="disabled"
                    >
                        <i className="fas fa-sync"></i>
                    </a>
                </Link>
            )
        } else {
            return(
                <AddToCompare id={id} />
            )
        }
    }

    openModal = () => {
        this.setState({ modalOpen: true });
    }

    closeModal = () => {
        this.setState({ modalOpen: false });
    }

    handleModalData = (data) => {
        this.setState({ 
            modalData: data
        });
    }

    render() {
        let { products } = this.props;
        const { modalOpen } = this.state;
        return (
            <section className="all-products-area pb-60">
                <div className="container">
                    <div className="tab products-category-tab-style-2">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="title">
                                    <h2><span className="dot"></span>NewlyAdded </h2>
                                </div>

                                <ul className="tabs">
                                    <li
                                          onClick={(e) => { this.openTabSection(e, 'tab3'); this.setState({ 
                                            item: 4
                                        })}}
                                        className="current"
                                    >
                                        <span>
                                        show 4
                                        </span>
                                    </li>
                                    
                                    <li
                                        onClick={(e) => { this.openTabSection(e, 'tab3'); this.setState({ 
                                            item: products?.length
                                        })}}
                                    >
                                        <span>
                                            All
                                        </span>
                                    </li>
                                    
                                   
                                </ul>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="tab_content">
                                    <div id="tab3" className="tabs_item_special3">
                                        <div className="row">
                                            {products?.slice(0,this.state.item).map((data, idx) => (
                                                <div className="col-lg-3 col-sm-6 col-6" key={idx}>
                                                    <div className="single-product-box">
                                                        <div className="product-image">
                                                            <Link href="/product/[id]" as={`/product/${data._id}`}>
                                                                <a>
                                                                    <img src={data.productImages[0]} alt="image" style={{height:300}}/>
                                                                </a>
                                                            </Link>

                                                            <ul>
                                                                <li>
                                                                    <Link href="#">
                                                                        <a 
                                                                            data-tip="Quick View" 
                                                                            data-place="left" 
                                                                            onClick={e => {
                                                                                    //e.preventDefault(); 
                                                                                    this.openModal();
                                                                                    this.handleModalData(data)
                                                                                }
                                                                            }
                                                                        >
                                                                            <i className="far fa-eye"></i>
                                                                        </a>
                                                                    </Link>
                                                                </li>
                                                                
                                                                <li>
                                                                    
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        <div className="product-content">
                                                            <h3>
                                                                <Link href="/product/[id]" as={`/product/${data._id}`}>
                                                                    <a>{data.productName}</a>
                                                                </Link>
                                                            </h3>

                                                            <div className="product-price">
                                                                <span className="new-price">${data.discountType==2 ? data.price:data.discountType==0 ? data.price-data.discount:data.price-((data.price*data.discount)/100)}</span>
                                                            </div>

                                                            {/* <div className="rating">
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="far fa-star"></i>
                                                            </div> */}
                                                            
                                                            <Link href={`product/${data._id}`}>
                                <span
                                  className="btn btn-light"
                                  
                                >
                                  View Product
                                </span>
                              </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                  

                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { modalOpen ? <QuickView 
                    closeModal={this.closeModal} 
                    modalData={this.state.modalData}
                /> : '' }
            </section>
        );
    }
}

export default NewlyAdded;
