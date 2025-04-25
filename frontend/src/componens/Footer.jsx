import React from 'react'
import { assests } from '../assets/assests'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-4 mt-40 text-sm '>
            <div>
                <img src={assests.logo_dado} className='mb-5 w-28 ' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ea repellendus voluptatem autem temporibus laudantium doloribus  
                </p>
            </div>

            <div>
         <p className='text-xl font-medium mb-5 '>COMPANY </p>
           <ul className='flex flex-col gap-1 text-gray-600'>
               <li>Home</li>
               <li>About us</li>
               <li>Delivery</li>
               <li>Privacy policy</li>
           </ul>
         </div>

           <div>
          <p className='text-xl font-medium mb-5 '>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+794223...</li>
                <li>contact@contact_us@gmail.com</li>
         </ul>
         </div>
   </div>
         <div>

            <hr/> {/* frame */ }
            <p className='py-5 text-sm text-center ' > Copyright 2025@Dby.com - All Right Reserved </p>
         </div>
    </div>
  )
}

export default Footer