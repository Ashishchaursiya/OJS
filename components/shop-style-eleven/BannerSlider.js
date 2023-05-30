import React, { Component } from 'react';
import Link from 'next/link';
import VisibilitySensor from "react-visibility-sensor";
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    items: 1,
    loop: true,
    nav: false,
    dots: true,
    animateOut: "slideOutDown",
    animateIn: "slideInDown",
    smartSpeed: 750,
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        "<i class='fas fa-arrow-left'></i>",
        "<i class='fas fa-arrow-right'></i>"
    ]
}

class BannerSlider extends Component {
    state = { 
        display: false,
        panel: true
    };

    componentDidMount(){ 
        this.setState({ display: true }) 
    }
    render() {
        let { img } = this.props;
        
        console.log('img at banner compt',img)
        return (
            <>
                {this.state.display ? <OwlCarousel 
                    className="home-slides-three bottom-carousel-dots owl-carousel owl-theme"
                    {...options}
                >
                    {img && img.map( item => {
                   return  (  <div className="" key={item._id}>
                    <div className="d-table">
                     
                        <div className="d-table-cell">
                      
                       <img src={item.bannerImage} />
                      
                        </div>
                    </div>
                </div>)
                    })}
                   
                     
                     
                   

                    

                   
                </OwlCarousel> : ''}
            </>
        );
    }
}

export default BannerSlider;
