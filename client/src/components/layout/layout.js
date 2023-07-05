import React from 'react'
import Header from './header'
import Footer from './footer'
import { Toaster } from 'react-hot-toast';

const Layout = (porps) => {
  return (
    <div>
    <Header/>
    <main style={{minHeight: "70vh"}}>
    <Toaster/>
    {porps.children}
       
    </main>
    <Footer/>
    </div>
    
  )
}

export default Layout