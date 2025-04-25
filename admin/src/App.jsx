import { Route, Routes } from 'react-router-dom'; // we import those to setup the routing
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { useEffect, useState } from 'react';
import Login from './components/Login';
import { ToastContainer} from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL // this how we get the env var
export const currency = '$';
const App = () => {

  const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):''); // here we ask if this token available in the local storage so save it in the state var that is [token,setToken] else add nothing to local storage or emty string

 useEffect(()=> // this use effect mean if anysomthing change event will happen
  { 
    localStorage.setItem("token",token); // ✅ Save the actual token string
 // we adding our token to the local storage so if i close or refresh the website it will still saved on the local storage
  },

  [token] // here whenever the token will upadated so in the localstorage we will save the data of token 
)
  return (

    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>

      {token === "" ? <Login setToken = {setToken}/> /* here is the turnery how its work if token === "" emty string so return the login page else return all our page */ 
       : <> {/* here this mean (:) as (else) so  else return all our pages if the login page not equal "" */ }
     <Navbar setToken = {setToken}/>
     <hr/>
     <div className='flex w-full'>
        <Sidebar/>

        <div className='w-[70%] mx-auto ml-[max(5vwh,25px)] my-8 text-gray-600 text-base'> 

        <Routes>
        <Route path='/add' element={<Add token={token}/>} /> 
        <Route path='/list' element={<List token={token}/>} /> 
        <Route path='/orders' element={<Orders token={token}/>} /> 
        </Routes>
       
        </div>
     </div>
     </> // this an empty div or fragment
} {/*here is the close of the turnerry operatior  */}
    </div>
      
  );
};

export default App;
