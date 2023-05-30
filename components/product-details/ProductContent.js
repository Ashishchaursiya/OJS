import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { addQuantityWithNumber } from '../../store/actions/actions';
import SizeGuide from './SizeGuide';
import Shipping from './Shipping';
import CircleSelector from '../Common/colorPlate';
import Circle from '../Common/colorPlate';

class ProductContent extends Component {
    state = {
        qty: 1,
        max: 10,
        min: 1,
        sizeGuide: false,
        shipModal: false,
        color:'green',
        size:'',
        activeIndex:null,
        actualPrice:0
    };

    handleAddToCartFromView = () => {
        if(this.state.size==''){
            return   toast.error('Plz select Size', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
       // console.log(this.state.color,this.state.size)
        // let cart =  localStorage.getItem('cart')
        // if(cart){
        //     let parsedProd = JSON.parse(cart)
        //     console.log('parsed prod',parsedProd)
        //     let addedItem = parsedProd.find(item => item.id === this.props.product._id)
        //     if(addedItem){
        //         addedItem.qty += this.state.qty
        //         addedItem.total = addedItem.total +this.props.product.price * this.state.qty;
        //         let idx = parsedProd.findIndex(item => item.id === this.props.product._id)
        //         parsedProd[idx] = addedItem
        //         localStorage.setItem('cart',JSON.stringify(parsedProd))
        //     }else{
        //         let addedItem = {}
        //         addedItem.qty = this.state.qty;
        //         addedItem.id = this.props.product._id;
        //         addedItem.price = this.props.product.price;
        //         addedItem.color = this.state.color;
        //         addedItem.size = this.state.size;
        //         addedItem.total = this.props.product.price * this.state.qty;
        //         localStorage.setItem('cart',JSON.stringify([addedItem]))
                
        //     }
        // }else{
        //    let  addedItem = {}
        //     addedItem.qty = this.state.qty;
        //     addedItem.id = this.props.product._id;
        //     addedItem.price = this.props.product.price;
        //     addedItem.color = this.state.color;
        //     addedItem.size = this.state.size;
        //     addedItem.total = this.props.product.price * this.state.qty;
        //     localStorage.setItem('cart',JSON.stringify([addedItem]))
        // }
        
        this.props.addQuantityWithNumber(this.props.product._id, this.state.qty,{color:this.state.color,size:this.state.size,price:this.state.actualPrice,img:this.props.product.productImages[0],Name:this.props.product.productName,id2:this.props.product.productId,weight:this.props.product.weight ? this.props.product.weight:0 }); 

        toast.success('Added to the cart', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
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

    openSizeGuide = () => {
        this.setState({ sizeGuide: true });
    }

    closeSizeGuide = () => {
        this.setState({ sizeGuide: false });
    }

    openShipModal = () => {
        this.setState({ shipModal: true });
    }

    closeShipModal = () => {
        this.setState({ shipModal: false });
    }
    selecetedColor = (color,idx) =>{
        
        this.setState({ color: color });
        this.setState({ activeIndex: idx });
        console.log('color',this.state.color)
    }
    selecetedSize = (size) =>{
        this.setState({ size: size });
        console.log('size',this.state.size)
    }

    render() {
        const { sizeGuide, shipModal } = this.state;
        const {product} = this.props
        // let color = product.attributes.find( item => item.name=='Color').types
        let size = product.attributes.find( item => item.name=='Size').types
        let price =  product.discountType==2 ? product.price:product.discountType==0 ? product.price-product.discount:product.price-((product.price*product.discount)/100)
       // console.log(size,color)
        
        return (
            <>
                <div className="col-lg-6 col-md-6">
                    <div className="product-details-content">
                        <h3>{product.productName} </h3>

                        <div className="price">
                            <span className="new-price">${this.state.actualPrice ? this.state.actualPrice :price}</span>
                        </div>

                        
                        
                      

                        <ul className="product-info">
                        {/* <li><span>Reviews:</span>{product?.reviews?.length} </li> */}
                        <li><span>Rating:</span>{product.avgRating}</li>
                            <li><span>Description:</span>{product.description} </li>
                            {/* <li><span>Availability:</span> <Link href="#"><a>In stock ({product.stock} items)</a></Link></li> */}
                            {/* <li><span>Product Type:</span> <Link href="#"><a>T-Shirt</a></Link></li> */}
                        </ul>

                        {/* <div className="product-color-switch">
                            <h4>Color:</h4>
                             
                               
                                
                               {
                                 color.map( (item,index) => {
                                   return  (  
                                    <div className={`mycircle roundedCircle ${this.state.activeIndex === index ? "myactive" : ""}`} style={{backgroundColor:item}}  onClick={() => this.selecetedColor(item,index)}>

                                        </div>
                                    // <Circle color={item.variant.split('-')[0]} key={index} selecetedColor={this.selecetedColor}/>
                                       
                                      
                                     
                                    )
                                })
                               }
                                
                                
                             
                            
                        </div> */}

                        <div className="product-size-wrapper">
                            <h4>Size:</h4>

                            <ul>
                            {
                                 size.map( (item,idx) => {
                                   return  (  
                                        
                                      
                                      <li className="" key={idx} onClick={ () => { this.selecetedSize(item.toUpperCase())
                                        this.setState({actualPrice: product.discountType==2 ? product.variantsArr[idx].price:product.discountType==0 ? product.variantsArr[idx].price-product.discount:product.variantsArr[idx].price-((product.variantsArr[idx].price*product.discount)/100)})
                                      }}>
                                      <Link href="#">
                                          <a>{item.toUpperCase()}</a>
                                      </Link>
                                  </li>
                                    )
                                })
                               }
                               
                               
                               
                            </ul>
                        </div>

                        

                        <div className="product-add-to-cart">
                            <div className="input-counter">
                                <span 
                                    className="minus-btn"
                                    onClick={this.DecreaseItem}
                                >
                                    <i className="fas fa-minus"></i>
                                </span>
                                <input 
                                    type="text" 
                                    value={this.state.qty}
                                    min={this.state.min}
                                    max={this.state.max} 
                                    onChange={e => this.setState({ qty: e.target.value })}
                                />
                                <span 
                                    className="plus-btn"
                                    onClick={this.IncrementItem}
                                >
                                    <i className="fas fa-plus"></i>
                                </span>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                onClick={this.handleAddToCartFromView}
                            >
                                <i className="fas fa-cart-plus"></i> Add to Cart
                            </button>
                        </div>

                       

                        {/* <div className="buy-checkbox-btn">
                            

                            <div className="item">
                                <Link href="/checkout">
                                    <a className="btn btn-primary">Buy it now!</a>
                                </Link>
                            </div>
                        </div>

                        <div className="custom-payment-options">
                            <span>Guaranteed safe checkout:</span>

                            <div className="payment-methods">
                                <Link href="#">
                                    <a>
                                        <img src="/images/payment-image/1.svg" alt="image" />
                                    </a>
                                </Link>

                                <Link href="#">
                                    <a>
                                        <img src="/images/payment-image/2.svg" alt="image" />
                                    </a>
                                </Link>

                                <Link href="#">
                                    <a>
                                        <img src="/images/payment-image/3.svg" alt="image" />
                                    </a>
                                </Link>

                                <Link href="#">
                                    <a>
                                        <img src="/images/payment-image/4.svg" alt="image" />
                                    </a>
                                </Link>

                                <Link href="#">
                                    <a>
                                        <img src="/images/payment-image/5.svg" alt="image" />
                                    </a>
                                </Link>

                                <Link href="#">
                                    <a>
                                        <img src="/images/payment-image/6.svg" alt="image" />
                                    </a>
                                </Link>

                                <Link href="#">
                                    <a>
                                        <img src="/images/payment-image/7.svg" alt="image" />
                                    </a>
                                </Link>
                            </div>
                        </div> */}
                    </div>
                </div>
                
            </>
        );
    }
}

const mapDispatchToProps= (dispatch)=>{
    return {
        addQuantityWithNumber: (id, qty,obj) => {dispatch(addQuantityWithNumber(id, qty,obj))}
    }
}

export default connect(
    null,
    mapDispatchToProps
)(ProductContent)