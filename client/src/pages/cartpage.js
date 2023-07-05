import Layout from '../components/layout/layout.js'
import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart.js'
import { useAuth } from '../context/auth.js'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast  from 'react-hot-toast'

const CartPage = () => {
  const [cart , setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const [clientToken , setClientToken] = useState("")
  const [instance,setInstance] = useState("")
  const [loading, setLoading] = useState(false)

 // delete item
  const removeCartitem = (pid) =>{
    try {
      let mycart = [...cart]
      let index = mycart.findIndex(item => item._id === pid)
      mycart.splice(index , 1)
      setCart(mycart);
      localStorage.setItem('cart' , JSON.stringify(mycart))
    } catch (error) {
      console.log(error)
    }
  }



  //get payment gateway token

  const getToken = async() =>{
    try {
      
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken)

    } catch (error) {
      console.log(error)
    }
  }


  //payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  

  useEffect(() =>{
    getToken()
  },[auth?.token])

  // total price
  const getTotal = () =>{
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US" , {
        style:"currency",
        currency: "INR"
      });

    } catch (error) {
      console.log(error)
    }
  }
  return (
    
    <Layout>
      <div className='container'> 
            <div className='row'>
                  <div className='col-md-12'>
                    <h1 className='text-ecnter bg-light p-2'>
                      {`Hello ${auth?.token && auth?.user?.name}`} 
                    </h1>
                    <h4>
                      {cart?.length > 1 ? `You have ${cart.length} items in your cart. ${auth?.token ? "": "Please login to checkout" }` : "Your cart is empty"}

                    </h4>
                  </div>

            </div>
          <div className='row'>

              <div className='col-md-8'>
                    {cart?.map(
                      p => (
                        <div className='row mb-2 p-3 card flex-row'>
                                <div className='col-md-4'> 
                                <img
                                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                  className="card-img-top"
                                  alt={p.name}
                                /> 
                                </div>
                                <div className='col-md-8'> 
                                  <h6 className='mb-4 '>{p.name}</h6>
                                  <p className='mb-4'>{p.description}</p>
                                  <h6> Price :{p.price}</h6>
                                  <button className='btn btn-danger' onClick={()=> removeCartitem(p._id)}>Remove</button>
                                </div>
                        </div>
                      )
                    )}
              </div>

                  <div className='col-md-3'>
                      <h4>Cart Summary</h4>
                      <p>Total | Payment</p>
                      <h2>Total : {getTotal()}</h2>
                 

                <div className="mt-2">
                  {!auth?.token ? "Kindly Login First" : ""}
                {!clientToken || !auth?.token || !cart?.length ? (
                 ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
                  </div>
                  </div>
            
          </div>
    </div>
    </Layout>
)
}

export default CartPage