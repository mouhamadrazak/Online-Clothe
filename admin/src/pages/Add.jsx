import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from "react-toastify";


const Add = ({token}) => {

  const [image1,setImage1] = useState(false); // to store our images
  const [image2,setImage2] = useState(false);
  const [image3,setImage3] = useState(false);
  const [image4,setImage4] = useState(false);

  const [name, setName] = useState(""); // Store product name
  const [description, setDescription] = useState(""); // Store product description
  const [price, setPrice] = useState(""); // Store product price
  const [category, setCategory] = useState("Men"); // Store category value
  const [subCategory, setSubCategory] = useState("Topwear"); // Store subcategory value
  const [sizes, setSizes] = useState([]); // Store selected sizes
  const [bestseller, setBestseller] = useState(false); // Store bestseller status
  

  const onSubmitHandler = async (e) =>{

      e.preventDefault(); // if we submit our form page will not be realoded
         try {
      const formData = new FormData(); // Correct // creating one form data having all the data we have then send it into HTTPS request
      // Append the images
      image1 && formData.append("image1", image1); // here we add && because if i select one image i dont want the rest of images send so here we ask if image 1 available so send it also for the rest images
      image2 && formData.append("image2", image2); // what append mean ? Append the data to formData so it can be sent via an HTTP request (typically to a backend server) when we used in postman add those to test after we add them we send via request so append mean send the via request directly 
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // Append text fields
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes)); // Convert sizes array to string because we cannot send array in the form 
      formData.append("bestseller", bestseller);

      const response = await axios.post(backendUrl+ "/api/product/add",formData,{headers:{token}})
    //  console.log(response.data);  to see if the data added on our data base 

       // Check if the product was successfully added so add notification then reset all to add again
      if (response.data.success) {
      toast.success(response.data.message); // Show success toast message that i type in the backend

      setName(''); // Clear the name field after successful submission
      setDescription(''); // Clear the description field after successful submission
      setPrice(''); // Clear the price field
      setCategory('Men'); // Reset the category
      setSubCategory('Topwear'); // Reset the subcategory
      setSizes([]); // Reset the selected sizes
      setBestseller(false); // Reset the bestseller status
      // Reset images if necessary
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);

  } else {  // else if not sucsses response an error toast notification
       toast.error(response.data.message)
  }
   }catch (error) {
    console.error("Error while adding product:", error); // Handle errors and display appropriate message
    toast.error("Failed to add product!"); // Show error toas
         }
  }

  
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">

          {/* ----explian what we add for images----- first we store the image in our set var then we add that when we upload an image it will show instand of the 
          of the icon so we ask in turnery IF Not image1 so if image1 not available so add the icon else add the url of the image */ }
          <label htmlFor="image1">
            <img className='w-20'src={!image1 ? assets.drag_drop_icon : URL.createObjectURL(image1)} alt="" />
            <input  onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
        
          <label htmlFor="image2">
            <img className='w-20'src={!image2 ? assets.drag_drop_icon : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
            <img className='w-20'src={!image3 ? assets.drag_drop_icon : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4">
            <img className='w-20'src={!image4 ? assets.drag_drop_icon : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>

        </div>
      </div>
      
      <div className="w-full">
        <p className="mb-2 mt-3">Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here" required/>
      </div>
       
      <div className="w-full">
        <p className="mb-2 mt-3">Product description</p>
        <textarea  onChange={(e)=>setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Write Content Here" required/>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">

           <div>
            <p className="mb-2 mt-2">Product Category</p>
            <select  onChange={(e)=>setCategory(e.target.value)}  className=" px-3 py-2"> {/*we add the onchange on the select kermel ma et3azab whota bi kel option so in select if i chose any value it will store it  */}
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
           </div>
           
           <div>
            <p className="mb-2 mt-2">Sub Category</p>
            <select  onChange={(e)=>setSubCategory(e.target.value)} className="px-3 py-2">
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
           </div>

           <div>
            <p className="mb-2 mt-2">Product Price</p>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-[120px] " type="Number" placeholder="25$"/>
           </div>
      </div>

      <div>
  <p className="mb-2">Product Sizes</p>
  <div className="flex gap-3">

    <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
{/* State Update Logic:
If the size is already in the sizes array (using prev.includes("size")), we remove it using prev.filter().
If the size is not in the sizes array, we add it by spreading the prev array and appending the new size (...prev, "size"). */}
      <p className={` ${sizes.includes('S') ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p> {/*we do this because when we click nothing show now we ask if this sizes include S so make the color pink else make it normal*/}
    </div>

    <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
      <p className={` ${sizes.includes('M') ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
    </div>

    <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
      <p className={` ${sizes.includes('L') ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
    </div>

    <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
      <p className={` ${sizes.includes('XL') ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
    </div>

    <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
      <p className={` ${sizes.includes('XXL') ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
    </div>

  </div>
</div>


      <div className="flex gap-2 mt-2">
        <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller"/> {/* here how is work The prev here represents the current value of bestseller before it gets updated. */}
        <label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label>                            {/** so If prev is true, !prev becomes false. */}
      </div>                                                                                        {/*and If prev is false, !prev becomes true. */}
                                                                                                                       
       <button type="submit" className="w-28 py-2 mt-4 bg-black text-white ">
                 ADD
       </button>
    </form>
  );
};

export default Add;
