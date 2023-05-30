import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { removeItem } from "../../store/actions/actions";
import { toast } from 'react-toastify';
class Cart extends Component {
  state = {
    display: false,
  };

  closeCart = () => {
    this.props.onClick(this.state.display);
  };
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
  render() {
    let item = localStorage.getItem("cart");
    //console.log("cart", item);
    let { products, total } = this.props;
    console.log("cart", products);
    return (
      <div
        className="modal right fade show shoppingCartModal"
        style={{
          display: "block",
          paddingRight: "16px",
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={this.closeCart}
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <div className="modal-body">
              <h3>My Cart ({products.length})</h3>

              <div className="product-cart-content">
                {products.length > 0
                  ? products.map((product, idx) => (
                      <div className="product-cart" key={idx}>
                        <div className="product-image">
                          <img src={product.img} alt="image" />
                        </div>

                        <div className="product-content">
                          <h3>
                            <Link href="#">
                              <a>{product.Name}</a>
                            </Link>
                          </h3>
                          {/* <span>{product.color} / {product.size}</span> */}
                          <div className="product-price">
                            <span>{product.quantity}</span>
                            <span>x</span>
                            <span className="price">${product.price}</span>
                          </div>
                          <div className="ml-auto"  >
                            <button
                            
                              type="button"
                              className="close"
                              aria-label="Close"
                               onClick={() => this.handleRemove(idx)}
                            >
                              <span aria-hidden="true"  style={{fontSize:"25px"}}>&times;</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  : "Empty"}
              </div>
              {products.length>0 && 
                <>
              <div className="product-cart-subtotal">
                <span>Subtotal</span>

                <span className="subtotal">${total}</span>
              </div>
               
                  <div className="product-cart-btn">
                <Link href="/checkout">
                  <span className="btn btn-primary">Proceed to Checkout</span>
                </Link>
                <Link href="/cart">
                  <span className="btn btn-light">View Shopping Cart</span>
                </Link>
              </div>
                </>
                }
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("addedItems", state.addedItems);
  return {
    products: state.addedItems,
    total: state.total,
    //addedItems: state.addedItems
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => {dispatch(removeItem(id))},
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);
