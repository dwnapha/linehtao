import React from 'react'
import {NavLink} from 'react-router-dom'
const Adminmenu = () => {
  return (
<>
   <div className='text-center'>
    <h2>Admin Panel</h2>

   <div className="list-group">
    <NavLink to ="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create a new Category</NavLink>
    <NavLink to ="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create a new Product</NavLink>
    <NavLink to ="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
    <NavLink to ="/dashboard/admin/products" className="list-group-item list-group-item-action">Product</NavLink>
    <NavLink to ="/dashboard/admin/orders" className="list-group-item list-group-item-action">Order Details</NavLink>
    </div>
    
   </div>
</>
  )
}

export default Adminmenu