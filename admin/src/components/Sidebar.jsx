import React from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../assets/assets'
const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'> {/* this is border right 2 */ }
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-2xl' to="/add"> {/* if anyone click on this it will take them to /add page*/ }
               <img className='w-5 h-5' src={assets.add_icon} alt="" />
               <p className='hidden md:block '>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-2xl' to="/list"> {/* if anyone click on this it will take them to the /list page*/ }
               <img className='w-5 h-5' src={assets.order_order} alt="" />
               <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-2xl' to="/orders"> {/* if anyone click on this it will take them to /orders page*/ }
               <img className='w-5 h-5' src={assets.box_icon} alt="" />
               <p className='hidden md:block'>Orders </p>
            </NavLink>

        </div>
    </div>
  )
}

export default Sidebar