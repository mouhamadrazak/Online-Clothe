import express from 'express'
import {placeOrder,placeOrderCredit,allOrders,userOrders,updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js'
const orderRouter = express.Router()

// Admin Feature
orderRouter.post('/list',adminAuth,allOrders)// adminAuth because only the admin can see the list of all orders
orderRouter.post('/status',adminAuth,updateStatus) // also only the admin can change the status

// Payment Feature 
orderRouter.post('/place',authUser,placeOrder) // for the cash delivery
orderRouter.post('/credit',authUser,placeOrderCredit)


// user feature
orderRouter.post('/userorder',authUser,userOrders) 

export default orderRouter