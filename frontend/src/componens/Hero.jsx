// eslint-disable-next-line no-unused-vars
import React from 'react'
import {assests} from '../assets/assests'
const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 '>
                     {/*Hero left side  */ }
                     <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                        <div className='text-[#414141]'>
                            <div className='flex items-center gap-2'>
                                 <p className='w-8 md:w-11 h-[2px]  bg-[#414141] ' ></p>
                                 <p className='font font-medium text-sm md:text-base'>OUR BEST SELLER </p>
                              </div>
                         <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>latest arrival</h1>
                              <div className='flex items-center gap-2'>
                                  <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                                  <p className='w-8 md:w-11 h-[1px]  bg-[#414141] ' ></p>
                              </div> 
                        </div>
                     </div>
                     <img  className='w-full sm:w-1/2 ' src={assests.abaya3} alt="" />
    </div>
  )
}

export default Hero