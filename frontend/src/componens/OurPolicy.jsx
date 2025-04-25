import React from 'react'
import { assests } from '../assets/assests'

const OurPolicy = () => {
  return (
    <div className=' flex flex-col sm:flex-row justify-around gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 '>
        {/* ////////////////////////policy_1////////////////////////// */ }
       <div>
        <img src={assests.exchange_icon} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-semibold '>Easy Exchange Policy </p>
        <p className='text-gray-400'>we offer hassle exchange policy </p>
       </div>
       {/* ////////////////////////policy_2////////////////////////// */ }
       <div>
        <img src={assests.Quality_icon} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-semibold '>3 Days  Reutrn Policy  </p>
        <p className='text-gray-400'>We provide 3 days return policy  </p>
       </div>
       {/* ////////////////////////policy_3////////////////////////// */ }
       <div>
        <img src={assests.support_icon} className='w-12 m-auto mb-5 ' alt="" />
        <p className='font-semibold '> Best Customer Support</p>
        <p className='text-gray-400'>we provide 24/7 Customer Support </p>
       </div>

    </div>
    
  )
}

export default OurPolicy