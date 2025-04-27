import 'react'
import {Route,Routes,useLocation  } from 'react-router-dom'
import About from  './pages/About'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Placeorder from './pages/Placeorder'
import Orders from './pages/Orders' 
import Navbar from './componens/Navbar'
import Home from './pages/Home'
import Footer from './componens/Footer'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import SearchBar from './componens/SearchBar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';

{/*dyman lzm khali awl esm bl file capital*/}
const App = () => {

  const location = useLocation();
  const [fade, setFade] = useState(false);

  // this an effect that when we open any linked page it will show some effects 
  useEffect(() => {
    setFade(true);
    const timeout = setTimeout(() => {
      setFade(false);
    }, 150); // Small delay
    return () => clearTimeout(timeout);
  }, [location.pathname]);


  return (         
  <div className= {`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] transition-all  ${fade ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>  {/*this an edit for the view on the mobile and all screens with effect and animation for all links pages */}
    <ToastContainer/> {/* this to add alert error  messag */  }
     <Navbar/>  {/* like t
     his to connect the Navbar in the appjsx */}
     <SearchBar/>
    {/* lezm el import b tertib kel whde jdide tkun tht l adime */ }
     <Routes> {/* hydol el routes 3shen bs ekbos 3lyon ykhdune al pages t3iton bel navbar*/}
       <Route path='/' element = {<Home/>} />
       <Route path='/Collection' element = {<Collection/>} />
       <Route path='/About' element = {<About/>} />
       <Route path='/Contact' element = {<Contact/>} />
       <Route path='/Product/:productId' element = {<Product/>} />
       <Route path='/cart'  element = {<Cart/>} />
       <Route path='/login'  element = {<Login/>} />
       <Route path='/place-order'  element = {<Placeorder/>} />
       <Route path='/orders'  element = {<Orders/>} />
      </Routes>
      <Footer/> {/* why we put the footer inside the appjsx not the Home ? because we want the footer
display on all the pages */}
     
  </div>


  )
}

export default App
