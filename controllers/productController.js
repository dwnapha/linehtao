import slugify from "slugify";
import productsModel from "../models/productsModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from 'fs';
import braintree from "braintree";
import dotenv from 'dotenv'

//payment gateway

dotenv.config()

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });







export const createProductController = async (req ,res) => {


    try {
        
       const {name, description ,price,quantity, category,delivery } = req.fields; 
       const {photo} = req.files;

       //switch validation
       switch(true){
        case(!name): return res.status(500).send({error:"Missing value while updating product"})
        case(!category): return res.status(500).send({error:"Missing value while updating product"})
        case(!quantity): return res.status(500).send({error:"Missing value while updating product"})
        case(!description): return res.status(500).send({error:"Missing value while updating product"})
        case(!price): return res.status(500).send({error:"Missing value while updating product"})
        case photo && photo.size > 10000000: return res.status(500).send({error:"Photo should be present and less than 1 mb"})
       }
        
       const product = new productsModel({
        ...req.fields, slug: slugify(name)
        })

       if(photo){
        product.photo.data = fs.readFileSync(photo.path)
        product.photo.contentType = photo.type
       } 

       await product.save();
       res.status(200).send({
        success : true,
        message: " Product created successfully",
        product
    })

    } 
    
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message :" Error while creating product."
        })
    }
};

export const getProductController = async(req,res) =>{
    try {
        
       
        const product = await productsModel.find({})
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({createdAt : -1})
        
        res.status(200).send({
            success : true,
            countTotal : product.length,
            message: " Got Product successfully",
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message :" Error while getting product."
        })
    }
}

export const getSingleProductController = async (req,res) =>{

    try {
        
        const product = await productsModel.
        findOne({slug : req.params.slug}) 
        .select("-photo")
        .populate("category");

        res.status(200).send({
            success:true,
            message:"Product",
            product
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message :" Error while getting the product."
        })
    }
}
export const ProductPhotoController = async (req,res) =>{
    try {
        const product = await productsModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message :" Error while getting the photo."
        })
    }
}

export const Deleteproduct = async (req,res) =>{
    try {
        
        const deleted = await productsModel.
        findById(req.params.pid).select("-photo");

        if(!deleted) {
            return res.send({
                success:false,
                message:"Already deleted",
            })
        }

        const product = await productsModel.
        findByIdAndDelete(req.params.pid).select("-photo")
        return res.status(200).
        send({
            success: true, 
            message:"Product deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message :" Error while getting deleting product."
        })
    }
}


export const updateProductController = async (req ,res) => {


    try {
        
       const {name, description ,price,quantity, category,delivery } = req.fields; 
       const {photo} = req.files;

       //switch validation
       switch(true){
        case(!name): return res.status(500).send({error:"Missing value while updating product"})
        case(!category): return res.status(500).send({error:"Missing value while updating product"})
        case(!quantity): return res.status(500).send({error:"Missing value while updating product"})
        case(!description): return res.status(500).send({error:"Missing value while updating product"})
        case(!price): return res.status(500).send({error:"Missing value while updating product"})
        case photo && photo.size > 10000000: return res.status(500).send({error:"Photo should be present and less than 1 mb"})
       }

       const product = await productsModel.findByIdAndUpdate(req.params.pid,
        {...req.fields , slug : slugify(name)} , {new:true}
        );

       if(photo){
        product.photo.data = fs.readFileSync(photo.path)
        product.photo.contentType = photo.type
       } 

       await product.save();
       res.status(200).send({
        success : true,
        message: " Product updates successfully",
        product
    })

    } 
    
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message :" Error while Updating product."
        })
    }
};

export const searchProduct = async (req,res) =>{

    try {
        
        const {keyword} = req.params
        const result = await productsModel.
        find({
            $or: [
                {name : {$regex: keyword, $options:"i"}},
                {description: {$regex: keyword, $options:"i"}},
            ]
        }).select("-photo");
        res.json(result);

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message :" Error while Searching product."
        })
    }

}
export const ProductCategoryController = async (req,res) =>{

    try {
        
       const category = await categoryModel.findOne({slug:req.params.slug})
       const products = await productsModel.find({category})
       .populate('category');

       res.status(200).send({
        success:true,
        category,
        products
       })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error,
            message :" Error while Searching product."
        })
    }

}

export const braintreeToken= async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const braintreePayment= async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };