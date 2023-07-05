import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const CategoryController = async (req ,res) => {


    try {
        
        const category = await categoryModel.find({})
        res.status(200).send({
            success : true,
            message: " Categories -- >",
            category
        })

    } 
    
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message :" Error while loading categories."
        })
    }
};

export  const UpdateCategory = async(req,res) =>{

    try {

        const {name} = req.body
        const {id} = req.params

        const category = await categoryModel.findByIdAndUpdate(id ,
            {name , slug:slugify(name)}, 
            {new:true}
        )

        res.status(200).send({
            success:true,
            message:"Category Updated.",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating"
        })
    }

};

//creating a new category 
export const createCatcontoller = async(req,res) =>{
    try {
        const {name} = req.body

        if(!name){
            return res.status(401),send({message:'Name is required'})
        }

        const existing = await categoryModel.findOne({name});

        if(existing){
            return res.status(200).send({
                success:true,
                message:"Category already created"
            })
        }
        const category = await new categoryModel(
        {
            name, 
            slug: slugify(name),

        }).save()
            
        res.status(200).send({
            success:true,
            message:"Category created",
            category
        })

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success:false,
            error,
            message:"Error in category Controller"
        })
    }
};

//single

export const singleCategoryController = async (req,res) =>{
    try {
        
        const {slug} = req.params;

        const category = await categoryModel.findOne({slug});
        res.status(200).send({
            success:true,
            message:"Got single Category successfully",
            category
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:"Error in single category Controller"
        })
    }
}

export const deleteCategory = async (req,res) => { 

    try {
        
        const {id} = req.params;
        

        await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success:true,
            message:"Deleted Category successfully", // be careful on what you are sending as api request.
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:"Error while deleting Controller"
        })
    }

}

