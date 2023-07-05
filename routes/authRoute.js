import express from "express";
import {loginController , registerController , testController, forgotpasswordController, authuserController, authadminController, updateProfileController, getOrdrersController, getallOrdrersController, UpdateOrder} from '../controllers/authController.js'
import { isadmin, isuser, requireSignIn } from "../middlewares/authMiddleware.js";
//router object --  The express.Router() function is used to create a new router object. 
//This function is used when you want to create a new router object in your program to handle requests. 
const router = express.Router();
//ROUTE TO REGISTER PAGE
router.post('/register' ,registerController )


//ROUTE TO LOGIN PAGE
router.post('/login' , loginController)

// FORGOT PASSWORD

router.post('/forgot-password' , forgotpasswordController);

router.get('/test' , requireSignIn, isadmin , testController)

//protected route
router.get('/user-auth', requireSignIn,isuser, authuserController)

router.get('/admin-auth', requireSignIn,isadmin, authadminController)

//upadte profile
router.put('/profile', requireSignIn, updateProfileController)
//user asks for his orders
router.get('/orders' , requireSignIn,getOrdrersController)
//admin asks for current order
router.get('/all-orders' , requireSignIn,isadmin, getallOrdrersController)
//admin wants to update order status
router.put('/order-status/:orderId' , requireSignIn,isadmin, UpdateOrder)
export default router