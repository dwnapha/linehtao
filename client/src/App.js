import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home.js';
import About from './pages/About.js';
import PageNotFound from './pages/PageNotFound.js';
import Register from './pages/Auth/Register.js';
import Login from './pages/Auth/login.js';
import Dashboard from './pages/user/Dashboard.js';
import PrivateRoute from './components/route/private.js';
import { Forgotpassword } from './pages/Auth/forgotpassword.js';
import AdminRoute from './components/route/adminroute.js';
import Admindash from './pages/admin/admindash.js';
import Createcategory from './pages/admin/createcategory.js';
import Createproduct from './pages/admin/createproduct.js';
import Users from './pages/admin/users.js';
import Profile from './pages/user/profile.js';
import Orders from './pages/user/Orders.js';
import Products from './pages/admin/products.js';
import UpdateProduct from './pages/admin/updateproduct.js';
import Search from './pages/search.js';
import CategoryProduct from './pages/CategoryProduct.js';
import CartPage from './pages/cartpage.js'
import AdminOrders from './pages/admin/adminOrders.js';
function App() {
  return (
   <>
   <Routes>
    <Route path = '/' element = {< Home/>} />
    <Route path = '/search' element = {<Search/>} />
    <Route path = '/cart' element = {<CartPage/>} />
    <Route path = '/category/:slug' element = {<CategoryProduct/>} />

    <Route path='/dashboard' element = {< PrivateRoute />}>
      <Route path = "user" element = {< Dashboard/>} />
      <Route path = "user/profile" element = {< Profile/>} />
      <Route path = "user/orders" element = {< Orders/>} />
    </Route>

    <Route path='/dashboard' element = {<AdminRoute />}>
      <Route path = "admin" element = {< Admindash/>} />
      <Route path = "admin/create-category" element = {< Createcategory/>} />
      <Route path = "admin/create-product" element = {< Createproduct/>} />
      <Route path = "admin/product/:slug" element = {< UpdateProduct/>} />
      <Route path = "admin/users" element = {< Users/>} />
      <Route path = "admin/products" element = {< Products/>} />
      <Route path = "admin/orders" element = {< AdminOrders/>} />
    </Route>

    <Route path='/forgotpassword' element = {< Forgotpassword/>} />
    <Route path = '/about' element = {< About/>} />
    <Route path='/register' element = {<Register/>}/>
    <Route path='/login' element = {<Login/>}/>
    <Route path = '*' element = {< PageNotFound/>} />
   </Routes>
   </>
  );
}

export default App;
