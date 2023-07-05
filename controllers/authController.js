import { comparePassword , hashPassword } from '../helpers/authHelper.js';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken';


export const registerController = async (req ,res) =>{
    
     try{
            //destructuring the registration data by registartion page
        const {name , email , password , hostel 
            , room , registration_number , phone_number,role,answer} = req.body;
            if(!registration_number){
                res.send(
                    {
                        success:false,
                        message : "Kindly add regisration Number."
                    });
            }
        
        //checking existing user

        const olduser = await userModel.findOne({email})
        if(olduser){
            return res.status(200).send({
                success:false,
                message:'Already Registered using the given email.Kindly login'
            })
        }

        //register user 
        const hashedresult = await hashPassword(password)
        //saving user
        
        const user = await new userModel({
            name , 
            email ,
            password: hashedresult,
            room,
            hostel,
            registration_number,
            phone_number,
            role,
            answer,
        }).save()

        res.status(201).send({
            success:true,
            message:"User registered",
            user
        })
     }

    catch(err){
        console.log("error");
        res.status(500).send({
            message: "Error in registering",
            err,
        });
    }
        
    
   
};

// login controller

export const loginController = async (req , res) =>{
try {

    const {email , password} = req.body

    if(!email || !password){
        return res.status(404).send({
            success:false,
            message:"Empty email or password field"
        });

    }
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).send({
            success:false,
            message:"Email not registered"
        });
    }
    //matching password

    const match = await comparePassword(password , user.password);
    console.log(password , user.password , match);
    if(!match){
        res.status(200).send({
            success:false,
            message:"Invalid Password"
        })
    }
    // token creation 
    //debugged code here using else statement
    // was sending a response after not matched because of absence of else statement.
    else {
        const token = await JWT.sign({_id:user._id} ,process.env.JWT_SECRET, 
            {expiresIn: "7d"}) ;
        // used to create a token
    
        res.status(200).send({
            success:true,
            message:"Login successfully",
            // updating 
            user:{
                name: user.name,
                email: user.email,
                phone_number : user.phone_number,
                registration_number: user.registration_number,
                password : user.password,
                hostel : user.hostel,
                room:user.room,
                role : user.role
            },
            token,
        })
    }
    
} 
catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error in login",
        error,
    })
}
}

// testing middle ware for login
export const testController = (req , res) =>{
   try{
    res.send("Test is working");
   } 
   catch(error){
        console.log(error);
   }
}

export const authuserController = (req,res) =>{
    try{
        res.status(200).send({ok:true , role : 0}); 
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}
export const authadminController = (req,res) =>{
    try{
        res.status(200).send({ok:true , role : 1});
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}

export const forgotpasswordController = async(req ,res) => {
    try {
        const {email , newPassword, answer} = req.body
        if(!email){
            res.status(400).send("Email required")
        }
        if(!answer){
            res.status(400).send("Answer required")
        }
        if(!newPassword){
            res.status(400).send("New Password required")
        }

        // checking email and answer to reset password
        const user = await userModel.findOne({email , answer})
        //validation
        console.log(user);
        if(!user){
            res.status(404).send({
                success: false,
                message: "Either user not found or incorrect email or password"
            })
        }

        const hashd = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id , {password : hashd});
        res.status(200).send({
            success:true,
            message:"Successfully updated password"
        })

    } 
    catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

export const updateProfileController = async (req, res) => {
    try {
      const { name, email,registration_number, password, phone_number ,hostel ,room } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (!password ) {
        return res.json({ error: "Passsword is required" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone_number: phone_number || user.phone,
          hostel: hostel|| user.hostel,
          room : room || user.room
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  
  export const getOrdrersController = async (req,res) =>{
    try {
        
    const orders = await orderModel
      .find({buyer: req.user._id})
      .populate("products", "-photo")
      .populate("buyer", "name")
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
}
export const getallOrdrersController = async (req,res) =>{
    try {
        
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
}

export const UpdateOrder = async(req , res) =>{

    try {
        const { orderId} = req.params
        const {status} = req.body

        const orders = await orderModel.findByIdAndUpdate(
            orderId , 
            {status} , 
            {new:true}
        )
        res.json(orders)

    } catch (error) {
        console.log(error)
    }

}