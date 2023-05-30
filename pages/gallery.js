import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import Link from 'next/link';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Facility from '../components/Common/Facility';
import Breadcrumb from '../components/Common/Breadcrumb';

const images = [
    '/images/gallery-item1.jpg',
    '/images/gallery-item2.jpg',
    '/images/gallery-item3.jpg',
    '/images/gallery-item4.jpg',
    '/images/gallery-item5.jpg',
    '/images/gallery-item6.jpg',
    '/images/gallery-item7.jpg',
    '/images/gallery-item8.jpg',
    '/images/gallery-item9.jpg',
    '/images/gallery-item10.jpg',
    '/images/gallery-item11.jpg',
    '/images/gallery-item12.jpg'
]

class Index extends Component {
    state = {
        photoIndex: 0,
        isOpenImage: false
    }
    render() {
        const { photoIndex, isOpenImage } = this.state;
        return (
            <>
                <Navbar />

                <Breadcrumb title="Gallery" />

                <section className="gallery-area ptb-60">
                    <div className="container">
                        <div className="section-title">
                            <h2><span className="dot"></span> Gallery</h2>
                        </div>

                        <div className="row m-0">
                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item1.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 0 })}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item2.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 1})}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item3.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 2 })}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item4.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 3 })}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item5.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 4 })}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item6.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 5 })}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item7.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 6 })}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item8.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 7 })}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item9.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 8 })}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item10.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 9 })}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item11.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 10 })}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>

                            {isOpenImage && (
                                <Lightbox
                                    mainSrc={images[photoIndex]}
                                    nextSrc={images[(photoIndex + 1) % images.length]}
                                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                    onCloseRequest={() => this.setState({ isOpenImage: false })}
                                    onMovePrevRequest={() =>
                                    this.setState({
                                        photoIndex: (photoIndex + images.length - 1) % images.length,
                                    })
                                    }
                                    onMoveNextRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + 1) % images.length,
                                        })
                                    }
                                />
                            )}

                            <div className="col-lg-4 col-md-6 p-0">
                                <div className="single-gallery-item">
                                    <img src="/images/gallery-item12.jpg" alt="image" />

                                    <div className="gallery-content">
                                        <span>Fashion</span>
                                        <h3>Belted chino trousers polo</h3>
                                    </div>

                                    <Link href="#">
                                        <a 
                                            className="popup-btn"
                                            onClick={e => {e.preventDefault(); this.setState({ isOpenImage: true,  photoIndex: 11 })}}
                                        ></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <Facility />
                
                <Footer />
            </>
        );
    }
}

export default Index;