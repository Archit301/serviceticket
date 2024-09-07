import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { Bounce } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const UserFeedback = () => {
    const {currentUser}=useSelector((state)=>state.user)
       const {ticketId}=useParams();
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
   let comment=feedback
   let userId=currentUser._id
      try {
        const response = await fetch('/backend/ticket/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ticketId,userId,comment }),
        });
  
        if (response.ok) {
           
                toast.success('Feedback submited successfully!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                })
          setFeedback('');
        } else {
          toast.error('Error submitting feedback. Please try again.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          })
        }
      } catch (error) {
        console.error('Error:', error);
      //  alert('An error occurred. Please try again later.');
        toast.error('An error occurred. Please try again later.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          })
      } finally {
        setIsSubmitting(false);
      }
    };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
    <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Submit Your Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-gray-700 text-sm font-medium mb-2">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="6"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your feedback here..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
    <ToastContainer />
  </div>
  )
}

export default UserFeedback
