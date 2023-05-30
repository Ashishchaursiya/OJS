import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Layout/Navbar';
 
import Subscribe from '../components/Common/Subscribe';
import Partner from '../components/Common/Partner';
import InstagramPhoto from '../components/Common/InstagramPhoto';
import Footer from '../components/Layout/Footer';

const ThankYou = () => {
    return (
        <>
            <Navbar />

            <div className="thank-you-area">
                <div className="container">
                    <h1>Thank You For an Order</h1>
                    <Link href="/">
                        <a className="btn btn-primary">Go Home</a>
                    </Link>
                </div>
            </div>

           

           
            
            <Footer />
        </>
    );
}

export default ThankYou;
