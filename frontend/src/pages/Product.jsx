import 'react'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assests } from '../assets/assests';
import Title from '../componens/Title';
import RelatedProducts from '../componens/RelatedProducts';
const Product = () => {
  const { productId } = useParams(); // Get product ID from URL
  const { products,currency,addToCart} = useContext(ShopContext); // Get all products from ShopContext
  const [productData, setProductData] = useState(false); // Stores selected product details
  const [Image, setImage] = useState(''); // Stores the main product image
  const [Size,setSize] = useState('') ;   // 

/* ------------explain async---------------- // 
async allows a function to work with Promises and handle operations that take time.
Inside an async function, you can use await to pause execution until a task is complete.
This helps prevent blocking the page while waiting for data.
*/
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) { // If product ID matches the URL ID
        setProductData({
          ...item,
          sizes: JSON.parse(item.sizes)  // ✅ Convert the string to an array
        });
        setImage(item.image[0]); // Set the first image of the product
        return null; // Exit the function 
      }
    });
  };

  useEffect(() => {
    fetchProductData(); // Run this function when component loads
  }, [productId]);

  return productData ? ( 
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
               {/*---------------- Productdata -----------*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
        
           {/*-------- product image------ */ }
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
              {
                productData.image.map((item,index)=>(
                     <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
                ))
              
              }
          </div>
         <div className='w-full sm:w-[80%]  '>
             <img  className='w-full h-auto' src={Image} alt="" />
         </div>
        </div>
         {/* --------- Product info ------------*/ }
         <div className='flex-1 '>
              <h1 className='font-medium text-2xl mt-0'>{productData.name}</h1>
              <div className='flex items-center gap-1 mt-2 w-5 '>
                       <img src={assests.star_icon} alt="" />
                       <img src={assests.star_icon} alt="" />
                       <img src={assests.star_icon} alt="" />
                       <img src={assests.star_icon} alt="" />
                       <img src={assests.star_icon} alt="" />
                       <p className='pl-2'>(122)</p>

              </div>
             <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
             <p className='mt-5 text-gray-500 md:w-[80%] '>{productData.description}</p>
             <div className='flex flex-col gap-4 my-8 '>
                   <p>Select Size </p>
                   <div className='flex gap-2'>
           {productData.sizes.map((item, index) => (  
    // We use the `.map()` function because `sizes` is an array, and we need to loop over it.
    <button   onClick={() => setSize(prevSize => prevSize === item ? '' : item)}  className={`border py-2 px-4 bg-gray-100 ${item === Size ? 'border-orange-500' : ''}  `} key={index}> {item} </button>   //  ${item === Size ? 'border-orange-500' : ''} → This conditionally applies a red border (border-orange-500) only if  the button's item value matches the currently selected Size.   
    // `key={index}` → React requires a unique `key` for each element in a list to optimize rendering.
    // `{item}` → Displays the value of the current size (e.g., "S", "M", "L").
    // if i want more explain there is below this page 
))}

                   </div>
             </div>
             <button onClick={()=>addToCart(productData._id,Size)} className='bg-black text-white px-8 py-3 active:bg-gray-700'>ADD TO CART </button>
              <hr className='mt-8 sm:w-[80%]' />
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1 '>
                <p>100% Original Product</p>
                <p>Cash On Delivery is Available On This Product </p>
                <p>Easy Return And Exchange Policy Within 3 Days </p>

              </div>
         </div>
      </div>

       {/*-----------Description & review Section ----------- */ }
       <div className='mt-20 '>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm '> Description </b>
          <p className='border px-5 py-3 text-sm '>reviwes(122) </p>
        </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 '>
            <p> i can add anything like  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis odio fugiat accusamus quae tempore harum aliquid non mollitia veritatis excepturi ex necessitatibus dolores velit consectetur nesciunt sint, laudantium sapiente itaque.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem ea quos soluta neque laudantium, hic mollitia eum. Nulla ut officia optio harum, at, minima, dolores dolorem sunt esse dolorum debitis.</p>
            </div>
        </div>
       
               {/*---------------Display the Related Product ------- */ }
       
               <RelatedProducts category={productData.category} subCategory={productData.subCategory}/> {/*product data hye ases awl product 3m esht8l fi w3m shuf kanu fi eshya matching m3u*/ }
             
    </div> 
     
  
  ) : <div className='opacity-0'></div>; // If no product, render an empty div
};

export default Product;

/* more explain for the map and item and the key 
productData.sizes = ["S", "M", "L", "XL"];
then we will 
<button key={0}> S </button>
<button key={1}> M </button>
<button key={2}> L </button>
<button key={3}> XL </button>

Is index necessary?
The index is not always necessary, but React recommends using a key when rendering lists for better performance.
If your data has a unique ID, use that instead of index as a key.
Conclusion
item → Refers to the value inside the array ("S", "M", "L", etc.).
index → Refers to the position of that value in the array (0, 1, 2, 3...).
Using .map() allows us to loop through an array and dynamically create elements.

explain for all the code is 

<button  
  onClick={() => setSize(item)}   When clicked, update the Size state with the selected item 
  
  className={`border py-2 px-4 bg-gray-100 
    ${item === Size ? 'border-orange-500' : ''}`}   Default styles for all buttons 
    - border py-2 px-4 bg-gray-100 → These are default styles for all buttons.
    - ${item === Size ? 'border-orange-500' : ''} → This conditionally applies a red border (border-orange-500) only if 
      the button's item value matches the currently selected Size. 
    - If item is not equal to Size, an empty string ('') is applied, meaning no extra styling. 

  key={index}>   key is required for React when rendering lists to identify each item uniquely 
  
  {item}   Displays the size text inside the button 
</button>

*/ 