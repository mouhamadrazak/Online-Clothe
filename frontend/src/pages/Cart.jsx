import "react";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../componens/Title";
import { assests } from "../assets/assests";
import CartTotal from "../componens/CartTotal";
const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []; // Initialize an empty array to store structured cart data

      for (const items in cartItems) {
        // Loop through each product in cartItems
        for (const item in cartItems[items]) {
          // Loop through each size of the product
          if (cartItems[items][item] > 0) {
            // Check if the quantity of the item is greater than 0
            tempData.push({
              // Add the item details to the tempData array
              _id: items, // Store the product ID
              size: item, // Store the selected size
              quantity: cartItems[items][item], // Store the quantity
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]); // This useEffect runs every time cartItems changes

  return (
    <div className="border-t pt-14">
      {" "}
      {/* Main container for the cart */}
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />{" "}
        {/* Displays the title "YOUR CART" */}
      </div>
      <div>
        {cartData.map((item, index) => {
          // Loops through cartData to display each item
          const productData = products.find((product) => product._id === item._id ); // Finds product details by matching ID
          return (
            <div
              key={index}  className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"    >
              <div className="flex items-start gap-6 ">
                <img className="w-16 sm:w-20"src={productData.image[0]} alt=""/>
                {/* Displays product image */}
                <div>
                  <p className="text-xs sm:text-lg font-medium ">
                    {productData.name}
                  </p>
                  {/* // Displays product name */}
                  <div className="flex items-center gap-5 mt-2 ">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    {/* // Shows product price */}
                    <p className="px-2 sm:px3 sm:py-1 border bg-slate-50 ">
                      {item.size}
                    </p>

                    {/*  Shows selected size */}
                  </div>
                </div>
              </div>
              {/* (e) to get the value from the input and we will check if its empty or not */}
              {/* and we will check if this input is empty then return null else do update and get the item size and id and the number of input  */}
              <input onClick={(e) =>  e.target.value === "" || e.target.value === "0"? null: updateQuantity( item._id,  item.size,   Number(e.target.value))}className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 " type="number"  min={1} defaultValue={item.quantity} />
              {/* Input field to update quantity */}
              <img onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assests.bin_icon}
                alt=""
              />
              {/* Delete icon to remove item from the cart*/}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20 ">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={() => navigate("/place-order")} className="bg-black text-white text-sm my-8 py-3 w-[60%]">
              PROCEEC TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; // Exports the Cart component for use elsewhere
