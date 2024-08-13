import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <Link to="/" className="text-xl font-bold text-slate-300 hover:text-slate-100">
          ServiceDesk
        </Link>
        <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <Link to="/about" className="text-slate-400 hover:text-slate-200">
            About
          </Link>
          <Link to="/contact" className="text-slate-400 hover:text-slate-200">
            Contact
          </Link>
          
        </nav>
      </div>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200">
          <FaFacebookF className="text-xl" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200">
          <FaTwitter className="text-xl" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200">
          <FaInstagram className="text-xl" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200">
          <FaLinkedinIn className="text-xl" />
        </a>
      </div>
    </div>
    <div className="bg-gray-700 py-4 mt-6">
      <div className="container mx-auto text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} ServiceDesk. All rights reserved.
      </div>
    </div>
  </footer>
  )
}

export default Footer
