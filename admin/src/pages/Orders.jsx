import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      // if token not available so return null
      return null;
    }

    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } }); // emty object before headers because we dont have to send anything in body
      //console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders); // in the last .orders this is the var in backend in our allorders function that we create and then  add this orders in set orders
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async(event,orderId)=>{
       try {                                                                     //status: event.target.value means:Get the selected value from the dropdown (event.target.value) And send it as the new status in the body. ✅ Example: { orderId: "abc123", status: "Shipped" }
        const response = await axios.post(backendUrl + '/api/order/status',{orderId,status:event.target.value},{headers:{token}}) // passing token of admin because only admin can change status
        if (response.data.success) {                                       // 2Request body (data sent to the backend)
          await fetchAllOrders() // if change status true we will call this function to update it 
        }
       } catch (error) {                                                  
          console.log(error);
          // eslint-disable-next-line no-undef
          toast.error(response.data.message)
        
       }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]); // whenever the token of admin updated the fetchAllOrders will excuted

  return orders.map((order, index) => {
    return (
      <div key={index} className="bg-white shadow-md rounded-xl p-4 mb-6 border border-gray-200">
        <div className="flex items-start gap-4">
          {/* Icon */} 
          <img className="w-10 h-10 mt-1" src={assets.box_icon} alt="order-icon" />
  
          {/* Order Details */}
          <div className="flex-1">
            {/* Items */}
            <div className="mb-2 text-sm text-gray-700">
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return (
                    <p key={index}>
                      {item.name} × {item.quantity} <span className="text-xs text-gray-500">({item.size})</span>
                    </p>
                  );
                } else {
                  return (
                    <p key={index}>
                      {item.name} × {item.quantity} <span className="text-xs text-gray-500">({item.size})</span>,
                    </p>
                  );
                }
              })}
            </div>
  
            {/* Address */}
            <div className="text-sm text-gray-600 mb-1">
              <p className="text-[22px] text-red-600">{order.address.firstName + " " + order.address.lastName}</p>
              <p><span className="font-semibold">Country:</span> {order.address.country}</p>
              <p><span className="font-semibold">State:</span> {order.address.state}</p>
              <p><span className="font-semibold">City:</span> {order.address.city}</p>
              <p><span className="font-semibold">Street:</span> {order.address.street}</p>
              <p><span className="font-semibold">Zip Code:</span> {order.address.zipCode}</p>
              <p><span className="font-semibold">📞 Phone:</span> {order.address.phone}</p>
              <p><span className="font-semibold">Email:</span> {order.address.email}</p>
            </div>
  
            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-2 text-gray-700">
              <p><span className="font-semibold">Items:</span> {order.items.length}</p>
              <p><span className="font-semibold">Method:</span> {order.paymentMethod}</p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                <span className={order.payment ? "text-green-600" : "text-red-500"}>
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p><span className="font-semibold">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
            </div>
  
            {/* Amount and Status */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
              <p className="text-lg font-semibold text-gray-800">
                {currency}{order.amount}
              </p>
  
              <select
                defaultValue={order.status} onChange={(event)=>statusHandler(event,order._id)}
                className="mt-2 sm:mt-0 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For delivery">Out For delivery</option>
                <option value="Deliverd">Deliverd</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  });
  
};
export default Orders;
