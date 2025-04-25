import 'react'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../componens/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
const Orders = () => {

  const {backendUrl ,currency,token } = useContext(ShopContext);
  const [orderData,setOrderData] = useState([])

    // to get the orderData from Mongodb and display It in this page
  const loadOrderData = async() => {
      try {
        if (!token) { // if token are not available
          return null
        }

        const response = await axios.post(backendUrl + '/api/order/userorder',{},{headers:{token}}) // when we do somhting for the user we will always send because if he is dosent have a token will not fetch amything
       // console.log(response.data);
        if (response.data.success) {
          let allOrdersItem = [] // Create an array to collect all items from all orders
          // Loop through each order received from the backend and data.orders if we open the backend and the userorder function we will see a const order that have the logic so we call this const oders here to fetch all orders
          response.data.orders.map((order)=>{  
              // Loop through each item in the curr ent order
            order.items.map((item)=>{
              item['status'] = order.status // bring this item to save it into our var and display each of this items
              item['payment'] = order.payment
              item['paymentMethod'] = order.paymentMethod
              item['date'] = order.date
              allOrdersItem.push(item)           // example for push let fruits = ["apple", "banana"];
            })
          })                                      // fruits.push("orange");  adds "orange" to the end of the array
                                                  // ["apple", "banana", "orange"] 

          setOrderData(allOrdersItem.reverse()); // set the all orders in the var that we create and reverse to display the last item in the first
        }  
      } catch (error) {
        console.log(error);
       
      }
  }

  useEffect(()=>{
     loadOrderData() // this function will be exctuted whenever the token will be updated
  },[token]) // whenever the token will be updated 

  return (
    <div className='border-t pt-16'>
        
        <div className='text-2xl'>

        <Title text1={'MY'} text2={'ORDERS '}/>
        </div>
  
      <div>
        {/*----- here we will display the order data----- */ }
        {
                  orderData.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4  '>
               <div className='flex items-start gap-6 text-sm '>
                     <img className='w-16 sm:w-20' src={item.image[0]}alt="" />
                     <div>
                      <p className='text-base font-medium '>{item.name}</p>
                      <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                        <p className='text-lg'>{currency}{item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size : {item.size}</p>

                      </div>
                      <p className='mt-1'>Date : <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                      <p className='mt-1'>Payment : <span className='text-gray-400'>{item.paymentMethod}</span></p>
                     </div>
               </div>

               <div className='md:w-1/2 flex justify-between'>
               <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status} </p>
 
               </div>
                   {/*onclick loadorder data that if we change from data base the status to out of stock and click on track order will load the new status */}
                   <button onClick={loadOrderData} className=' border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
               </div>
            </div>
          ))
        }
      </div>
    </div>
    
  )
}

export default Orders
