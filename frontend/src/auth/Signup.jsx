import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { siginInStart, siginInSuccess, signinFailure } from '../redux/user/userSlice';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate=useNavigate()
    const {currentUser,error}=useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const [clickedOnce, setClickedOnce] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData,[e.target.id]: e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        setClickedOnce(true);
        // Handle form submission logic here
        try {
            
        
        dispatch(siginInStart());
        const res = await fetch('/backend/user/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
         if(data.success===false){
      dispatch(signinFailure(data.message));
          }
          dispatch(siginInSuccess(data));
          console.log(data);
          console.log(currentUser)
          if(currentUser.role==="admin"){
            console.log("hello")
          if(currentUser.requestStatus==='pending'){
            console.log("hello");
            navigate('/request');
        }

        if(currentUser.requestStatus==='approved'){
            console.log("hello");
            navigate('/adminhomepage');
        }
    }
    else if(currentUser.role==="superadmin"){
        navigate('/superadminhomepage')
    }
    else if(currentUser.role==="user"){
        navigate('/userhomepage')
    }
        } catch (error) {
            if(signinFailure(error.message)!=="Cannot read properties of null (reading 'role')")
                return;
            dispatch(signinFailure(error.message));  
        }
    };
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">    
            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign In
                </button>
            </div>
        </form>
        <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/'}> 
          <span className='text-blue-700'>Sign up</span>
         </Link> 
      </div>
      {clickedOnce && !currentUser && (
                    <p className='text-red-500 mt-5'>
                        You may need to click the signup button again.
                    </p>
                )}
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
   
   
</div>
  )
}

export default Signup
