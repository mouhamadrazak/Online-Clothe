
import 'react'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

  const Login = () => {
    const [currentState, setCurrentState] = useState("Login"); // hayde 7alet el sign up
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext); // get it fromm shopcontext
  
    const [name, setName] = useState(""); // to store the input name from login
    const [password, setPassword] = useState(""); // to store the password from login
    const [email, setEmail] = useState(""); // to store the email from our input email
  
    const onSubmitHandler = async (e) => {
      // event hye el input aya input rah ydakhlu el user
      e.preventDefault(); // to remove the reload page after we sign up
      try {
        if (currentState === "Sign Up") {
          // if state === sign up we will call the API of register
  
          const response = await axios.post(backendUrl + "/api/user/register", {name,email,password}); // post mean posting the name email pass in body when we used to test in postman the register we test it in our body and we tell req.body then we send to see if true
          // console.log(response.data);
          if (response.data.success) {
            // if token is true and sucsess
            toast("Your Account has Been Created ");
            setToken(response.data.token); // so store the token in our var
            localStorage.setItem("token", response.data.token); // then also save the token into our localstorage so when we refresh and close the page we will still login
          } else {
            toast.error(response.data.message);
          }
        } else {
          // this else that is the current state not sign up mean is login so we will call the api of login
          const response = await axios.post(backendUrl + "/api/user/login", {   email, password,});
          // console.log(response.data); to see if the login sucsses we will store it also
          if (response.data.success) {
            toast("Welcome You Logged In !");
            setToken(response.data.token); // so if the data sucsess we will store it in our token like the register
            localStorage.setItem("token", response.data.token); // then also save the token into our localstorage so when we refresh and close the page we will still login
          } else {
            // if the login not success
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        console.error("Something went wrong:", error);
        toast.error(error.message);
      }
    };

useEffect(()=>{ // so this function will be excuted and do her job whenever the product been updated 
if (token){ // if token are true 
  navigate('/')
}
},[token]) // the whenever the token will be updated the navigate will redirect me to the home page


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' >
            
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                   <p className='prata-regular text-3xl '>{currentState}</p> {/* it will be sign up */ }
                   <hr  className='border-none h-[1.5px] w-8 bg-gray-800'/>

            </div>
             {/* iza lcurrent state  btsewe login la taaml shi else iza ma btsewe login hot l name */ }
            {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' type="name" placeholder='Name' required/>} 
               <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Email 'required />
               <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' type="password" placeholder='Password ' required/>
               <div className='w-full flex justify-between text-sm mt-[8px]'>
                
                   <p className='cursor-pointer'>Forgot Your Password</p>
                   {
                    currentState === 'Login' 
                    ? <p onClick={()=> setCurrentState('Sign Up')} className='cursor-pointer'>Create account </p>
                    : <p onClick={()=> setCurrentState( 'Login')} className='cursor-pointer'>Login Here</p>
                   }
                
               </div>
               <button type="submit" className='bg-black text-white font-light px-8 p-2 mt-4'>{currentState === 'Login' ? 'Sign In ' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
