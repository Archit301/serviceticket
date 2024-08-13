import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { siginInStart, siginInSuccess, signinFailure } from '../redux/user/userSlice';

const Login = () => {
        const [formData, setFormData] = useState({
            username: '',
            email: '',
            password: '',
            role: 'user',
        });
  const navigate=useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
//  const {currentUser,error}=useSelector((state)=>state.user)
 //  const dispatch=useDispatch()
    const superadmin="tambiarchit@gmail.com";
    const [err,seterr]=useState("");
        const handleChange = (e) => {
            setFormData({ ...formData,[e.target.id]: e.target.value})
        }
        const handleSubmit = async(e) => {
            e.preventDefault();
            try {
              if(formData.role==="superadmin" &&formData.email!=="tambiarchit@gmail.com"){
                seterr("you are not allowed to be a superadmin");
                return;
              }
            // Handle form submission logic here
            // dispatch(siginInStart());
            const res = await fetch('/backend/user/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
              const data = await res.json();
              if(data.success==false){
            //    dispatch(signinFailure(data.message));
            setLoading(false);
            setError(data.message);
            return;
              }
              setLoading(false);
              setError(null);
              //dispatch(siginInSuccess(data));
               if(formData.role==="admin"){
                  navigate('/request');
               }
               else if(formData.role==="user"){
                navigate('/userhomepage');
             }
              console.log(data);
            } catch (error) {
              //  dispatch(signinFailure(error.message));
              setLoading(false);
              setError(error.message);
            }
        };
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Signin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
                <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            
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

            {/* Role Field */}
            <div>
                <label htmlFor="role" className="block text-gray-600 font-medium">Role</label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="" disabled>Select your role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">SuperAdmin</option>
                </select>
            </div>

            {/* Submit Button */}
            <div>
                <button
                  disabled={loading}
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                   {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </div>
        </form>
        <div className='flex gap-2 mt-5'>
        <p> Have an account?</p>
        <Link to={'/signin'}> 
           <span className='text-blue-700'>Sign in</span>
         </Link> 
      </div>
       {error && <p className='text-red-500 mt-5'>{error}</p>} 
      {err && <p className='text-red-500 mt-5'>{err}</p>}
    </div>
   
   
</div>
  )
}

export default Login
