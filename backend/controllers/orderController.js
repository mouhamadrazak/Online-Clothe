import { response } from 'express';
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

// placing order using COD method mean cash on delivery method
const placeOrder = async(req,res)=>{
      
    try {
        const {userId,items,amount,address} = req.body ; // getting this from frontend 

          //we create the orderData to save those userid ,items... in the mongodb
        const orderData = { // we will name this in frontend as same 
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false, // because there is payment money so its false 
            date:Date.now()
        }

        const  newOrder = new orderModel(orderData) // we put our orderdata in orderModel for mongodb 
        await newOrder.save() // save that orderData in the mongodb

        await userModel.findByIdAndUpdate(userId,{cartData:{}}) // update the state of userId after we save then clear the cartData with emty object

        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// placing order using Credit Cart 
const placeOrderCredit = async(req,res)=>{

}

// if i want i can add more oayment function


// All orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
      // 'await' is used to wait for the result of an asynchronous operation (a promise)
      // In this case, it waits for orderModel.find({}) to finish fetching all orders from the database
      const orders = await orderModel.find({}); // Get all orders from the database
  
      // Send a JSON response with the list of orders
      res.json({ success: true, orders });
  
    } catch (error) {
      console.log(error);
  
      // If there's an error, send a failure response with the error message
      res.json({ success: false, message: error.message });
    }
  }

  
//UserOrder to Display the User Order That he Placed In frontend In orders Page
const userOrders = async (req, res) => {
    try {
      // Extract the userId from the request body (sent from the frontend)
      const { userId } = req.body;
  
      // Find all orders in the database that belong to this user
      const orders = await orderModel.find({ userId });
  
      // Send a success response with the list of orders
      res.json({ success: true, orders });
  
    } catch (error) {
      console.log(error);
  
      // Send a failure response with the error message
      res.json({ success: false, message: error.message });
    }
  }
  


// update order Status like ("Shipped", "Delivered", "Cancelled") from admin pannel
const updateStatus = async (req, res) => {
    try {
      // Get the orderId and new status from the request body (sent from the admin panel)
      const { orderId, status } = req.body;
  
      // Update the status of the order with the matching ID in the database
      await orderModel.findByIdAndUpdate(orderId, { status });
  
      // Respond with success message
      res.json({ success: true, message: 'Status Updated' });
  
    } catch (error) {
      console.log(error);
  
      // If there's an error, respond with a failure message
      res.json({ success: false, message: error.message });
    }
  }
  

 
export{placeOrder,placeOrderCredit,allOrders,userOrders,updateStatus}
