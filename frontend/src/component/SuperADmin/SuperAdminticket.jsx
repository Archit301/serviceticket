import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaPlus, FaEye } from 'react-icons/fa';
import TicketCard from '../pages/TicketCard';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const SuperAdminticket = () => {
  const {currentUser}=useSelector((state)=>state.user)
  const [tickets,setticket]=useState([]);
    const [filter, setFilter] = useState('all');
    const navigate=useNavigate()
  useEffect(()=>{
        const fetchStats = async () => {
         try {
            let id=currentUser._id;

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
      if(e.target.value==='available'){
        try {
          let id=currentUser._id;

             const res=await fetch(`/backend/ticket/superadminavailableticketname`);
             //console.log(res)
               const data=await res.json();
               setticket(data);
               console.log(data);
               console.log("hello");
              // console.log(data)
       } catch (error) {
         console.log(error);
       }
      }

      else if(e.target.value==='expired'){
        try {
          let id=currentUser._id;

             const res=await fetch(`/backend/ticket/superadminexpiryticketname`);
             //console.log(res)
               const data=await res.json();
               setticket(data);
               console.log(data);
               console.log("hii");
              // console.log(data)
       } catch (error) {
         console.log(error);
       }
      }

      else if(e.target.value==='soldout'){
        try {
          let id=currentUser._id;

             const res=await fetch(`/backend/ticket/superadminsoldoutticketname`);
             //console.log(res)
               const data=await res.json();
               setticket(data);
               console.log(data);
               console.log("hii");
              // console.log(data)
       } catch (error) {
         console.log(error);
       }
      }
      else{
       
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
      // Add logic to filter tickets based on the selected filter
    };

    // const handleDelete=async(id)=>{
    //   try {
    //      const response=await fetch('/backend/ticket/deleteTicket',{
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({id})
    //         })
    //         if(response.ok){
    //           setticket(prevTickets => prevTickets.filter(ticket => ticket._id !== id));
    //           toast.success('Ticket deleted successfully!', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             transition: Bounce,
    //         })
    //         }
    //         console.log(response);
          
          
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    const handleViewTicket = (ticketId) => {
      navigate(`/purchasedetails/${ticketId}`);
  }


  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
    <div className="max-w-6xl mx-auto">
      {/* Filter and Button Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
        {/* Select dropdown on the left */}
        <div className="w-full sm:w-auto flex-shrink-0">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="w-full sm:w-auto border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="soldout">Sold Out</option>
            <option value="expired">Expired</option>
          </select>
        </div>
  
        {/* Centered heading */}
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center sm:mx-4 flex-grow">
          {filter.toUpperCase()} TICKETS
        </h1>
  
        {/* Create Ticket Button on the right (optional, commented out) */}
        {/* <button
          onClick={handleCreateTicket}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition duration-300"
        >
          <FaPlus className="mr-2" /> Create Ticket
        </button> */}
      </div>
  
      {/* Ticket Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              // onDelete={handleDelete}
              onEdit={() => handleEdit(ticket._id)}
              onClick={() => handleViewTicket(ticket._id)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-64 bg-white border border-gray-300 rounded-lg shadow-md p-6 mx-4">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
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

export default SuperAdminticket
