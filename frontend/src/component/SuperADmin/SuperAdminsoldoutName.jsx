import React, { useEffect, useState } from 'react'

const SuperAdminsoldoutName = () => {
    const [tickets,setticket]=useState([])
    useEffect(()=>{
        const fetchStats = async () => {
         try {
           

               const res=await fetch(`/backend/ticket/superadminsoldoutticketname`);
               //console.log(res)
                 const data=await res.json();
                 setticket(data);
                 console.log(data);

                // console.log(data)
         } catch (error) {
           console.log(error);
         }
        }
        fetchStats();
     },[])
  return (
    <div className="bg-gray-50 min-h-screen p-8">
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">SOldOut Tickets</h1>
      {tickets.length > 0 ? (
        <ul className="space-y-6">
          {tickets.map((ticket) => (
            <li
              key={ticket._id}
              className="flex items-center border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={ticket.coverImage[0]} // Display the first image from the coverImage array
                alt={ticket.ticketName}
                className="w-20 h-20 object-cover rounded-lg mr-6 border border-gray-300"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">{ticket.ticketName}</h2>
                <p className="text-gray-600 text-sm mt-1">Created By: {ticket.adminId.username}</p>
                <p className="text-gray-600 text-sm mt-1">Created At: {new Date(ticket.createdAt).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 text-lg">No tickets available</p>
      )}
    </div>
  </div>
  )
}

export default SuperAdminsoldoutName
