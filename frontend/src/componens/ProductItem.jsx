import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

                     {/* from the product */ }
const ProductItem = ({id,image,name,price}) => {
    const{currency} = useContext(ShopContext);
  return (
   <Link className='text-gray-700 cursor-pointer ' to={`/product/${id}`}> {/* this link to the page product and the id of the product */ }
      <div className='overflow-hidden '> 
        <img className='hover:scale-110 transition ease-in-out w-[100%]' src={image[0]} alt="" /> {/*image ra2m 0 */ }
        </div>
      <p className='pt-3 pb1 text-xs '>{name}</p> {/*bring the name to dpslay */ }
      <p className='text-xs font-medium '>{currency}{price}</p> {/* bring the price */ }
   </Link>
  )
}

export default ProductItem