import React , {useState , useEffect} from 'react'
import Layout from '../../components/layout/layout'
import Usermenu from '../../components/layout/usermenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import moment from 'moment'
const Orders = () => {


  const [order , setOrder] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrder = async() =>{
    try {
      
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`)
      setOrder(data);

    } catch (error) {
      console.log(error); 
    }
  }
  useEffect(() =>{
    if(auth?.token){
     getOrder();
    }
  },[auth?.token])
  
  return (
    <Layout>
        <div className='container-fluid p-3 m-3'>
        <div className='row'>
            <div className='col-md-3'>
                <Usermenu/>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All orders</h1>
                {
                  order?.map((o,i) =>{
                    return(
                      <div className='border shadow'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            
                            <th scope="col">Payment</th>
                            <th scope="col">Date</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>

                        <tbody>

                          <tr>
                            
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td>{o?.payment.success? "Success" : "Failed"}</td>
                            <td>{moment(o?.createdAt).fromNow()}</td>
                            <td>{o?.products?.length}</td>
                          </tr> 
                        </tbody>

                        <div className='col-md-8'>
                        {o?.products?.map(
                      (p,i) => (
                        <div className='row mb-2 p-3 card flex-row'>
                                <div className='col-md-4'> 
                                <img
                                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                  className="card-img-top"
                                  alt={p.name}
                                /> 
                                </div>
                                <div className='col-md-8'> 
                                  <h6 className='mb-4 '>Item - {i+1}  {  p.name}</h6>
                                  <p className='mb-4'>{p.description}</p>
                                  <h6> Price :{p.price}</h6>
                                </div>
                        </div>
                      )
                    )}
                        </div>

                      </table>
                    </div>
                    )
                    
                  })
                }
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Orders