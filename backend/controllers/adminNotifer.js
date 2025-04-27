/*
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Order from '../models/orderModel.js'; // Correct path for the order model
import connectDB from '../config/mongodb.js';

dotenv.config();

// Watch Orders Collection using Change Streams
const watchOrders = async () => {
  try {
    const changeStream = Order.watch(); // Use Mongoose model directly to watch the orders collection

    if (changeStream && typeof changeStream.on === 'function') {
      changeStream.on('change', async (next) => {
        if (next.operationType === 'insert') {
          console.log('🛒 New Order Detected:', next.fullDocument);

          // Send email notification
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user:'mouhamad.abd.razak.yt@gmail.com',
              pass: '79317403m',
            },
          });

          await transporter.sendMail({
            from: 'mouhamad.abd.razak.yt@gmail.com',
            to: 'mhamadabdrazak555@gmail.com', // Email you want to receive notifications at
            subject: '🚀 New Order Alert!',
            text: `You have a new order:\n\n${JSON.stringify(next.fullDocument, null, 2)}`,
          });

          console.log('📧 Notification Email Sent!');
        }
      });
    } else {
      console.error("❌ Error: changeStream is not an instance of ChangeStream.");
    }
  } catch (error) {
    console.error('❌ Error with Change Stream:', error);
  }
};

// Main function to connect and watch
export const main = async () => {
  await connectDB(); // Ensure your database is connected
  await watchOrders(); // Start watching the orders collection for changes
};
*/