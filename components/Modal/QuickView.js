import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { addQuantityWithNumber } from '../../store/actions/actions';
import { ToastContainer, toast } from 'react-toastify';

class QuickView extends Component {

    state = {
        qty: 1,
        max: 10,
        min: 1
    };

    handleAddToCartFromView = () => {
        this.props.addQuantityWithNumber(this.props.modalData.id, this.state.qty); 

        toast.success('Added to the cart', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });

        setTimeout(() => {this.props.closeModal()},5000); 
    }

    IncrementItem = () => {
        this.setState(prevState => {
            if(prevState.qty < 10) {
                return {
                    qty: prevState.qty + 1
                }
            } else {
                return null;
            }
        });
    }

    DecreaseItem = () => {
        this.setState(prevState => {
            if(prevState.qty > 1) {
                return {
                    qty: prevState.qty - 1
                }
            } else {
                return null;
            }
        });
    }

    render() {
        const { closeModal, modalData } = this.props;
        return (
            <div className="modal fade productQuickView show" style={{paddingRight: '16px', display: 'block'}}>
                <ToastContainer />
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" onClick={closeModal} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i className="fas fa-times"></i></span>
                        </button>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="productQuickView-image">
                                    <img src={modalData.productImages[0]} alt="image" /> 
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="product-content">
                                    <h3>
                                        <Link href="#">
                                            <a>{modalData.productName}</a>
                                        </Link>
                                    </h3>

                                    <div className="price">
                                        <span className="new-price">${modalData.price}</span>
                                    </div>
                                    <ul className="product-info">
                        <li><span>Reviews:</span>{modalData?.reviews?.length} </li>
                        <li><span>Rating:</span>{modalData.avgRating}</li>
                            <li><span>Description:</span>{modalData.description} </li>
                            {/* <li><span>Availability:</span> <Link href="#"><a>In stock ({modalData.stock} items)</a></Link></li> */}
                            {/* <li><span>Product Type:</span> <Link href="#"><a>T-Shirt</a></Link></li> */}
                        </ul>
                                  

                                   

                                    

                                    

                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps= (dispatch)=>{
    return {
        addQuantityWithNumber: (id, qty) => {dispatch(addQuantityWithNumber(id, qty))}
    }
}

export default connect(
    null,
    mapDispatchToProps
)(QuickView)
