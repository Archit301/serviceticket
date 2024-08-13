import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Feedback = () => {
    const {ticketId,userId}=useParams();
    const[comment,setComment]=useState([])
    const[userdetail,setUserdetail]=useState([])
    useEffect(() => {
        const fetchcommentDetails = async () => {
          try {
            const response = await fetch(`/backend/ticket/${ticketId}/feedback/${userId}`);
         //  console.log(response);
           if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
            const data = await response.json();
            console.log(data)
           setComment(Array.isArray(data) ? data : [data]); // Adjust based on your response structure || []
          // console.log(comment.length)
          } catch (error) {
            console.error('Error fetching purchase details:', error);
          }
        };
        fetchcommentDetails();
      }, [ticketId,userId]);

      useEffect(()=>{
        const fetchDetails = async () => {
            try {
              const response = await fetch(`/backend/User/${userId}`);
            // console.log(response);
             if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
              const data = await response.json();
           //   console.log(data)
             setUserdetail(data); // Adjust based on your response structure || []
            } catch (error) {
              console.error('Error fetching purchase details:', error);
            }
          };
          fetchDetails();
      },[ticketId,userId])
  return (
    <div className="p-4">
    <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
    {comment.length > 0 ? (
      <ul className="list-disc pl-5">
        {comment.map((feedbackItem) => (
          <li key={feedbackItem._id} className="mb-2">
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="text-lg">{feedbackItem.comment}</p>
              <p className="text-sm text-gray-500">
                {new Date(feedbackItem.createdAt).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No feedback available</p>
    )}
  </div>
  )
}

export default Feedback
