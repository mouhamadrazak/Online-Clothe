// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import {assests} from '../assets/assests'
import {Link, NavLink} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
      
   const [visible,setVisible] = useState(false); {/*this for the menu bar icon */ }

   const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext);

   const logout = ()=>{
    navigate('/login')
    localStorage.removeItem('token') // we will remove the token from the local storage when he logout
    setToken('') // clearing the token
    setCartItems({})// clearing the cart items
 
   }
  return (
 
           

     <div className='flex items-center justify-between py-5 font-medium'> 
     <Link to={'/'}> <img src={assests.logo_dado} className='w-36' alt="" /> </Link>  {/*w-36 mean =  width */ }
       
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700' hidden > {/* its hidden mean hidden and for small screen yaani el links hwde ma bbayno a screen sghire 
        3shen hk krml naaml navbar menu  */ }

             {/* *****************Home Link********************** */ }

             <NavLink to = '/' className= 'flex flex-col items-center gap-1 '>

                <p>HOME</p>
                <hr className=' w-2/4 border-none h-[1.5px] bg-gray-700' hidden /> {/* el hr 3ashen el line tht el kelme */ }

           </NavLink>
               
             {/* *****************collection Link********************** */ }

             <NavLink to = '/collection' className= 'flex flex-col items-center gap-1 '>
        
                <p>COLLECTION</p>
                <hr className=' w-2/4 border-none h-[1.5px] bg-gray-700' hidden />

           </NavLink>
 
             {/* *****************about Link********************** */ }
             <NavLink to = '/about' className= 'flex flex-col items-center gap-1 '>
           
                <p>ABOUT</p>
                <hr className=' w-2/4 border-none h-[1.5px] bg-gray-700' hidden />
            
           </NavLink>
 
             {/* *****************contact Link********************** */ }
             <NavLink to = '/contact' className= 'flex flex-col items-center gap-1 '>
           
                <p>CONTACT </p>
                <hr className=' w-2/4 border-none h-[1.5px] bg-gray-700' hidden  />

             {/* el hidden 3shen bdi el el khat li tht jemle ybyn bs ekbos elh bl active bel index.css */ }
           </NavLink> 

        </ul>

{ /* ////////////////////////////////////////////////// */ }


     <div className='flex items-center gap-2'>  {/*main div*/ }

                  {/* ///////////////search icon bar /////////////////////*/}
    <img onClick={()=>setShowSearch(true)} src={assests.search_icon} className='w-14 cursor-pointer' alt="ur connection slow" />

             {/*/////////////////////profile icon bar  ////////////////////// */ }

      <div className='group relative'>  {/*relative iza fi tnen box bsiru iza fetu bba3d 3adi */ }
    <img onClick={()=> token ? null : navigate('/login')} src={assests.profile_icon} className='w-7 cursor-pointer' alt="prf icon" /> {/*if there is token available so do null else took me to the login page */}
             {/*Drop down Menu */ }
           {/* group-hover block mean on hover show the group and hidden la nkhfyon wybynu onhover */}
    { token &&  <div className='dropdown-menu group-hover:block hidden absolute  right-0 pt-4 '> {/* explain for token && so we ask if the token available so show the div that she have the profile and orders  */}

           <div className=' flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
                   <p className='cursor-pointer hover:text-black'>My Profile</p>
                   <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black' > Orders </p>
                   <p onClick={logout} className='cursor-pointer hover:text-black'>Logout </p>
                </div>
            </div>}
       </div> 

                 {/* //////////////////////add to cart ////////////////////// */ }
       <Link to='/cart' className='relative'>  {/* link nafs el href link to so ana bs ekbos al cart btkhdne al page t3ita */ }
         <img src={assests.shoppping_icon } className='w-9 min-w-5 ' alt="" />
         <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
       </Link>

                     {/* /////////////////Menu icon /////////////////// */ }
              <img onClick={()=>setVisible(true)} src={assests.menu_icon} className='cursor-pointer sm:hidden w-5 ' /> {/* min width men el 640px screen size bkun lmenu hidden */ }
            
  </div>
      
       {/* sidebar menu for small screen */ }                                                      {/* its mean if the visible == true then width is full else width is 0 */ }
        <div className={`absolute top-0 right-2 bottom-0  overflow-hidden  backdrop-blur-[1.5px]  transition-transform duration-500 hover:translate-x-3 ${visible == true ?  'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                  {/* onclick b div 3shen bs ekbos 3l back kmn ytl3ni mn el bar icon */ }
                <div onClick={()=>setVisible(false)} className='flex items-center gap-0 p-3 cursor-pointer'>
                     <img  src={assests.dropdown_menu} className =' w-5 h-4 rotate-180' alt="" />
                         <p>BACK</p>
                </div>
                  {/* on click 3shen kmn bs ekbos 3ala aya link ysakr l nav bar wyekhdne al page */ }
                 <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border hover:text-red-300 '  to='/'>HOME</NavLink>
                 <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border hover:text-red-300'  to='/collection'>COLLECTION</NavLink>
                 <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border hover:text-red-300'  to='/about'>ABOUT</NavLink>
                 <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border hover:text-red-300'  to='/contact'>CONTACT</NavLink>
            </div>                                                          
        </div>
</div>
      


  )
}

export default Navbar
