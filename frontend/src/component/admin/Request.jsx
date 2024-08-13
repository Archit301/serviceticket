import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa';

const Request = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto text-center">
        <div className="text-green-500 mb-4">
          <FaCheckCircle className="text-6xl mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Sent Successfully!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for your request. It has been successfully sent to the superadmin for review. 
          We will notify you once your request has been processed. In the meantime, feel free to explore other features.
        </p>
        <p className="text-gray-600 mb-6">
          If you have any questions or need further assistance, please contact our support team.
        </p>
        <Link to="/signin" className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
           Bsck to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default Request
