import express from "express"; // Express framework for APIs
import cors from "cors"; // Enables frontend-backend communication
import "dotenv/config"; // Allows usage of environment variables
import connectDB from "./config/mongodb.js";
import imagekit from "./config/ImageKit.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// import {main} from './controllers/adminNotifer.js'
// ------- APP Config ----------
const app = express();
const port = process.env.PORT || 4200;
connectDB(); // Connect to MongoDB
//main();
// Log ImageKit config (to check if it's working)
console.log("ImageKit Config:", imagekit); // because is not a function


// --------middlewares------
app.use(express.json()); // any request it will pass by using json
app.use(cors()); // by using this we can acsses the backend by using any apis

// ------- API Endpoints ---------
app.use('/api/user', userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get('/',(req,res)=>{
  res.send("API Working") // when ever i type npm run server it will print API WORKING
 })
 

// Start the Express server
app.listen(port,()=>console.log('Server start On PORT : ' + port ))// to start the express server

