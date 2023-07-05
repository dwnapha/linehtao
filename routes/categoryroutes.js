import express from "express";
import { isadmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { CategoryController, UpdateCategory, createCatcontoller, deleteCategory, singleCategoryController } from "../controllers/categoryController.js";



const router = express.Router();

//creating a category
router.post('/create-category' , 
requireSignIn,
isadmin,
createCatcontoller
);

//updating a category
router.put('/update-category/:id' ,
requireSignIn ,
isadmin, 
UpdateCategory)

//get all categories
router.get('/getcategory', CategoryController);

//getting a single category

router.get('/singlecat/:slug' , singleCategoryController)

//delete a category
router.delete('/deletecategory/:id' , requireSignIn, isadmin, deleteCategory)

export default router