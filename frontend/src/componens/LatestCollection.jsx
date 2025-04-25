import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
           {/* 3byna el use state be emty array */ }   
    const [latestProduct,setLatestProduct]= useState([]);
    const {products} = useContext(ShopContext); {/* hk bysht8l el shopcontext jebt el array te3 lproduct bdun azeeb */  }
   {/*  console.log(product); to see that eu f3lan jebna el data t3it el array */ }
   useEffect(()=>{
     setLatestProduct(products.slice(0,20)); {/*awl shi .slice jebna neskha an el array krmel bi 7al ana ghayrt feya ma ytghayar b neskha laslye wjbt 0 la 10 product law fi 100 product khls jbt 10 mnon  */ }
   },[products]) // whenever this products get update the setlatest function will be displayed
   {/* this return emtyy array */ }
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl '>
          <Title text1={'LATEST '} text2={'COLLECTION'} /> {/* 3mlt page title w 3dalt fya elh wjbta a jehz */}
          <p className=' w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Stay ahead of the trends with our Latest Collection, featuring elegant abayas, stylish women's dresses, trendy men's fashion, comfortable pants, and adorable kids' outfits. Designed for all occasions, these new arrivals blend modern style with timeless appeal. Explore now and refresh your wardrobe with the season's must-haves!
          </p>
      </div>
      
        {/* RenderingProducts */ }
        <div className='grid grid-cols-2 sm:(grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'> {/* ade lcolums b albo la kel screen */}
          {
           latestProduct.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
           ))
          }
        </div>
    </div>
  )
}

export default LatestCollection

{/* example for the slicce function 
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const slicedNumbers = numbers.slice(0, 5); // Gets elements from index 0 to 4

console.log(slicedNumbers); // Output: [1, 2, 3, 4, 5]
console.log(numbers); // Original array remains unchanged

/////////////////////////////////////////////////////

example for the .map function 
The .map() method loops through an array and creates a new array by applying a function to each item.

array.map((element, index, array) => { 
  // return new value for each element
});
element: The current item in the loop.
index (optional): The position of the item.
array (optional): The full original array.
Example:
js
Copy
Edit
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);

console.log(doubled); // Output: [2, 4, 6, 8, 10]
In Your Code (If You Use .map() for Displaying Products):


latestProduct.map((item) => (
  <div key={item.id}>
    <h2>{item.name}</h2>
    <p>{item.price}$</p>
  </div>
));

This loops through latestProduct and displays each product’s name and price.

Key Differences: 
.slice() vs .map()
Method	Purpose	Modifies Original Array?	Returns
.slice(start, end)	Extracts part of an array	❌ No	A new array
.map(callback)	Transforms each item in an array	❌ No	A new array
*/ }