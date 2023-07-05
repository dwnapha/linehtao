import React from 'react'
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">Mnnit Canteen App by Harsh</h1>
      <p className="text-center mt-3"> 
         <Link to = "/about"> About </Link>
         |
         <Link to = "/"> Home </Link>
         </p>
      </div>
  )
}

export default Footer