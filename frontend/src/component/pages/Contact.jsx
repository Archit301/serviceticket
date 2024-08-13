import React from 'react'

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Me</h1>
      <p className="text-gray-700 text-lg mb-6">
        If you have any questions, feedback, or just want to say hello, I'd love to hear from you. Please use the form below to get in touch or reach out via email.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-4">
            <strong>Email:</strong> <a href="mailto:tambiarchit@gmail.com" className="text-blue-500 hover:underline">tambiarchit@gmail.com</a>
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> <span className="text-gray-600">+123-456-7890</span>
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Social Media</h2>
          <p className="text-gray-700 mb-4">
            Connect with me on social media:
          </p>
          <div className="flex space-x-4">
            <a href="https://twitter.com/yourprofile" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://linkedin.com/in/yourprofile" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/yourprofile" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>

     </div></div>
  )
}

export default Contact
