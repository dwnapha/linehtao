import React , {useState, useEffect}from 'react'
import Adminmenu from '../../components/layout/adminmenu'
import  Layout  from '../../components/layout/layout.js'
import axios from 'axios'
import toast  from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import { Select } from 'antd'

const {Option} = Select
const AdminOrders = () => {

    const [status,useStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"])
    const [cstatus , setCstatus] = useState() 
    const [order , setOrder] = useState([]);
    const [auth, setAuth] = useAuth();

    const handleChange = async(orderId,value) =>{
        try {
            const {data}  = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,{
                status:value,
            });
            getOrder();
        } catch (error) {
            console.log(error)
        }
    }
    const getOrder = async() =>{
        try {
        
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`)
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
    <>
    <Layout>
    <div className='row'>
        <div className = 'col-md-3'>
            <Adminmenu/>
        </div>
        <div className='col-md-9'>
            <h1 className='text-center'> All orders</h1>
            {
                  order?.map((o,i) =>{
                    return(
                      <div className='border shadow'>
                      <table className='table'>
                        <thead>
                          <tr>
                          <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            
                            <th scope="col">Payment</th>
                            <th scope="col">Date</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>

                        <tbody>

                          <tr>
                            <td>{i+1}</td>
                            <td>
                                <Select 
                                bordered = {false} 
                                onChange={ (value) => handleChange(o._id,value)} 
                                defaultValue={o?.status}>

                                {status.map((s, i) => 
                                    (
                                    <Option key = {i} value = {s} >{s}</Option>
                                    )
                                    )
                                }
                                

                                </Select>
                            </td>
                            
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
    </Layout>
    </>
  )
}

export default AdminOrders