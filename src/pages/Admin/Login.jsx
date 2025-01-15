import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/auth/adminlogin', values)
      .then(result => {
        if(result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate('/dashboard/pet_bottles');
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Login</h2>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        <div className="text-red-500 text-center mb-4">
          {error && <span>{error}</span>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => setValues({...values, email: e.target.value})}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) => setValues({...values, password: e.target.value})}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

 

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#004066] text-white font-semibold rounded-md shadow-lg hover:bg-[#0b1318d3] focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Log in
          </button>
        </form>

  
      </div>
    </div>
  );
};

export default Login;
