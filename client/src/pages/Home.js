import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/layout.js'
import { useAuth } from '../context/auth.js'
import axios from 'axios';
import { Button } from 'antd';
import {useCart}  from '../context/cart.js';
import toast from 'react-hot-toast';
const Home = () => {
  const [auth,setAuth] = useAuth();
  const [products ,setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart , setCart] = useCart();
  const getAllProducts = async() =>{
    try {
      
        const {data} = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/get-product`
          )
        if(data.success){
          setProducts(data.product)
        }
        else console.log("Didn't get")

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllProducts();
  },[])


  return (
    <Layout>
       <div className='row home-page '>
       <img
        src="https://images.pexels.com/photos/17474217/pexels-photo-17474217/free-photo-of-mnnit-canteen.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
        
        <div className='col-ml-9'>
          <h1 className='text-center' >All Products</h1>
          <div className='d-flex flex-wrap'>
          {products?.map((p) => (
             
                <div className="card m-2" style={{ width: "17rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <h5 className="card-title card-price"> {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}</h5>
                    <Button className="btn btn-secondary ms-1" onClick={
                        () =>{
                          setCart([...cart,p]);
                          localStorage.setItem('cart' , JSON.stringify([...cart ,p]))
                          toast.success("Item added to cart");
                        }
                    }>Add to Cart</Button>
                  </div>
                </div>
             
            ))}
          </div>
        </div>
       </div>
    </Layout> 
    
  )
}

export default Home