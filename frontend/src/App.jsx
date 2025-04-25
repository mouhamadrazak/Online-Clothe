import 'react'
import {Route,Routes } from 'react-router-dom'
import About from  './pages/About'
import Product from './pages/product'
import Cart from './pages/cart'
import Login from './pages/login'
import Placeorder from './pages/Placeorder'
import Orders from './pages/orders' 
import Navbar from './componens/Navbar'
import Home from './pages/Home'
import Footer from './componens/Footer'
import Collection from './pages/collection'
import Contact from './pages/Contact'
import SearchBar from './componens/SearchBar'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

{/*dyman lzm khali awl esm bl file capital*/}
const App = () => {
  return (         
  <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>  {/*bs bdi efham kel code la shu baamol elh lmouse whyde lal screensize*/}
    <ToastContainer/> {/* this to add alert error  messag */  }
     <Navbar/>  {/* like this to connect the Navbar in the appjsx */}
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
