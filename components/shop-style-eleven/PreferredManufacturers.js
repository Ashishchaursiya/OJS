import React, { Component } from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));

const options = {
//   loop: true,
//   nav: false,
//   dots: false,
//   autoplayHoverPause: true,
//   autoplay: true,
  navText: [
    "<i class='fas fa-chevron-left'></i>",
    "<i class='fas fa-chevron-right'></i>",
  ],
  responsive: {
    0: {
      items: 3,
    },
    576: {
      items: 4,
    },
    768: {
      items: 6,
    },
    1200: {
      items: 9,
    },
  },
};

class PreferredManufacturers extends Component {
  state = {
    display: false,
    panel: true,
  };

  componentDidMount() {
    this.setState({ display: true });
  }

  render() {
    let { products } = this.props;
   
    return (
      <>
        <section className="all-products-area pb-60 py-3">
          <div className="container">
            <div className="tab products-category-tab-style-2">
              <div className="row">
                <div className="col-lg-12 col-md-12 py-2">
                  <div className="title">
                    <h2>
                      <span className="dot"></span> PreferredManufacturers
                    </h2>
                  </div>
                  <div>.</div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="tab_content">
                    {this.state.display ? (
                      <OwlCarousel
                        className="instagram-slides owl-carousel owl-theme"
                        {...options}
                      >
                        {products?.map((item) => (
                          <div className="instagram-box border" key={item._id}>
                            <img src={item.brandImage} alt="image" />
                            <span>{item.brandName}</span>
                          </div>
                        ))}
                      </OwlCarousel>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default PreferredManufacturers;
