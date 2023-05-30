import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const AddToCart = (props) => {
   
    const dispatch = useDispatch()

    const handleAddToCart = () => {
       
        dispatch({
            type: 'ADD_QUANTITY_WITH_NUMBER',
            id:props._id,
            qty:1,
        obj:{color:props.variantsArr[0].variant.split('-')[0],size:'L',price:props.price,img:props.productImages[0],Name:props.productName}
        })

        toast.success('Added to the cart', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    return(
        <Link href="#">
            <span
                className="btn btn-light"
                onClick={(e) => {
                 handleAddToCart()
                }}
            >
                Add to Cart
            </span>
        </Link>
    )
}

export default AddToCart;