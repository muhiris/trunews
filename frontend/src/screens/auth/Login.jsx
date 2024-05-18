import React, { useState } from 'react';
import InputField from '../../components/InputField';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../hooks/UserContext';

function Login() {
  const navigate = useNavigate();
  const { updateUser } = useUser(); 
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    try {
      console.log("Data", data);
      const response = await axios.post("http://localhost:4000/login",{
        email: data.email,
        password: data.password,
      });

      if(response.data) {
        console.log("Response", response.data.id);
        localStorage.setItem("userData", JSON.stringify(response.data.user))
        updateUser(); 
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error", error.response.data.msg);
      setError(error.response.data.msg);
    }
  };

  return (
    <div>
      <section className="md:h-screen md:py-36 flex items-center bg-[url('../../assets/images/cta.html')] bg-no-repeat bg-center bg-cover">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="flex-center h-screen container relative">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
              <a href="index.html"><img src="assets/images/logo-icon-64.png" className="mx-auto" alt /></a>
              <h5 className="my-6 text-xl font-semibold">Login</h5>
             
              <form onSubmit={handleSubmit} className="text-start">
                <div className="grid grid-cols-1">
                  <InputField htmlForName={"LoginEmail"} type={"email"} placeholder={"name@example.com"} item={"Email Address:"} name="email" value={data.email} onChange={handleChange} />
                  <InputField htmlForName={"LoginPassword"} type={"password"} placeholder={"Password:"} item={"Password:"} name="password" value={data.password} onChange={handleChange} />
                  {error && <p className="text-red-500 mt-2 mb-2">{error}</p>}
                  <div className="mb-4">
                    <input type="submit" className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full" defaultValue="Login" />
                  </div>
                  <div className="text-center">
                    <span className="text-slate-400 me-2">Don't have an account ?</span> <Link to="/signup" className="text-black dark:text-white font-bold inline-block">Sign Up</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
