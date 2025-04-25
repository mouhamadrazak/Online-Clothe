import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
     {/* nafs steps ta3it el Latest collection */ }
    const {products} = useContext(ShopContext);
    const [BestSeller,setBestSeller] = useState([]); 
    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller)); {/* byaaml filtering wbjib el best seller el true bs */ }
        setBestSeller(bestProduct.slice(0,7))
    },[products])
    {/* ////////////////////explain this code below the export default///////////////////////// */ }
  return (
   <div className='my-10 '>
     <div className='text-center text-3xl py-8'>
           <Title text1={'BEST'} text2={'SELLER'}/>{/* jbneh dghri bdun azebb */ }
           <p className=' w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
           Discover our bestselling collection, featuring the most-loved styles for women, men, and kids. From elegant abayas and stylish dresses to comfortable pants and trendy outfits for all ages, these top-rated pieces combine quality, comfort, and timeless design. Shop now and embrace fashion that stands out!
           </p>
           {/* RenderingProducts */ }
           {/* just copy paste from the Latest collection and chage to t Bestseller */ }
        <div className='grid grid-cols-2 sm:(grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-10'> {/* ade lcolums b albo la kel screen */}
          {
           BestSeller.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
           ))
          }
        </div>
     </div>
   </div>
  )
}

export default BestSeller

{/* explainn for the filtering 
    Using useEffect() to Filter Best Sellers

useEffect(() => {
    const bestProduct = product.filter((item) => item.BestSeller);
    setBestSeller(bestProduct.slice(0, 5));
}, []);
Let’s break this down:

Step 1: Filtering Best-Selling Products

const bestProduct = product.filter((item) => item.BestSeller);
.filter() loops through the product array and returns only the products where BestSeller is true.
This creates a new array (bestProduct) that contains only best-selling items.

Step 2: Selecting the First 5 Best Sellers

setBestSeller(bestProduct.slice(0, 5));
.slice(0, 5) extracts the first 5 products from bestProduct.
setBestSeller() updates the bestSeller state with these 5 items.

Step 3: Running useEffect() Only Once

}, []);
The empty [] dependency array ensures that useEffect() runs only once when the component mounts.
This prevents unnecessary re-renders.
Final Breakdown of Execution Order
Component Renders for the First Time

bestSeller is initially an empty array ([]).
useEffect() is triggered because the component just mounted.
Fetching Best Sellers

product.filter((item) => item.BestSeller) filters the best-selling products.
.slice(0,5) keeps only the top 5.
setBestSeller(bestProduct.slice(0,5)) updates the state.
Component Rerenders

bestSeller now contains the top 5 best-selling products.

*/ }