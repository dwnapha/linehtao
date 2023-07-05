import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    name:
    {
        type : String,
        required: true,
        unique: true
    },
    slug:
    {
        type:String,
        lowercase:true,
    },
    description : {
        type:String,
        required :true,
    },
    price: {
        type:Number,
        required :true,
    },
    quantity: {
        type:Number,
        required :true,
    },
    
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    delivery : {
        type:Boolean,
    },
},{timestamps : true})
;

export default mongoose.model('Product', productSchema)