import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//PROTECT THE ROUTES.

//middleware -- the main role is that at any time either the next middleware is validated ,only then is the 
export const requireSignIn = async (req,res,next) =>{
    try{
        //COMPARING THE PROVIDED TOKEN with the jwt secret. if same , than we will move to further middlewares.
        const decode = JWT.verify(
            req.headers.authorization, // JWT TOKEN
            process.env.JWT_SECRET); 
            req.user = decode; // decrypt has info --> id of database , issued at time and expiry time
            next();
        
    }
    catch(error){
        res.send(`Error in requireSignin middleware ${error}`)
    }


}
export const isadmin = async (req,res,next)=>{
    try {

        const user = await userModel.findById(req.user._id); // it is finding the user in databse with user id provided according to the JWT TOKEN
        if(user.role !== 1 ){
            res.status(401).send({
                success:false,
                message:"Unauthorized Access."
            });
        }
        else {
            next();
        }
        
    } 
    catch (error) {
        console.log(error);
        res.send(`Error in isadmin middleware ${error}`);
    }
}
export const isuser = async (req,res,next)=>{
    try {

        const user = await userModel.findById(req.user._id); // it is finding the user in databse with user id provided according to the JWT TOKEN
        if(user.role !== 0 ){
            res.status(401).send({
                success:false,
                message:"Unauthorized Access."
            });
        }
        else {
            next();
        }
        
    } 
    catch (error) {
        console.log(error);
        res.send(`Error in isadmin middleware ${error}`);
    }
}