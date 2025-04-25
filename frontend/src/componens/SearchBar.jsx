import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assests } from '../assets/assests';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] = useState(false);
    const location = useLocation();

    useEffect(()=>{  /* bhay tari2a am jib l path te3 location */ 
              if (location.pathname.includes('collection')){
                      setVisible(true);
              }else{
                      setVisible(false)
              }
    } ,[location])

  return showSearch  && visible === true  ? /* mean if its false return null */   ( 
    <div className='border-t border-b bg-gray-50 text-center'>

        <div className='inline-flex items-center justify-center border  border-gray-400 px-5 py-1 mx-3 my-5 rounded-full w-3/4 sm:w-1/2 '>
               <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
               <img className='w-10'src={assests.search_icon} alt="" />
        </div>
           <img className='w-5 inline-flex cursor-pointer' onClick={()=>setShowSearch(false)} src={assests.close_icon} alt="" /> {/* inline flex yaane on same line flex klon w setshowbar on click bsir false whuwe asesan true */ }
    </div>

  ) : null
}

export default SearchBar