import { createContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency =
    "$"; /* here if i change the currency it will updaitet for  entire  page */
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]); // instand of the assets products to store the new products from data base we just replace it
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  /*  why we use nagivate instad link ? 
     Using navigate inside a button
    This approach is useful when you need to perform some logic 
    before navigating (e.g., checking cart items, verifying user authentication, etc.). */

    //----------------------ADD TO CART FUNCTION ---------------------------------------------
  const addToCart = async (itemId, size) => {
    // async yaani wa2t bfut a shi wbrj3 elh ma byaaml relod lal page
    if (!size) {
      toast.error("Select Prodct Size"); // this an alert error message
      return;
    }
    let cartData = structuredClone(cartItems);
    // `structuredClone(cartItems)` → Creates a deep copy of the cartItems object.
    // This ensures that modifying `cartData` doesn't directly change `cartItems` before updating the state.

    if (cartData[itemId]) {
      // Checks if the item with the given `itemID` already exists in the cart.

      if (cartData[itemId][size]) {
        // Checks if the selected size of this item already exists in the cart.
        cartData[itemId][size] += 1; // If it exists, increase the quantity by 1.
      } else {
        cartData[itemId][size] = 1; // If the size does not exist, initialize it with a quantity of 1.
      }
    } else {
      cartData[itemId] = {}; // If the item does not exist in the cart, create an empty object for it.
      cartData[itemId][size] = 1; // Set the size with a quantity of 1.
    }
    setCartItems(cartData);

    if (token) { // if tokem is available 
      try {
        await axios.post( backendUrl + "/api/cart/add",{ itemId, size }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };
 
      // ------------------------GET CART COUNT FUNCTION ----------------------------------------------
  const getCartCount = () => {
    let totalCount = 0; // Initialize a variable to store the total item count

    for (const items in cartItems) {
      // Loop through each item ID in the cart
      for (const item in cartItems[items]) {
        // Loop through each size of the item
        try {
          if (cartItems[items][item]) {
            // Check if the item has a valid quantity
            totalCount += cartItems[items][item]; // Add the quantity to totalCount
          }
        } catch (error) {
          /* empty */
        } // Catch any errors, but do nothing
      }
    }

    return totalCount; // Return the total number of items in the cart
  };

  useEffect(() => {
    // iza bde aamol test shu bsir ta efham console.log(cartItems);
  }, [cartItems]);


  
  // ----------------------UPDATE QUANTITY FUNCTION ------------------------------------------
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems); // Create a deep copy of cartItems to avoid modifying the original state directly
    cartData[itemId][size] = quantity; // Update the quantity of the specific product size
    setCartItems(cartData); // Update the state with the modified cart data
    if (token) // if token available
    try {

      await axios.post(backendUrl + '/api/cart/update',{itemId, size, quantity},{headers:{token}}) // we passing the token to can addtocart 
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
    }

        // --------------------GETTING THE CARTAMOUNT ----------------------------------------------------
  const getCartAmount = () => {
    // Defines an asynchronous function to calculate the total cart amount
    let totalAmount = 0; // Initializes totalAmount to store the total price of the cart

    for (const items in cartItems) {
      // Loops through each item ID in cartItems

      let itemInfo = products.find((product) => product._id === items); // Finds product details using its ID

      for (const item in cartItems[items]) {
        // Loops through sizes of the current product
        try {
          if (cartItems[items][item] > 0) {
            // Checks if the quantity is greater than 0
            totalAmount += itemInfo.price * cartItems[items][item]; // Multiplies price by quantity and adds to total
          }
        } catch (error) {
          // Empty catch block to prevent errors from breaking the function
        }
      }
    }

    return totalAmount; // Returns the total cart amount
  };



  // ----------------GETTING THE PRODUCT DATA------------------------------------------
  const getProductsData = async () => {
    // to get the products from   data base
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      //console.log(response.data)
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const getUserCart = async( token )=>{
      try {
        
          const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
          if (response.data.success) { // if the data of the cart true and having the items
            setCartItems(response.data.cartData) // then store the items in cartitems
          }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }
   
  useEffect(() => {
    // to show the data whenever this function will e excuted
    getProductsData();
  }, []);

  // i can add this function even in the login page it will work the same
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      // if there is not token and the local storage has the token so
      setToken(localStorage.getItem("token")); // get the token from the localstorage and add it ino our var like this even we refresh it will not open the loggin page
      getUserCart(localStorage.getItem("token")) // this function will be excuted whenever the token is available so if i have the token even if i reload the page my carts items will still with my quantity
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee, // i can accses this accross all the compnents mtl assests.jsx
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };
  return (
    <ShopContext.Provider value={value}>
      {/* eslint-disable-next-line react/prop-types*/}
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

/* what is the context 
n React, Context is a feature that allows you to share values
 (like variables, functions, or states) across the component tree
  without having to pass props manually at every level. It helps 
  avoid prop drilling, making state management easier  
  Your code is using React Context API to create a global store for your application. 

  1. Creating Context

export const ShopContext = createContext();
createContext() creates a new context object called ShopContext.
This context will be used to share data across components.

2. Defining the Context Provider

const ShopContextProvider = (props) => {
This is a context provider component that wraps around parts of the app wher
e you want to provide shared data.

3. Defining Shared Values

const currency = "$"; 
const delivery_fee = 10;
const value = { product, currency, delivery_fee };
This value object contains the data (product, currency, delivery_fee) 
that will be shared across components.
4. Providing Context to the Component Tree


return (
  <ShopContext.Provider value={value}>
    {props.children}
  </ShopContext.Provider>
);

ShopContext.Provider makes value accessible to all child components.
{props.children} ensures that any component wrapped inside <ShopContextProvider> can use the context.
5. Using Context in a Component
To use this context inside a child component:


import { useContext } from "react";
import { ShopContext } from "../context/ShopContextProvider";

const SomeComponent = () => {
  const { currency, delivery_fee } = useContext(ShopContext);
  
  return <p>Delivery Fee: {currency}{delivery_fee}</p>;
};
useContext(ShopContext) allows us to access the shared values inside any component.
Why Use Context API?
Avoids prop drilling (passing props through multiple components).
Centralized state management for app-wide data.
Easier updates: Changing currency in ShopContextProvider updates it across all components automatically.
Would you like a more advanced example with state management? 🚀

*/
