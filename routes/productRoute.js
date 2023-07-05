import express from "express";
import { isadmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {getProductController, getSingleProductController , ProductPhotoController ,Deleteproduct, updateProductController, searchProduct, ProductCategoryController, braintreeToken, braintreePayment} from "../controllers/productController.js";
import {createProductController }from "../controllers/productController.js";


 
const router = express.Router();

//create product
router.post('/create-product',requireSignIn ,isadmin,formidable(), createProductController )

//get all products

router.get('/get-product',getProductController )

//get single product
router.get('/get-product/:slug',getSingleProductController )

//photo
router.get('/product-photo/:pid',ProductPhotoController )

//delete
router.delete('/delete/:pid', Deleteproduct )

//update 
router.put('/update-product/:pid',requireSignIn ,isadmin,formidable(), updateProductController )

//search product
router.get('/search/:keyword' ,searchProduct );

//get product based on category
router.get('/product-category/:slug' ,ProductCategoryController)

//payment 
//token
router.get('/braintree/token' , braintreeToken);
router.post('/braintree/payment' ,requireSignIn ,braintreePayment)

export default router