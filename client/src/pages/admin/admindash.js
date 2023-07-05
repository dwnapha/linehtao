import React from 'react'
import Layout from "./../../components/layout/layout.js"
import Adminmenu from '../../components/layout/adminmenu.js'
import { useAuth } from '../../context/auth.js'

const Admindash = () => {
  const [auth] = useAuth()
  return (
    <Layout >
        <div className='container-fluid m-3 p-3'>
          <div className='row'>

          <div className='col-md-3'>
            <Adminmenu />
          </div>

          <div className='col-md-9'>

            <div className='card w-75 p-3'>
                <h3>Canteen Name : {auth?.user?.name}</h3>
                <h3>Canteen Email : {auth?.user?.email}</h3>
                <h3>Canteen Number :{auth?.user?.phone_number}</h3>
            </div>

          </div>
          </div>
        </div>
    </Layout>
  )
}

export default Admindash