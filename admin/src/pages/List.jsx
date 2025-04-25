import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

// getting our save token from app.jsx
const List = ({token}) => {

  const [list, setList] = useState([]); // first we have to get the data from the API and store it in our variables

  //-------------fetchList to get API of products and Store them in const List--------------------
  const fetchList = async () => {
    // we will run this fnction wehenever this page loaded in useeffect
    try {
      const response = await axios.get(backendUrl + "/api/product/list"); // get to getting the API of our data and get the list items
      // console.log(response.data); to see if we getting the product data
      if (response.data.success) {
        // if the data sucsess  true then store it in our var
        setList(response.data.products); // like this we store the products in our set list so now we can display the data by using our variable
      } else {
        // else if the products are not showing
        toast.error(response.data.message); // so show an error message
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

 //---------------------to remove the product and upate the new product-------------------------------
  const removeProduct = async(id) =>{ // here we bring the id that we will get from mapping so whenever this function will be excuted we will remove that product from the data base
    try {
        
      const response = await axios.post(backendUrl + "/api/product/remove",{id},{headers:{token}}) // here we add the id beacuse by the id we delte the item
                                                                                           //we add token because we add the AdminAuth to the remove so no one can remove or add just the token of the admin for more secure
      if (response.data.success) {
         toast.success(response.data.message);
         await fetchList(); // we call this fetchList to update the new state of our product so when i delete item it well be removed from data base but it will still show it in our product list page so we call it to updating the new delete state
         
      }else{
        toast.error(response.data.message)
      }
                                                                                                  
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  useEffect(() => {
    fetchList();
  }, []);

  return(
    
    <>
      <p className="mb-2">ALL Products List</p>
      <div className="flex flex-col gap-2">
           {/*--------list table title */}
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className="text-center" >Action</b>
          </div>
          
          {/*----------product list --------- */}

          {
            list.map((item,index)=>( // we have stored the products detail from backend API into this list var and we map for those items and idex of array 
               <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 py-1 px-2 border text-sm" >
                <img src={item.image[0]} className="w-12" /> {/*index0 mean item 1 */}
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p> {/*we import the currency from the app.jsx to show the $ beside the price */}
                <p onClick={()=>removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p> {/*this X to remove the product by ID */}
               </div>
            ))
          }
      </div>
    </>

  )
};

export default List;
