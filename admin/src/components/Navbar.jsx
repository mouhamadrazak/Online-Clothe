import React from 'react'
import {assets} from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 justify-between'>
        
       <img className='w-[max(10%,80px)]' src={assets.logo_dado} alt="" /> 
       <button onClick={()=>setToken('')} className= 'bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full sm:text-sm  '>Logout</button>
       {/* onclick make it string so our if if its string stay in login page */}
    </div>
  )
}

export default Navbar