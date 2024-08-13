import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserMyticket = () => {
    const {currentUser}=useSelector((state)=>state.user)
    const navigate=useNavigate()
    const[tickets,setticket]=useState([])
    useEffect(() => {
        const checkTicketStatus = async () => {
          try {
            const response = await fetch(`/backend/ticket/${currentUser._id}/tickets`);
            const data = await response.json();
          console.log(data);
          setticket(data)
          } catch (error) {
            console.error('Error fetching ticket status:', error);
          }
        };
    
        checkTicketStatus();
      }, [ currentUser._id]);


      const handleClick=(ticketId)=>{
        console.log("hello")
   navigate(`/viewticket/${ticketId}`)
    }
  
  return (
    <div className="bg-gray-100 min-h-screen p-6">
    <div className="max-w-6xl mx-auto">
      {/* Filter and Heading Container */}
      <div className="flex items-center justify-between mb-6">
        {/* Filter Dropdown */}
      
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-800 mx-4 flex-grow text-center">
         My TICKETS
        </h1>
      </div>

      {/* Ticket Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <div key={ticket._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {ticket.coverImage ? (
                    <img
                      src={ticket.coverImage}
                      alt={ticket.ticketName}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No Image Available</p>
                    </div>
                  )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{ticket.ticketName}</h3>
                <p className="text-gray-600 mb-4">{ticket.ticketDescription}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">${ticket.ticketPrice}</span>
                  <span className="text-sm text-gray-500">{ticket.category}</span>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
                  onClick={() => handleClick(ticket._id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-64 bg-white border border-gray-300 rounded-lg shadow-md p-6 mx-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-700 mb-2">
                No  tickets you have buyed till now
              </p>
              <p className="text-gray-500">
                It looks like there are no tickets matching your filter criteria at the moment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default UserMyticket
