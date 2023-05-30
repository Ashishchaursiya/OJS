import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Link from "next/link";
import Navbar from "../components/Layout/Navbar";
import { API_BASE_URL } from "../utils/config";

const MyOrder = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const id = Cookies.get("userId");
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYTE5ZjMzNzdmNTdkZjQwNzgyM2I5MyIsInBob25lIjoiODU2MDAyOTU3NiIsImVtYWlsIjoiYXl1c2hzb25pODU2MDAyOTU3NkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjVlODg0ODk4ZGEyODA0NzE1MWQwZTU2ZjhkYzYyOTI3NzM2MDNkMGQ2YWFiYmRkNjJhMTFlZjcyMWQxNTQyZDgiLCJ1c2VyVHlwZSI6MSwicHJvZmlsZVBpY3R1cmUiOiIiLCJnc3ROdW1iZXIiOiJBQUFBQUFBQUFBIiwiZGV2aWNlSWQiOiJqaGZoaGYiLCJjcmVhdGlvblRpbWVTdGFtcCI6IjIwMjItMTItMjBUMTE6NDA6MzUuNzgxWiJ9LCJpYXQiOjE2NzY3OTI4NDJ9.bayuGel-x5POjttsXsA8sjjbC0hicAzFfsVvrnuNO1Y";
      try {
        const res = await fetch(`${API_BASE_URL}/orders/user?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        const orders = await res.json();

        console.log("orders", orders);
        setLoading(false);
        setOrder(orders.orders);

        // setPattern(allpattern.data.Data)
        // setLoading(false);
      } catch (err) {
        //setLoading(false);
        console.log("err", err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div class="container my-5">
        <div class="row">
          {order && order.length > 0 ? (
            <>
             {order.map((item, idx) => (
              <>
             
              <div className="col-lg-4">
  {item.products.map((prod) => ( 
    <>
   <div class="d-flex flex-row bd-highlight pb-3">
  <div class="p-2 bd-highlight">
  <img src={prod.productImage} className="img-fluid" width="100px" height="100px" />
  </div>
  <div class="p-2 bd-highlight">
  <p> <b>ProductId:</b>{prod.pId}</p>
<p> <b>Product Name:</b>{prod.productName}</p>
{
  prod.variants.map( subItem => (
    <>
    <p> <b>Price:</b>{subItem.price}</p>
<p> <b>Size & Quantirt:</b>{subItem.size},{subItem.quantity}</p>
    </>
  ))
}
  </div>
  
</div>
    
    </>
  ))}
                
              </div>
              <div className="col-lg-2">
              <p> <b>OrderId:</b>{item.orderId}</p>
              <p> <b>Total Amount:</b>{item.finalAmount}</p>
              <p> <b>Date:</b>{item.creationTimeStamp.split('T')[0]}</p>
              <p> <b>Payment Mode:</b>{item?.paymentType==0 ? "COD" :"Online"}</p>
                
              </div>
              <div className="col-lg-6">
             
              <div class="md-stepper-horizontal green">
                
   {
              item.trackingDetails.map( ord => (
                <>
                 <div class="md-step active">
      <div class="md-step-circle"><span>&#10003;</span></div>
      <div class="md-step-title">{ord.title}</div>
      <div class="md-step-optional">{ord.dateTimeStamp}</div>
     {ord.title=='Out for delivery' && <div class="md-step-optional">{`Delivery Partner Mob:${ord.message.split(' ')[16]}`}</div>}  
      <div class="md-step-bar-left"> </div>
      <div class="md-step-bar-right"></div>
    </div>
   
                </>
              ))
             }
    
  </div>


              </div>
             <hr></hr>
  
              </>
             ) )}
             
            </>
          ) : (
            <>
              <h1 className="text-center"> No Orders Found!</h1>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default MyOrder;
