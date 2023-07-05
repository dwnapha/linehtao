import React from 'react'
import Layout from '../../components/layout/layout'
import Usermenu from '../../components/layout/usermenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const auth = useAuth()
  
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <Usermenu/>
            </div>
            <div className='col-md-9'>
                <div className='card w-75 p-3'>

                    <h4>Name : {auth[0]?.user?.name}</h4>
                    <h4>Registration Number : {auth[0]?.user?.registration_number}</h4>
                    <h4>Phone Number : {auth[0]?.user?.phone_number}</h4>

                </div>
            </div>
        </div>
    </div>
</Layout>
  )
}

export default Dashboard