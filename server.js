import express from 'express'
import dotenv from 'dotenv'
import morgan from'morgan' ; // will log http request ->GET /api/v1/auth/test 200 61.467 ms - 15
import connectDB from'./config/db.js'
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryroutes.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'
// rest object
const app = express()

//config env
dotenv.config()
//middlewares (use in express makes sure that the provided middleware is used in all requests.)
app.use(express.json())
app.use(morgan('dev')) // used to keep a log of http requests seen in console.
app.use(cors()); // allowing cross origin data transfer.
//connecting database
connectDB();

//auth route
app.use('/api/v1/auth' , authRoute)

//category route
app.use('/api/v1/category',categoryRoute)

//product routes
app.use('/api/v1/product',productRoute )
//rest api
app.get('/' , (req,res) => {
    console.log(req);
    res.send("<h1>Welcome</h1>");
});

const PORT = process.env.PORT || 8080

app.listen(PORT ,() => {
     console.log(`Server running on ${PORT}`);
});