import React, { Component } from 'react';
import Link from "next/link";
import { connect } from 'react-redux';
import { removeItem, addQuantity, subtractQuantity } from '../../store/actions/actions';
import { toast } from 'react-toastify';

class CartProduct extends Component {
     
    handleRemove = (id) => {
       
        this.props.removeItem(id);

        toast.error('Removed from cart', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }
 
    render() {
       
        let cartItems = this.props.products.length ?
        (
            this.props.products.map((data, idx) => {
                return (
                    <tr key={idx}>
                        <td className="product-thumbnail">
                            <Link href="#">
                                <span>
                                    <img src={data.img} alt="item" width="150px" height="150px"/>
                                </span>
                            </Link>
                        </td>

                        <td className="product-name">
                            <Link href="#">
                                <span>{data.Name}</span>
                            </Link>
                            <ul>
                                {/* <li>Color: <strong>{data.color}</strong></li> */}
                                <li>Size: <strong>{data.size}</strong></li>
                               
                            </ul>
                        </td>

                        <td className="product-price">
                            <span className="unit-amount">${data.price}</span>
                        </td>

                        <td className="product-quantity">
                            <div className="input-counter">
                                <span 
                                    className="minus-btn"
                                    onClick={()=>{ data.quantity >1 && this.handleSubtractQuantity(data.id)}}
                                >
                                    <i className="fas fa-minus"></i>
                                </span>
                                <input 
                                    type="text" 
                                    value={data.quantity} 
                                    min="1" 
                                    max={10} 
                                    readOnly={true}
                                    onChange={e => (e)}
                                />
                                <span 
                                    className="plus-btn"
                                    onClick={()=>{this.handleAddQuantity(data.id)}}
                                >
                                    <i className="fas fa-plus"></i>
                                </span>
                            </div>
                        </td>
                        <td className="product-price">
                            <span className="unit-amount">{data.weight} Kg</span>
                        </td>
                        <td className="product-subtotal">
                            <span className="subtotal-amount">${data.price * data.quantity}</span>

                            <Link href="#">
                                <span
                                    className="remove"
                                    onClick={(e)=>{this.handleRemove(idx)}}
                                >
                                    <i className="far fa-trash-alt"></i>
                                </span>
                            </Link>
                        </td>
                    </tr>
                )
            })
        ): (
            <tr>
                <td className="product-thumbnail" colSpan="5">
                    <p>Empty.</p>
                </td>
            </tr>
        );

        return (
            <>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Name</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems}
                    </tbody>
                </table>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => {dispatch(removeItem(id))},
        addQuantity: (id) => {dispatch(addQuantity(id))},
        subtractQuantity: (id) => {dispatch(subtractQuantity(id))}
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(CartProduct)
