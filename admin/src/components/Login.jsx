import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); // mean stop refresh if we login
      // You can now use email and password variables
      // console.log('Email:', email) to see if the email and password are save in our use state variable
      // console.log('Password:', password)

      const response = await axios.post(backendUrl + '/api/user/admin', {email, password,}); // this how we call the APIs and the last one that mean we sent the {email,password} that will be aded on request body
      //  console.log(response)  to test if the token succes perfectly so we will add the same admin email and password of admin to see if its work so if its work it will will show sucsess true and the id of token

      if (response.data.success){
// if our respone succses = true so we have to save the token
       setToken(response.data.token);  // add the token in the set token var
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message); // this the error message of toast also
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
          Admin Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-pink-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // onchage add the value to the email
              placeholder="admin@example.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-pink-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // on change add the value to our usestate var
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
