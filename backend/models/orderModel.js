import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID of the user placing the order
  items: { type: Array, required: true },   // List of items in the order
  amount: { type: Number, required: true }, // Total cost of the order
  address: { type: Object, required: true },// Shipping address
  status: {  type: String, required: true,default: 'Order Placed'}, // 📝 By default, every new order is marked as "Order Placed" so This can later be updated to "Shipped", "Delivered", "Cancelled", etc.                                                         
  paymentMethod: { type: String, required: true }, // Example: "Credit Card", "PayPal", "Cash on Delivery"
  payment: {  type: Boolean, required: true, default: false}, // 📝 Starts as false because payment hasn't been confirmed yet  Once payment is successful, it should be updated to true
  date: { type: Number, required: true }   // Timestamp of when the order was created
});

// 📝 Why use `mongoose.models.order || ...`?
//    To avoid model overwrite error in Next.js or hot reload environments
//    If model 'order' already exists (due to hot reload), reuse it instead of redefining
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
