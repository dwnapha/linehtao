import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    hostel:{
        type:String,
        required:true
    },
    room:{
        type:Number,
        required:true,
    },
    registration_number:{
        type:Number,
        required:true,
    },
    phone_number:{
        type:Number,
        required:true,
    },
    role:{
        type:Number,
        required:true,
    },
    answer: {
        type : String,
        required : true,
    },


},{timestamps:true})

export default mongoose.model('users', userSchema)