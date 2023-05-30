import React, { Component } from 'react';
import { connect } from 'react-redux'
import Link from 'next/link';
import Cart from '../Modal/Cart';
import Cookies from "js-cookie";
class MegaMenu extends Component {

    state = {
        display: false,
        searchForm: false,
        collapsed: true
    };

    handleCart = () => {
        this.setState( prevState => {
            return {
                display: !prevState.display
            };
        });
    }

    handleSearchForm = () => {
        this.setState( prevState => {
            return {
                searchForm: !prevState.searchForm
            };
        });
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    componentDidMount() {
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        window.scrollTo(0, 0);
    }

    render() {
        const userId = Cookies.get("userId");
        const { collapsed } = this.state;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

        let { products } = this.props;
        return (
            <>
                <div className="navbar-area">
                    <div id="navbar" className="comero-nav">
                        <div className="container">
                            <nav className="navbar navbar-expand-md navbar-light">
                                <Link href="/">
                                    <span className="navbar-brand">
                                        {/* <img src="/images/logo2.png" alt="logo" width="100px" height="100px"/> */}
                                        Jaipur Online Shop
                                    </span>
                                </Link>

                                <button 
                                    onClick={this.toggleNavbar} 
                                    className={classTwo}
                                    type="button" 
                                    data-toggle="collapse" 
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                                    aria-expanded="false" 
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon-bar top-bar"></span>
                                    <span className="icon-bar middle-bar"></span>
                                    <span className="icon-bar bottom-bar"></span>
                                </button>

                                <div className={classOne} id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item p-relative">
                                            <Link href="/">
                                                <a className="nav-link active">
                                                    Home  
                                                </a>
                                            </Link>

                                           
                                        </li>
                                        
                                        <li className="nav-item megamenu">
                                            <Link href="/category">
                                                <a className="nav-link">
                                                Category
                                                </a>
                                            </Link>
                                           
                                        </li>
                                        {
                                            userId &&  <li className="nav-item megamenu">
                                            <Link href="/myorder">
                                                <a className="nav-link">
                                                    My Orders  
                                                </a>
                                            </Link>
                                           
                                        </li>
                                        }
                                        

                                        <li className="nav-item megamenu">
                                            <Link href="#about">
                                                <a className="nav-link">About  </a>
                                            </Link>
                                            
                                        </li>

                                       
                                    </ul>

                                    <div className="others-option">
                                        {/* <div className="option-item">
                                            <i 
                                                onClick={this.handleSearchForm} 
                                                className="search-btn fas fa-search"
                                                style={{
                                                    display: this.state.searchForm ? 'none' : 'block'
                                                }}
                                            ></i>

                                            <i 
                                                onClick={this.handleSearchForm} 
                                                className={`close-btn fas fa-times ${this.state.searchForm ? 'active' : ''}`}
                                            ></i>
                                            
                                            <div 
                                                className="search-overlay search-popup"
                                                style={{
                                                    display: this.state.searchForm ? 'block' : 'none'
                                                }}
                                            >
                                                <div className='search-box'>
                                                    <form className="search-form">
                                                        <input className="search-input" name="search" placeholder="Search" type="text" />
                                                        <button className="search-button" type="submit">
                                                            <i className="fas fa-search"></i>
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div> */}
                                       {
                                        userId ? <div className="option-item" onClick={ () => {Cookies.remove('userId')
                                        this.props.clearCart();
                                        }}>
                                        <Link href="/login" >
                                            <a >Logout</a>
                                        </Link>
                                    </div>:   <div className="option-item">
                                        <Link href="/login">
                                            <a>Login</a>
                                        </Link>
                                    </div>
                                       }
                                        

                                        <div className="option-item">
                                            <Link href="#">
                                                <a
                                                    onClick={(e) => {
                                                        //e.preventDefault();
                                                        this.handleCart()
                                                    }}
                                                >
                                                    Cart({products.length}) <i className="fas fa-shopping-bag"></i>
                                                </a>
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                
                {this.state.display ? <Cart onClick={this.handleCart} /> : ''}
            </>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        products: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        clearCart: ()=>{dispatch({type: 'RESET_CART'})},
         
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(MegaMenu)
