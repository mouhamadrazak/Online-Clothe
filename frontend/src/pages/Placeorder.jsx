
import 'react'
import Title from '../componens/Title'
import CartTotal from '../componens/CartTotal'
import { assests } from '../assets/assests'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {
  const [method, setMethod] = useState('COD')
  const { navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products } = useContext(ShopContext)

  // store user inputs in formData
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    phone: '',
  })

  // update formData on each input change
   const onChangeHandler = (event) => {
    const name = event.target.name; // Use event.target.name for the field name
    const value = event.target.value; // Use event.target.value for the field value
    setFormData(data => ({ ...data, [name]: value }));
}


  
  const onSubmitHandler = async (e) => {
     // 1️⃣ Prevent the default form‑submit page reload
     e.preventDefault(); // ← typo fixed from preventDefauly()
   
     try {
       // 2️⃣ Initialize an empty array to collect order items
       let orderItems = [];
   
       // 3️⃣ Loop over each product ID in the cartItems object
       for (const items in cartItems) {
         // 4️⃣ For each size variant under that product
         for (const item in cartItems[items]) {
           // 5️⃣ Only proceed if quantity > 0
           if (cartItems[items][item] > 0) {
             // 6️⃣ Find the full product object by matching its _id and Clone the product so we don’t mutate original state
             const itemInfo = structuredClone(products.find(product => product._id === items));
             if (itemInfo) {
               // 7 Attach the size variant and quantity
               itemInfo.size = item;
               itemInfo.quantity = cartItems[items][item];
               // 8 Push the augmented object into ordersItems
               orderItems.push(itemInfo);
             }
           }
         }
       }
   
       //9 Log the final array to verify correctness
      // console.log(ordersItems);
   
     let orderData = {
          address : formData, // this is like the body in postman but in frontend we add the adress ass like in mongodb and add the dataInformation in adress
          items : orderItems, // orders item that the array that have all the orderitems
          amount : getCartAmount() + delivery_fee, // and we will have the total amount with delivery fee 
     }

     switch (method) { 
          
          // ✅ API CALL FOR COD (CASH ON DELIVERY)
          case 'COD': {
            // 👇 Wrap this block with `{}` to safely use `await` and `const`
            const response = await axios.post(backendUrl + '/api/order/place', orderData,{headers: { token }}); // we send the order data that she have all orders detail and and token 
          //  console.log(response.data.success);
        
            if (response.data.success) {
              toast(response.data.message); // message to the order placing 
              setCartItems({});         // ✅ Clear the cart
              navigate('/orders');      // ✅ Navigate to orders page
            } else {
              toast.error(response.data.message );
            }
        
            break;
          }
        
          default:
            break;
        }
        
     } catch (error) {
       // 1️⃣1️⃣ Catch and log any unexpected errors
       console.error("Failed to build order items:", error);
     }
   }
   
   
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/*-- Left side --*/}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={'DELIVERY '} text2={'INFORMATION'} />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="w-full border border-gray-300 rounded px-3.5 py-1.5" type="text" placeholder="First Name" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="w-full border border-gray-300 rounded px-3.5 py-1.5" type="text" placeholder="Last Name" />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="email" value={formData.email} className="w-full border border-gray-300 rounded px-3.5 py-1.5" type="email" placeholder="Email Address" />
          <input required onChange={onChangeHandler} name="street" value={formData.street} className="w-full border border-gray-300 rounded px-3.5 py-1.5" type="text" placeholder="Street" />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className="w-full border border-gray-300 rounded px-3.5 py-1.5" type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="state" value={formData.state} className="w-full border border-gray-300 rounded px-3.5 py-1.5" type="text" placeholder="State" />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="zipCode" value={formData.zipCode} className="w-full border border-gray-300 rounded px-3.5 py-1.5" type="number" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} name="country" value={formData.country} className="w-full border border-gray-300 rounded px-3.5 py-1.5" type="text" placeholder="Country" />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="w-full border border-gray-300 rounded px-3.5 py-1.5" type="tel" placeholder="Phone" />
        </div>
      </div>

      {/*-- Right side --*/}
      <div className="mt-8">
        <div className="min-w-80 mt-8">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* Payment Method Selection */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div  className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'whish' ? 'bg-green-400' : ''}`}></p>
              <p className="mx-4 text-sm font-medium text-gray-500">Call us To Pay</p>
              <img src={assests.which_icon} alt="" className="h-6 mx-7" />
            </div>

            <div  className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'omt' ? 'bg-green-400' : ''}`}></p>
              <p className="mx-4 text-sm font-medium text-gray-500">Call us To Pay</p>
              <img src={assests.omt_icon} alt="" className="h-4 mx-7" />
            </div>

            <div onClick={() => setMethod('COD')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'COD' ? 'bg-green-400' : ''}`}></p>
              <p className="mx-4 text-sm font-medium text-gray-500">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type='submit' className="px-16 py-3 text-sm bg-black text-white">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Placeorder