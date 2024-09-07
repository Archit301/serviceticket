import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const UserTicket = () => {
    const [tickets,setticket]=useState([]);
    const [filter, setFilter] = useState('all');
    const navigate=useNavigate();

  
    useEffect(()=>{
        const fetchStats = async () => {
         try {
               const res=await fetch(`/backend/ticket/superadmintotalticketname`);
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

     const handleFilterChange = async(e) => {
        setFilter(e.target.value);
       let category=e.target.value
       if(e.target.value==="all")
       {
        try {
            const res=await fetch(`/backend/ticket/superadmintotalticketname`);
            //console.log(res)
              const data=await res.json();
              setticket(data);
              console.log(data);

             // console.log(data)
      } catch (error) {
        console.log(error);
      }
      return;
       }
        // Add logic to filter tickets based on the selected filter
        try {
            const res=await fetch(`/backend/ticket/ticketsportwise/${category}`);
            console.log(category)
              const data=await res.json();
              setticket(data);
              console.log(data);

             // console.log(data)
      } catch (error) {
        console.log(error);
      }
      };

      const handleClick=(ticketId)=>{
        console.log("hello")
   navigate(`/viewticket/${ticketId}`)
    }
  
  return (
    <div className="bg-gray-100 min-h-screen p-6">
    <div className="max-w-6xl mx-auto">
      {/* Filter and Button Container */}
      <div className="flex items-center justify-between mb-6">
        {/* Select dropdown on the left */}
        <div className="flex-shrink-0">
          <label htmlFor="category" className="text-gray-700 font-medium mr-2">Category</label>
          <select
            id="category"
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-gray-900"
          >
            <option value="all">All</option>
            <option value="sports">Sports</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>
  
        {/* Centered heading */}
        <h1 className="text-2xl font-semibold text-gray-800 mx-4 flex-grow text-center">
          {filter.toUpperCase()} TICKETS
        </h1>
  
        {/* Create Ticket Button on the right */}
       
      </div>
  
      {/* Ticket Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <div key={ticket._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={ticket.coverImage}
                alt={ticket.ticketName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{ticket.ticketName}</h3>
                <p className="text-gray-600 mb-4">{ticket.ticketDescription}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">₹{ticket.ticketPrice}</span>
                  <span className="text-sm text-gray-500 capitalize">{ticket.category}</span>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-300"
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
                No {filter} tickets available
              </p>
              <p className="text-gray-500">
                It looks like there are no tickets matching your filter criteria at the moment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    <ToastContainer />
  </div>
  
  
  )
}

export default UserTicket
