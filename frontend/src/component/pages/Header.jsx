import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4">
      <Link to={`/${currentUser?.role ? `${currentUser.role}homepage` : 'homepage'}`} className="flex items-center mb-4 sm:mb-0">
          <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap">
            <span className="text-slate-500">Service</span>
            <span className="text-slate-200">Desk</span>
          </h1>
        </Link>

        <form className="relative flex-grow max-w-md mx-4 mb-4 sm:mb-0" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 pl-12 rounded-lg border border-gray-300 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute top-1/2 transform -translate-y-1/2 left-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition duration-300"
          >
            <FaSearch className="text-lg" />
          </button>
        </form>

        <ul className="flex flex-wrap items-center space-x-4 sm:space-x-6">
          {currentUser && (
            <>
              {currentUser.role === 'admin' && (
                <Link to="/adminhomepage" className="text-slate-300 hover:text-slate-100 hover:underline">
                  Home
                </Link>
              )}
              {currentUser.role === 'superadmin' && (
                <Link to="/superadminhomepage" className="text-slate-300 hover:text-slate-100 hover:underline">
                  Home
                </Link>
              )}
              {currentUser.role === 'user' && (
                <Link to="/userhomepage" className="text-slate-300 hover:text-slate-100 hover:underline">
                  Home
                </Link>
              )}
              {currentUser.role === 'admin' && (
                <Link to="/adminticket" className="text-slate-300 hover:text-slate-100 hover:underline">
                  Ticket
                </Link>
              )}
              {currentUser.role === 'user' && (
                <Link to="/userticket" className="text-slate-300 hover:text-slate-100 hover:underline">
                  Ticket
                </Link>
              )}
              {currentUser.role === 'superadmin' && (
                <Link to="/superadminticket" className="text-slate-300 hover:text-slate-100 hover:underline">
                  Ticket
                </Link>
              )}
              {currentUser.role === 'superadmin' && (
                <Link to="/superadminuserlist" className="text-slate-300 hover:text-slate-100 hover:underline">
                  User List
                </Link>
              )}
              {currentUser.role === 'user' && (
                <Link to="/usermyticket" className="text-slate-300 hover:text-slate-100 hover:underline">
                  My Tickets
                </Link>
              )}
              {currentUser.role === 'admin' && (
                <Link to="/adminbankdetail" className="text-slate-300 hover:text-slate-100 hover:underline">
                  Bank Detail
                </Link>
              )}
            </>
          )}
          <Link to="/about" className="text-slate-300 hover:text-slate-100 hover:underline">
            About
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-10 w-10 object-cover border-2 border-gray-700"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <span className="text-slate-300 hover:text-slate-100 hover:underline">Sign in</span>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
